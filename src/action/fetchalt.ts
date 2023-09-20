import { home } from "@/lib/constant";
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

function proxyUrl(image:string,proxyType:string,source:string){
    if(proxyType){
      image= proxyType+`api/proxy2?source=${source}&image=${image}`
    }

    return image
}
function proxyFetch(image:string,proxy:string,proxyType:string,source:string){
  if (proxy){
    if(proxyType){
      image= proxyType+`api/proxy2?source=${source}&image=${image}`
    }
    else {
      image = home+`api/proxy2?source=${source}&image=${image}`
    }
  }
  return image
}

export async function fetchChapter(source: source, chapter: string) {
  try {
    let obj: any = source.selector;
    const proxy = obj.proxy;
    const proxyType= obj.eproxy;
    // Combine the home and news URLs
    let pathSegments = [obj.manga_slug, chapter];
    let url = new URL(
      pathSegments.filter((segment: string) => segment !== "").join("/"),
      obj.home
    ).href;
    const headers = {
      "User-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/118.0",
      Referral: obj.home,
    };
    url = proxyUrl(url,proxyType,obj.home)
    const response = await axios.get(url, {
      headers,
    });
    const html = response.data;
    const $ = cheerio.load(html);

    const mangaInfo: any = {};
    const server = obj.manga.child.chapter.server;
    mangaInfo.parent = $(obj.manga.child.chapter.child.parent).attr("href");
    mangaInfo.images = [];
    $(obj.manga.child.chapter.child.selector).each((idx, imageElement) => {
      let image = $(imageElement).attr(server[0]) || "";

        image = proxyFetch(image,proxy,proxyType,obj.home)

      mangaInfo.images.push(image);
    });
    return mangaInfo;
  } catch (error) {
    console.log(error)
    return null;
  }
}

export async function fetchManga(source: source, manga: string) {
  try {
    let obj: any = source.selector;
    const proxy = obj.proxy;
    const proxyType= obj.eproxy;
    // Combine the home and news URLs
    const headers = {
      "User-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/118.0",
      Referral: obj.home,
    };
    let pathSegments = [obj.manga_slug, manga];
    let url = new URL(
      pathSegments.filter((segment: string) => segment !== "").join("/"),
      obj.home
    ).href;
      url = proxyUrl(url,proxyType,obj.home)
    // Fetch the HTML content of the combined URL
    const response = await axios.get(url.toString(), {
      headers,
    });
    const html = response.data;
    // Load the HTML content into Cheerio
    const $ = cheerio.load(html);

    // Select the elements that contain manga information using the provided selector
    // Initialize an object to store manga information
    const mangaInfo: any = {};

    // Extract manga name from the provided selector
    mangaInfo.name = $(obj.manga.child.name).text().trim() || "";
    mangaInfo.author = $(obj.manga.child.author).text().trim() || "";
    mangaInfo.otherName = $(obj.manga.child.otherName).text().trim() || "";
    mangaInfo.description = $(obj.manga.child.description).text().trim() || "";
    mangaInfo.genres = [];
    $(obj.manga.child.genres).each((idd, genresItem) => {
      const genresUrl = $(genresItem).attr("href");
      const genresName = $(genresItem).text().trim();

      mangaInfo.genres.push({
        name: genresName,
        url: genresUrl,
      });
    });
    // Extract manga image URL from the provided selector
    let ima = $(obj.manga.child.image).attr("src") || "";
    ima = proxyFetch(ima,proxy,proxyType,obj.home)
    mangaInfo.image = ima
    const type = obj.manga.child.type;
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
    $(obj.manga.child.chapter.chapterList).each((idx, chapterElement) => {
      const chapterNameSelector = obj.manga.child.chapter.chapterName;
      const parent = obj.manga.child.chapter.chapterUrl;
      const updatedTimeSelector = obj.manga.child.chapter.updatedTime;
      let chapterName;
      let ccurl;
      if (chapterNameSelector) {
        chapterName = $(chapterElement).find(chapterNameSelector).text().trim();
        ccurl = $(chapterElement)
          .find(chapterNameSelector)
          .attr("href")
          ?.toString()
          .split("/");
      } else {
        chapterName = $(chapterElement).text().trim();
        ccurl = $(chapterElement).attr("href")?.toString().split("/");
      }

      if (parent === "parent") {
        console.log("true");
        ccurl = $(chapterElement).attr("href")?.toString().split("/");
      }
      const updated = $(chapterElement).find(updatedTimeSelector).text().trim();
      const selectedParts = [];
      for (const pos of obj.chapter_pos) {
        const index = parseInt(pos, 10); // Convert to integer
        if (ccurl && !isNaN(index) && index >= 0 && index < ccurl.length) {
          selectedParts.push(ccurl[index]);
        }
      }
      const chapterUrl = selectedParts.join("/");
      // Create an object for each chapter and add it to the latestChapters array
      const chapterObject = {
        name: chapterName,
        url: chapterUrl + "?type=chapter",
        updated_at: updated,
      };
      mangaInfo.chapters.push(chapterObject);
    });
    return mangaInfo;
  } catch (error) {
    return null;
  }
}

