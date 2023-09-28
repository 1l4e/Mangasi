import { fetchBookMark } from "@/action/CollectionController";
import { findOneSource } from "@/action/SourceModel";
import { getUserFromSession, isSafe } from "@/action/UserController";
import { fetchChapter, fetchManga } from "@/action/fetch";
import NotFound from "@/app/not-found";
import MangaViewer from "@/components/manga/mangaViewer";
import { authOptions } from "@/lib/auth";
import { fromBase64 } from "@/lib/utils";
import { getServerSession } from "next-auth";

export default async function ChapterView({
    params,searchParams
}:{
    params:{},
    searchParams: {
        source:string;
        chapter:string;
    }
}) {
    const {source,chapter}= searchParams
    if (!source || !chapter){
        return <NotFound title="Source or Chapter not Found" />
    }
    let mangaSlug= fromBase64(chapter)
    const session = await getServerSession(authOptions);
    const user = await getUserFromSession(session);
    let safe = true;
    if (user){
        safe = user.safe
    }
    if (!user){
      return <NotFound />
    }
    const sources = await findOneSource(source,safe);
    if (!sources) {
      return <NotFound title="No Sources" />;
    }
    const mangaData = await fetchChapter(sources,mangaSlug);
  
    if(!mangaData){
      return <NotFound title="Có lỗi xảy ra" />
    }
    let raw = mangaData?.parent;
    let parent
    if (!raw.startsWith('http')){
        parent = raw
    }
    else{
        parent = new URL(raw).pathname
    }
    const bookmarked = await fetchBookMark(user.id,parent,mangaSlug)
    const list = await fetchManga(sources,parent)
    console.log(parent)
    return (
      <>
        <MangaViewer
          mangaData={mangaData}
          chapterSlug={mangaSlug}
          id={source}
          list={list}
          source={sources}
          parent={parent}
          bookmark={bookmarked}
        />
      </>
    );
}
