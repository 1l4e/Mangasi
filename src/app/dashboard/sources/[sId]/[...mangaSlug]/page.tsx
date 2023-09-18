import NotFound from "@/app/not-found";
import ApiMangaDetail from "@/components/apiSource/apiMangaDetail";
import { home } from "@/lib/constant";
import { findOneSource } from "@/action/SourceModel";
import axios from "axios";
import ChapterInfo from "@/app/dashboard/sources/[sId]/[...mangaSlug]/chapterSlug";
import MangaChapterListComponent from "@/components/sources/user/MangaChapterList.component";
import logger from "@/lib/logger";
import { isSafe } from "@/action/UserController";
import { fetchData } from "@/action/fetch";




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
  // Get Sources
  console.log('This not run')

  // Sources type
  if (sources.type === "api") {
    return <ApiMangaDetail params={params} searchParams={searchParams} />;
  }
  // Get Manga Data
  const url = `${home}/api/manga/${mangaSlug}?id=${sId}`;
  logger({url});
  const mangaData = await fetchData(url,'no-cache');
  if (!mangaData) {
    return <NotFound title="No Manga Data" />;
  }

  return (
    <div className="flex flex-col w-full container">
        <MangaChapterListComponent mangaData={mangaData} id={sId}  />
    </div>
  );
}
