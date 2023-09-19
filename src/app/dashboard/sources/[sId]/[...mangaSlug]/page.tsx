import NotFound from "@/app/not-found";
import { findOneSource } from "@/action/SourceModel";
import ChapterInfo from "@/app/dashboard/sources/[sId]/[...mangaSlug]/chapterSlug";
import MangaChapterListComponent from "@/components/sources/user/MangaChapterList.component";
import { isSafe } from "@/action/UserController";
import { fetchManga } from "@/action/fetch";




export default async function MangaInfo({ params, searchParams }: any) {
  //Check Page type
  const { sId, mangaSlug } = params;
  const { type } = searchParams;
  
  const safe = await isSafe();
  const sources = await findOneSource(sId,safe);
  if (!sources) {
    return <NotFound title="No Sources" />;
  }
  if (type==="chapter") {
    return <ChapterInfo  params={params} sources={sources} />;
  }
  console.log('this not run')


  const mangaData = await fetchManga(sources,mangaSlug);
  if (!mangaData) {
    return <NotFound title="No Manga Data" />;
  }

  return (
    <div className="flex flex-col w-full container">
        <MangaChapterListComponent mangaData={mangaData} id={sId}  />
    </div>
  );
}
