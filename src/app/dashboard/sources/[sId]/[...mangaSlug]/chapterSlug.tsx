
import { fetchData } from "@/action/fetch";
import NotFound from "@/app/not-found";
import MangaViewer from "@/components/manga/mangaViewer";
import { home } from "@/lib/constant";



export default async function ChapterInfo({ params, sources }: any) {
  const { sId, mangaSlug } = params;



  const url = `${home}/api/chapter/${mangaSlug.join("/")}?id=${sId}`;
    const mangaData = await fetchData(url,'no-cache');
  const raw = mangaData.parent.split("/");
  const parent =  raw[raw.length - 1] !== "/" ? raw[raw.length - 1] : raw[raw.length - 2];
  const list = `${home}/api/manga/${parent}?id=${sId}`;
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
