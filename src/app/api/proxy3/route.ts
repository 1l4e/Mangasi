import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const image = searchParams.get("image")?.toString();
  const source = searchParams.get("source")?.toString();
      if (!image || !source) {
      return NextResponse.json({ error: 'Image parameter is missing.' });
    }

  try {
    /*  const { data, headers } = await axios.get(image, {
        responseType: "arraybuffer",
        headers: {
          referer: source,
        },
      });

      return new Response(data, {
        status: 200,
      }); */
    const proxy = "http://localhost:8191/v1";
    const res = await axios.post(proxy, {
      cmd: "sessions.list",
    });
    const data = res.data;
    let session;
    if (data.sessions.length === 0) {
      const res2 = await axios.post(proxy, {
        cmd: "sessions.create",
      });
      if (res2.status === 200) {
        session = res2.data.session;
      } else {
        return NextResponse.json({ message: "Proxy Error" });
      }
    } else {
      session = data.sessions[0];
    }
    const res3 = await axios.post(proxy,{
        cmd: "request.get",
        url: image,
        "maxTimeout": 60000,
        "session": session
    })
    if (res3.status !== 200){
        return NextResponse.json({ message: "Proxy Error" });
    }
    if (data.sessions.length > 1) {
        data.sessions.forEach( async (session:any) => {
            await axios.post(proxy,{
                cmd: "sessions.destroy",
                session:session,
            })
        })

    }
    return new Response(res3.data.solution.response,{
    status:200
    })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ error: error.message });
  }
}
