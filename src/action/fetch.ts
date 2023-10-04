import { home } from "@/lib/constant";
import { SelectorHome, SourceSelector } from "@/types/types";
import { source } from "@prisma/client";
import axios from "axios";
import * as cheerio from "cheerio";
export async function fetchData(url: string, cache: RequestCache) {
  try {
    const res = await fetch(url, {
      cache,
    });
    const data = await res.json();
    const mangaLists = data.data;
    return mangaLists;
  } catch (error) {
    return;
  }
}

function proxyUrl(image: string,proxy:string, proxyType: string, source: string) {
  if (proxy){
      image = home + `api/${proxy}?source=${source}&image=${image}`;
  if (proxyType) {
    image = proxyType + `api/${proxy}?source=${source}&image=${image}`;
  }
  }

  return image;
}
function proxyFetch(
  image: string,
  proxy: string,
  proxyType: string,
  source: string
) {
  if (proxy) {
    if (proxyType) {
      image = proxyType + `?source=${source}&image=${image}`;
    } else {
      image = home + `api/${proxy}?source=${source}&image=${image}`;
    }
  }
  return image;
}

export async function fetchChapter(source: source, chapter: string) {
  try {
    let obj = source.selector as SourceSelector;
    const proxy = obj.proxy;
    const proxyType = obj.proxyType;
    const proxyImage = obj.proxyImage ? obj.proxyImage : obj.proxy
    // Combine the home and news URLs

    const headers = {
      "User-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/118.0",
      Referal: obj.api,
    };
    let url = (obj.api + chapter).replace(/\/+/g, "/");
    url = proxyUrl(url, proxy,proxyType, obj.api);
    const response = await axios.get(url, {
      headers,
    });
    const html = response.data;
    const $ = cheerio.load(html);
    const chapterListSelector = obj.selector.chapterLists;
    const chapterSelector = obj.selector.chapter;
    const mangaInfo: any = {};
    mangaInfo.parent = $(chapterListSelector.parent).attr("href");
    mangaInfo.images = [];
    $(chapterSelector.item).each((idx, imageElement) => {
      let image = $(imageElement).attr(chapterSelector.imageSrc) || "";
      image = proxyFetch(image, proxyImage, proxyType, obj.api);

      mangaInfo.images.push(image);
    });
    return mangaInfo;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function fetchManga(source: source, manga: string) {
  try {
    let obj = source.selector as SourceSelector;
    const proxy = obj.proxy;
    const proxyImage = obj.proxyImage ? obj.proxyImage : obj.proxy
    const proxyType = obj.proxyType;
    // Combine the home and news URLs
    const headers = {
      "User-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/118.0",
      Referral: obj.api,
    };
    let url = (obj.api + manga).replace(/\/+/g, "/");
    url = proxyUrl(url, proxy,proxyType, obj.api);
    // Fetch the HTML content of the combined URL
    const response = await axios.get(url, {
      headers,
    });
    const html = response.data;
    // Load the HTML content into Cheerio
    const $ = cheerio.load(html);

    const infoSelector = obj.selector.info;
    const chapterListSelector = obj.selector.chapterLists;
    // Select the elements that contain manga information using the provided selector
    // Initialize an object to store manga information
    const mangaInfo: any = {};

    // Extract manga name from the provided selector
    mangaInfo.name = $(infoSelector.title).text().trim() || "";
    mangaInfo.author = $(infoSelector.author).text().trim() || "";
    mangaInfo.otherName = $(infoSelector.otherName).text().trim() || "";
    mangaInfo.description = $(infoSelector.description).text().trim() || "";
    mangaInfo.genres = [];
    $(infoSelector.genres).each((idd, genresItem) => {
      const genresUrl = $(genresItem).attr("href");
      const genresName = $(genresItem).text().trim();

      mangaInfo.genres.push({
        name: genresName,
        url: genresUrl,
      });
    });
    // Extract manga image URL from the provided selector
    let image = $(infoSelector.image).attr("src") || "";

    if (infoSelector.type) {
      const styleAttribute = $(infoSelector.image)
        .find(infoSelector.type)
        ?.attr("style");

      if (styleAttribute) {
        const match = styleAttribute.match(/url\('([^']+)'\)/);
        if (match) {
          image = match[1];
        }
      }
    }
    image = proxyFetch(image, proxyImage, proxyType, obj.api);
    mangaInfo.image = image;
    const type = infoSelector.type;
    if (type) {
      const styleAttribute = $(type)?.attr("style");

      if (styleAttribute) {
        const match = styleAttribute.match(/url\('([^']+)'\)/);
        if (match) {
          mangaInfo.image = match[1];
        }
      }
    }
    // Extract the list of latest chapters
    mangaInfo.chapters = [];
    $(chapterListSelector.item).each((idx, chapterElement) => {
      let chapterName = $(chapterElement)
        .find(chapterListSelector.title)
        .text()
        .trim();
      let ccurl: string;
      if (chapterListSelector.item.includes(" a")) {
        chapterName = $(chapterElement).text().trim();
        ccurl = $(chapterElement).attr("href") || "";
      } else {
        chapterName = $(chapterElement)
          .find(chapterListSelector.title)
          .text()
          .trim();
        ccurl =
          $(chapterElement).find(chapterListSelector.title).attr("href") || "";
      }
      let chapterUrl;
      if (!ccurl || !ccurl.startsWith("http")) {
        ccurl = obj.api + ccurl;
      }
      chapterUrl = new URL(ccurl.replace(/\/+/g, "/")).pathname;

      const updated = $(chapterElement)
        .find(chapterListSelector.time)
        .text()
        .trim();

      // Create an object for each chapter and add it to the latestChapters array
      const chapterObject = {
        name: chapterName,
        url: chapterUrl,
        updated_at: updated,
      };
      mangaInfo.chapters.push(chapterObject);
    });
    return mangaInfo;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function fetchSource(source: source, searchParams: any) {
  try {
    const { page, search, category } = searchParams;
    let obj = source.selector as SourceSelector;
    const proxy = obj.proxy;
    const proxyImage = obj.proxyImage ? obj.proxyImage : obj.proxy

    const proxyType = obj.proxyType;
    let url = `${obj.api}`;
    if (category) {
      url = new URL(category, url).href;
    }
    console.log(searchParams);

    let pageSlug = obj.pagination;

    if (page && parseInt(page.toString()) > 0) {
      const pages = pageSlug.toString().replace("*", page);
      if (search) {
        if (obj.search.startsWith("?")) {
          url = `${obj.api}${pages.replace("?", "&")}`;
          url += `${obj.search.replace("*", search)}`;
        } else {
          url = `${obj.api}${obj.search.replace("*", search)}`;
          url += pages.replace("?", "&");
        }
      } else {
        url += pages;
      }
    }
    const headers = {
      "User-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/118.0",
      Referal: obj.api,
    };
    // Fetch the HTML content of the combined URL

    let homeItemSelector = obj.selector.home;
    const catItemSelector = obj.selector.category;
    if (search && obj.selector.search) {
      homeItemSelector = obj.selector.search;
    }
    const data: any = [];
    url = proxyUrl(url,proxy, proxyType, obj.api);
    console.log(url);
    if (category) {
      const response = await axios.get(url, {
        headers,
      });
      const html = response.data;

      // Load the HTML content into Cheerio
      const $ = cheerio.load(html);
      const filterSelector = obj.selector.filter;
      const filters: any = [];
      $(filterSelector.item).each((index, element) => {
        const filterName =
          $(element).find(filterSelector.title).text().trim() || "";
        const filterUrl = $(element).attr("href") || "";
        filters.push({ title: filterName, slug: filterUrl });
      });
      const sections: any = {
        title: "Truyện theo danh mục",
        slug: category,
        mangas: [],
        filters: [],
      };
      const mangas: any[] = [];
      $(catItemSelector.item).each((index, element) => {
        /*  console.log({data:$(element).html()}) */

        const title =
          $(element).find(catItemSelector.title).text().trim() || "";
        let href = $(element).find(catItemSelector.title).attr("href") || "";
        let image =
          $(element)
            .find(catItemSelector.image)
            .attr(catItemSelector.imageSrc) || "";
        if (catItemSelector.type) {
          const styleAttribute = $(element)
            .find(catItemSelector.type)
            ?.attr("style");

          if (styleAttribute) {
            const match = styleAttribute.match(/url\('([^']+)'\)/);
            if (match) {
              image = match[1];
            }
          }
        }
        image = proxyFetch(image, proxyImage, proxyType, obj.api);
        const latest =
          $(element).find(catItemSelector.latest).text().trim() || "";
        let slug = "";
        if (href) {
          if (!href.startsWith("http")) {
            href = obj.api + href;
          }
          slug = new URL(href).pathname;
        }
        mangas.push({
          title,
          slug,
          image,
          latest,
        });
      });
      sections.mangas = mangas;
      sections.filters = filters;
      data.push(sections);
    } else {
        console.log("URL here")
      const response = await axios.get(url, {
        headers,
      });
      const html = response.data;
       // console.log(html);
      // Load the HTML content into Cheerio
      const $ = cheerio.load(html);
      const filterSelector = obj.selector.filter;
      const filters: any = [];
      $(filterSelector.item).each((index, element) => {
        const filterName =
          $(element).find(filterSelector.title).text().trim() || "";
        const filterUrl = $(element).attr("href") || "";
        filters.push({ title: filterName, slug: filterUrl });
      });
      if (!search) {
        obj.home.forEach((item: SelectorHome, index: number) => {
          const sections: any = {
            title: item.title,
            slug: item.slug,
            mangas: [],
          };
          $(item.selector).each((index, element) => {
            const mangas: any[] = [];
            /*      console.log({data:$(element).html()}) */
            $(element)
              .find(homeItemSelector.item)
              .each((idx, hItem) => {
                const title =
                  $(hItem).find(homeItemSelector.title).text().trim() || "";
                let href =
                  $(hItem).find(homeItemSelector.title).attr("href") || "";
                let image =
                  $(hItem)
                    .find(catItemSelector.image)
                    .attr(catItemSelector.imageSrc) || "";
                if (catItemSelector.type) {
                  const styleAttribute = $(hItem)
                    .find(catItemSelector.type)
                    ?.attr("style");

                  if (styleAttribute) {
                    const match = styleAttribute.match(/url\('([^']+)'\)/);
                    if (match) {
                      image = match[1];
                    }
                  }
                }
                image = proxyFetch(image, proxyImage, proxyType, obj.api);
                const latest =
                  $(hItem).find(homeItemSelector.latest).text().trim() || "";
                let slug = "";
                if (href) {
                  if (!href.startsWith("http")) {
                    href = obj.api + href;
                  }
                  slug = new URL(href).pathname;
                }
                mangas.push({
                  title,
                  slug,
                  image,
                  latest,
                });
              });
            sections.title = item.title;
            sections.slug = item.slug;
            sections.mangas = mangas;
            sections.filters = filters;
          });
          data.push(sections);
        });
      } else {
        const sections: any = {
          title: "Searching",
          slug: "",
          mangas: [],
        };
        const mangas: any[] = [];
        $(homeItemSelector.item).each((idx, hItem) => {
            console.log({hItem})
          const title =
            $(hItem).find(homeItemSelector.title).text().trim() || "";
          let href = $(hItem).find(homeItemSelector.title).attr("href") || "";
          let image =
            $(hItem)
              .find(catItemSelector.image)
              .attr(catItemSelector.imageSrc) || "";
          if (catItemSelector.type) {
            const styleAttribute = $(hItem)
              .find(catItemSelector.type)
              ?.attr("style");

            if (styleAttribute) {
              const match = styleAttribute.match(/url\('([^']+)'\)/);
              if (match) {
                image = match[1];
              }
            }
          }
          image = proxyFetch(image, proxy, proxyType, obj.api);
          const latest =
            $(hItem).find(homeItemSelector.latest).text().trim() || "";
          let slug = "";
          if (href) {
            if (!href.startsWith("http")) {
              href = obj.api + href;
            }
            slug = new URL(href).pathname;
          }
          mangas.push({
            title,
            slug,
            image,
            latest,
          });
        });
        sections.title = "Searching";
        sections.slug = "";
        sections.mangas = mangas;
        sections.filters = filters;

        data.push(sections);
      }
    }
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

function mangaFilter(inputString: string, filter: string[]) {
  for (const word of filter) {
    if (inputString.toLowerCase().includes(word.toLowerCase())) {
      return true;
    }
  }
  return false;
}
const filter = [
  "mom",
  "mẹ",
  "loạn luân",
  "SpyxFamily",
  "Okaa",
  "Niece",
  "little sister",
  "loli",
];
