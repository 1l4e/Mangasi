import { findOneSource } from "@/action/SourceModel";
import { isSafe } from "@/action/UserController";
import { fetchManga } from "@/action/fetch";
import NotFound from "@/app/not-found";
import MangaChapterListComponent from "@/components/sources/user/MangaChapterList.component";
import { fromBase64 } from "@/lib/utils";


export default async function MangaInfo({params,searchParams}:
    {
        params: {},
        searchParams: {
            source:string;
            name:string;
        }
    }) {


  const { source,name } = searchParams;
  if (!source || !name){
    return <NotFound title="Source or Manga not found" />
  }
  const safe = await isSafe();
  const sources = await findOneSource(source,safe);
  if (!sources) {
    return <NotFound title="No Sources" />;
  }

  const mangaSlug= fromBase64(name)

  const mangaData = await fetchManga(sources,mangaSlug);
  //console.log(mangaData)
  if (!mangaData) {
    return <NotFound title="No Manga Data" />;
  }

  return (
    <div className="flex flex-col w-full container">
        <MangaChapterListComponent mangaData={mangaData} id={source}  />
    </div>
  );
}
