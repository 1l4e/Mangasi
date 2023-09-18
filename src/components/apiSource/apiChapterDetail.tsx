import NotFound from "@/app/not-found";
import { findOneSource } from "@/action/SourceModel";
import axios from "axios";
import ApiMangaViewer from "./apiMangaViewer";

export default async function ApiChapter({params}:any) {
    const {sId,mangaSlug,chapterSlug} = params;
    const sources = await findOneSource(sId);
    if (!sources){
        return <NotFound />
    }
    let main = sources.url;
    const selector:any = sources.selector
    let url = `${main}${selector.manga.selector}${params.mangaSlug}`
    let chapters_url = `${url}/${selector.manga.child.chapter.chapterList}`
    let chapter_url = `${main}${selector.manga.child.chapter.child.selector}${chapterSlug}`;
    const res = await axios.get(chapter_url);
    const res2 = await axios.get(chapters_url);
    const data = await res.data;
    const mangaData = data.data
    const chapterLists = await res2.data;
  return (
    <>
        <ApiMangaViewer chapter={mangaData} list={chapterLists} chapterSlug={chapterSlug} id={sId} source={sources}/>
    </>
  )
}
