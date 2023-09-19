import NotFound from "@/app/not-found";
import { home } from "@/lib/constant";
import { findOneSource } from "@/action/SourceModel";
import ChapterInfo from "@/app/dashboard/sources/[sId]/[...mangaSlug]/chapterSlug";
import MangaInfoComponent from "@/components/sources/user/MangaInfo.component";
import MangaChapterListComponent from "@/components/sources/user/MangaChapterList.component";
import { fetchData } from "@/action/fetch";

export default async function MangaInfo({ params, searchParams }: {
  params: {sId:string,mangaSlug:string},
  searchParams: {type:string}
}) {

  //Check Page type
  const { sId, mangaSlug } = params;
  const { type } = searchParams;
  if (type === "chapter") {
    return <ChapterInfo params={params} />;
  }
  // Get Sources
  const sources = await findOneSource(sId);
  if (!sources) {
    return <NotFound title="No Sources" />;
  }
  // Sources type
  // Get Manga Data
  const url = `${home}/api/manga/${mangaSlug}?id=${sId}`;
  const mangaData = await fetchData(url,'no-cache');

  return (
    <div className="flex flex-col w-full container">
     
      <MangaInfoComponent
        mangaData={mangaData}
        sId={sId}
      />
      <div className="flex flex-col">
        <MangaChapterListComponent mangaData={mangaData} id={sId} />
      </div>
    </div>
  );
}
