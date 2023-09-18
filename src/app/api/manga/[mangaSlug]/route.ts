import { findOneSource } from "@/action/SourceModel";
import axios from "axios";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";


export async function GET(request: Request,{params}:any) {
    try {

      const start = new Date().getTime();
      const { searchParams } = new URL(request.url)
      const manga = params.mangaSlug;

      const id = searchParams.get('id');
      console.log(manga,id)
      if (!id || !manga){
        return NextResponse.json({
          status: 404,
          message: "No Manga",
        })
      }
      const source = await findOneSource(id);
      if (!source){
        return NextResponse.json({
          status: 404,
          message: "No Source",
        })
      }
      if (typeof source.selector === 'object' && source.selector !== null) {
        let obj:any  = source.selector;
        // Combine the home and news URLs
        const headers = {
          "User-agent":
            obj.agent ||
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/118.0",
          Referral: obj.home,
        };
        let pathSegments = [obj.manga_slug,manga]
        let url = new URL(pathSegments.filter((segment:string) => segment !== '').join('/'), obj.home)
       
        // Fetch the HTML content of the combined URL
        const response = await axios.get(url.toString(),{
          headers,
        });
        const html = response.data;
        // Load the HTML content into Cheerio
        const $ = cheerio.load(html);
        
      // Select the elements that contain manga information using the provided selector
        // Initialize an object to store manga information
        const mangaInfo: any = {};
        
        // Extract manga name from the provided selector
        mangaInfo.name = $(obj.manga.child.name).text().trim();
        mangaInfo.author = $(obj.manga.child.author).text().trim();
        mangaInfo.otherName = $(obj.manga.child.otherName).text().trim();
        mangaInfo.description = $(obj.manga.child.description).text().trim();
        mangaInfo.genres = []
        $(obj.manga.child.genres).each((idd,genresItem)=> {
          const genresUrl = $(genresItem).attr('href');
          const genresName= $(genresItem).text().trim();

          mangaInfo.genres.push({
            name:genresName,
            url:genresUrl
          })

        })
        // Extract manga image URL from the provided selector
        mangaInfo.image = $(obj.manga.child.image).attr('src');
        const type = obj.manga.child.type;
        if (type){
          const styleAttribute = $(type)?.attr('style');

          if (styleAttribute) {
            const match = styleAttribute.match(/url\('([^']+)'\)/);
            if (match) {
              mangaInfo.image = match[1];
            }
          }
        }
        // Extract the list of latest chapters
        mangaInfo.chapters = [];
        $(obj.manga.child.chapter.chapterList)
        .each((idx, chapterElement) => {

          const chapterNameSelector = obj.manga.child.chapter.chapterName
          const parent = obj.manga.child.chapter.chapterUrl;
          const updatedTimeSelector=obj.manga.child.chapter.updatedTime;
          let chapterName 
          let ccurl
          if (chapterNameSelector){
            chapterName = $(chapterElement).find(chapterNameSelector).text().trim();
            ccurl = $(chapterElement).find(chapterNameSelector).attr('href')?.toString().split('/');
          }
          else{
            chapterName = $(chapterElement).text().trim();
            ccurl = $(chapterElement).attr('href')?.toString().split('/');
          }
          
          
          if (parent === 'parent'){
            console.log("true")
           ccurl = $(chapterElement).attr('href')?.toString().split('/');
          }
          const updated = $(chapterElement).find(updatedTimeSelector).text().trim();
          const selectedParts = [];
          for (const pos of obj.chapter_pos) {
            const index = parseInt(pos, 10); // Convert to integer
            if (ccurl && !isNaN(index) && index >= 0 && index < ccurl.length) {
              selectedParts.push(ccurl[index]);
            }
          }
          const chapterUrl = selectedParts.join('/');
          // Create an object for each chapter and add it to the latestChapters array
          const chapterObject = {
            name: chapterName,
            url: chapterUrl+'?type=chapter',
            updated_at:updated,
          };
          mangaInfo.chapters.push(chapterObject);
        });
        
        // Push the mangaInfo object to the mangaUrls array
      
      return NextResponse.json({
        status:200,
        time: new Date().getTime() - start,
        message: "OK",
        data: mangaInfo,
       
      });
    }
    return NextResponse.json({
      status:500,
      time: new Date().getTime() - start,
      message: "error",
      data: {},
      
    });
  } catch (error) {
    console.error("Error fetching and parsing the manga URLs:", error);
    return NextResponse.json({
      status:500,
      message: error,
    });
  }
}

/* const obj = {
  home: "https://www.nettruyenus.com/",
  search: "tim-truyen?keyword=",
  genreList:
    "#mainNav > div > div > div > div > ul > li:nth-child(5) > ul > li > div > div:nth-child(1) > ul",
  filterList: ".comic-filter .sort-by div.col-sm-9  div",
  manga: {
    selector: ".items .item",
    item: {
        image: ".image img",
        name: "h3 a",
        new_chapter: {
            selector: "ul li",
            chapter_name: "a",
            chapter_updated: "i.time"
        },
        
    },
    child: {
      chapter: {
        chapterList: "#item-detail .list-chapter nav li .chapter a",
        updatedTime: "#item-detail .list-chapter nav li .no-wrap.small",
        child: {
          selector: ".reading-detail .page-chapter a",
        },
      },
      name: "#item-detail h1.title-detail",
      otherName: "li.othername h2",
      author: "li.author a",
      status: "li.kind a",
    },
  },
  news: "tim-truyen",
  hot: "hot",
  pagination: "page",
}; 

const obj2 ={
  "home": "https://www.nettruyenus.com/",
  "search": "tim-truyen?keyword=",
  "genreList": "#mainNav > div > div > div > div > ul > li:nth-child(5) > ul > li > div > div:nth-child(1) > ul",
  "filterList": ".comic-filter .sort-by div.col-sm-9  div",
  "manga": {
    "selector": ".items .item",
    "item": {
      "image": ".image img",
      "name": "h3 a",
      "new_chapter": {
        "selector": "ul li",
        "chapter_name": "a",
        "chapter_updated": "i.time"
      }
    },
    "child": {
      "chapter": {
        "chapterList": "#item-detail .list-chapter nav li .chapter a",
        "updatedTime": "#item-detail .list-chapter nav li .no-wrap.small",
        "child": {
          "selector": ".reading-detail .page-chapter a"
        }
      },
      "name": "#item-detail h1.title-detail",
      "otherName": "li.othername h2",
      "author": "li.author a",
      "status": "li.kind a"
    }
  },
  "news": "tim-truyen",
  "hot": "hot",
  "pagination": "page"
}



*/