export async function fetchSource(source: source, searchParams: any) {
  const { page, search, loc } = searchParams;
  try {
    let obj: any = source.selector;
    const proxy = obj.proxy;
    const proxyType = obj.eproxy
    // Combine the home and news URLs
    let url = `${obj.home}${obj.news}`;
    if (search) {
      url = `${obj.home}${obj.search}${search}`;
    }
    let pageSlug = obj.pagination;
    const pages = pageSlug.replace("*", page);
    if (page && parseInt(page.toString()) > 0) {
      if (search) {
        url += pages;
      } else {
        url += pages;
      }
    }
    
    const headers = {
      "User-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/118.0",
      Referral: obj.home,
    };
    // Fetch the HTML content of the combined URL
    url = proxyUrl(url,proxyType,obj.home)
    console.log(url)
    const response = await axios.get(url, {
      headers,
    });
    const html = response.data;

    // Load the HTML content into Cheerio
    const $ = cheerio.load(html);

    // Select the elements that contain manga information using the provided selector
    const mangaUrls: any[] = [];
    let filterNumber = 0;
    $(obj.manga.selector).each((index, element) => {
      // Initialize an object to store manga information
      const mangaInfo: any = {};
      // Extract manga name from the provided selector
      const ele = $(element).find(obj.manga.item.name);
      const name = ele.text().trim();
      if (!source.safe&& !loc && mangaFilter(name, filter)) {
        filterNumber++;
        return;
      }
      mangaInfo.name = name;

      /*  console.log(ele.attr('href')); */
      mangaInfo.url = ele.attr("href")?.toString().split("/")[
        parseInt(obj.manga_pos)
      ];
      // Extract manga image URL from the provided selector
      mangaInfo.image = $(element)
        .find(obj.manga.item.image)
        .attr("data-original") || "";
      if (!mangaInfo.image) {
        mangaInfo.image = $(element).find(obj.manga.item.image).attr("src") || "";

      }
      mangaInfo.image = proxyFetch(mangaInfo.image,proxy,proxyType,obj.home)
      const type = obj.manga.item.type;
      if (type) {
        const styleAttribute = $(element).find(type)?.attr("style");

        if (styleAttribute) {
          const match = styleAttribute.match(/url\('([^']+)'\)/);
          if (match) {
            mangaInfo.image = match[1];
          }
        }
      }
      // Extract the list of latest chapters
      mangaInfo.latestChapters = [];
      $(element)
        .find(obj.manga.item.new_chapter.selector)
        .each((idx, chapterElement) => {
          const parent = obj.manga.child.chapter.chapterUrl;
          const chapterName = $(chapterElement)
            .find(obj.manga.item.new_chapter.chapter_name)
            .text()
            .trim();
          let ccurl = $(chapterElement)
            .find(obj.manga.item.new_chapter.chapter_name)
            .attr("href")
            ?.toString()
            .split("/");
          if (parent === "parent") {
            console.log("true");
            ccurl = $(chapterElement).attr("href")?.toString().split("/");
          }
          const selectedParts = [];
          for (const pos of obj.chapter_pos) {
            const index = parseInt(pos, 10); // Convert to integer
            if (ccurl && !isNaN(index) && index >= 0 && index < ccurl.length) {
              selectedParts.push(ccurl[index]);
            }
          }
          const chapterUrl = selectedParts.join("/");
          const chapterUpdated = $(chapterElement)
            .find(obj.manga.item.new_chapter.chapter_updated)
            .text()
            .trim();

          // Create an object for each chapter and add it to the latestChapters array
          const chapterObject = {
            name: chapterName,
            url: chapterUrl + "?type=chapter",
            updated: chapterUpdated,
          };
          mangaInfo.latestChapters.push(chapterObject);
        });

      // Push the mangaInfo object to the mangaUrls array
      mangaInfo.filter = filterNumber;
      mangaUrls.push(mangaInfo);
    });
    return mangaUrls;
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
