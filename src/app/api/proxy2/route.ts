import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const image = searchParams.get('image')?.toString();
    const source = searchParams.get('source')?.toString();
    if (!image || !source) {
      return NextResponse.json({ error: 'Image parameter is missing.' });
    }
  
    try {
      const { data, headers } = await axios.get(image, {
        responseType: "arraybuffer",
        headers: {
          referer: source,
        },
      });
  
      return new Response(data, {
        status: 200,
      });
    } catch (error:any) {
      return NextResponse.json( { error: error.message });
    }
};
