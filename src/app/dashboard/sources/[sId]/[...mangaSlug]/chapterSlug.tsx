
import { fetchChapter, fetchManga } from "@/action/fetch";
import NotFound from "@/app/not-found";
import MangaViewer from "@/components/manga/mangaViewer";
import { home } from "@/lib/constant";



export default async function ChapterInfo({ params, sources }: any) {
  const { sId, mangaSlug } = params;

  const mangaData = await fetchChapter(sources,mangaSlug.join("/"));
  if(!mangaData){
    return <NotFound title="Có lỗi xảy ra" />
  }
  const raw = mangaData?.parent.split("/");
  const parent =  raw[raw.length - 1] !== "/" ? raw[raw.length - 1] : raw[raw.length - 2];
  const list = await fetchManga(sources,parent)
  return (
    <>
      <MangaViewer
        mangaData={mangaData}
        chapterSlug={mangaSlug}
        id={sId}
        list={list}
        source={sources}
        parent={parent}
      />
    </>
  );
}
