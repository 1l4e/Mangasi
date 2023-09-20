import { findOneSource } from "@/action/SourceModel";
import { isSafe } from "@/action/UserController";
import { fetchChapter, fetchManga } from "@/action/fetch";
import NotFound from "@/app/not-found";
import MangaViewer from "@/components/manga/mangaViewer";
import { fromBase64 } from "@/lib/utils";

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
    const safe = await isSafe();
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
    const list = await fetchManga(sources,parent)
    return (
      <>
        <MangaViewer
          mangaData={mangaData}
          chapterSlug={mangaSlug}
          id={source}
          list={list}
          source={sources}
          parent={parent}
        />
      </>
    );
}
