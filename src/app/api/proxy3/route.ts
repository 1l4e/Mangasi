import logger from "@/lib/logger";
import axios from "axios";
import { NextResponse } from "next/server";

const proxy = "http://localhost:8191/v1";
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const image = searchParams.get("image")?.toString();
    const source = searchParams.get("source")?.toString();
    if (!image || !source) {
        return NextResponse.json({ error: 'Image parameter is missing.' });
    }

    try {
        const session = await handleProxySession()
        if (!session) return NextResponse.json({ message: "Error" }, { status: 500 })
        const res3 = await axios.post(proxy, {
            cmd: "request.get",
            url: image,
            "maxTimeout": 60000,
            "session": session
        })
        return new Response(res3.data.solution.response, {
            status: 200
        })
    } catch (error: any) {
        logger(error)
        return NextResponse.json({ error: error.message });
    }
}


async function handleProxySession() {
    try {
        logger("handle Session")
        const resp = await axios.post(proxy,{cmd:"sessions.list"});
        if (resp.status!==200) return NextResponse.json({message: "ERror" },{status:500})
        const sessions = resp.data.sessions;

        logger(sessions);
        let session
        if (sessions.length ===0) {
            logger("Creating Session");
            const res = await axios.post(proxy, {
                cmd: "sessions.create"
            })
            if (res.status !== 200) { return NextResponse.json({ message: "Proxy Error", status: 500 }) }
            session = res.data.session
            logger(session)
        }else{
        session = sessions[0]
        }
        logger(session);
        return session
    } catch (error) {
        logger(error)
        return null
    }
}
async function destroySession() {
    try {
        const start = new Date();
        const res = await axios.post(proxy, { cmd: "sessions.list" });
        if (res.status !== 200) return NextResponse.json({ message: "Error" }, { status: 500 })
        const sessions = res.data.sessions;
        for (const session of sessions) {
            await axios.post(proxy, { cmd: "sessions.destroy", session: session })
        };

    } catch (error) {
        logger(error)
    }
}

const destroySessionInterval = 3*60*60*1000;
setInterval(destroySession,destroySessionInterval);
