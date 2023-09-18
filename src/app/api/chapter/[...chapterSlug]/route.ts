
import { findOneSource } from "@/action/SourceModel";
import axios from "axios";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: any) {
  try {

    const start = new Date().getTime();
    const { searchParams } = new URL(request.url);
    const chapter = params.chapterSlug.join('/');
    const id = searchParams.get("id");
    if (!id ) {
      return NextResponse.json({
        status: 404,
        message: "No Source",
      });
    }
    const source = await findOneSource(id);
    if (!source) {
      return NextResponse.json({
        status: 404,
        message: "No Source 1",
      });
    }
    if (typeof source.selector === "object" && source.selector !== null) {
      let obj: any = source.selector;
      // Combine the home and news URLs
      let pathSegments = [obj.manga_slug, chapter];
      let url = new URL(
        pathSegments.filter((segment: string) => segment !== "").join("/"),
        obj.home
      );
      const headers = {
        "User-agent":
          obj.agent ||
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/118.0",
        Referral: obj.home,
      };
      // Fetch the HTML content of the combined URL
      const response = await axios.get(url.toString(),{
        headers
      });
      const html = response.data;
      // Load the HTML content into Cheerio
      const $ = cheerio.load(html);

      // Select the elements that contain manga information using the provided selector
   
      // Initialize an object to store manga information
      const mangaInfo: any = {};
        const server= obj.manga.child.chapter.server
        mangaInfo.parent= $(obj.manga.child.chapter.child.parent).attr('href');
        mangaInfo.images = [];
      $(obj.manga.child.chapter.child.selector).each((idx, imageElement) => {
        const image = $(imageElement).attr(server[0])
        // Create an object for each chapter and add it to the latestChapters array
        mangaInfo.images.push(image); 
      });

      // Push the mangaInfo object to the mangaUrls array

      return NextResponse.json({
        status: 200,
        time: new Date().getTime() - start,
        message: "OK",
        data: mangaInfo,
      });
    }
    return NextResponse.json({
      status: 500,
      time: new Date().getTime() - start,
      message: "error",
      data: {},
    });
  } catch (error) {
    console.error("Error fetching and parsing the manga URLs:", error);
    return NextResponse.json({
      status: 500,
      message: error,
    });
  }
}
