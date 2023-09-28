import { findOneCollectionItemsBookMark } from "@/action/CollectionController";
import { findOneSource } from "@/action/SourceModel";
import { isSafe } from "@/action/UserController";
import { fetchManga } from "@/action/fetch";
import NotFound from "@/app/not-found";
import MangaChapterListComponent from "@/components/sources/user/MangaChapterList.component";
import { fromBase64, toBase64 } from "@/lib/utils";
import Link from "next/link";


export default async function MangaInfo({params,searchParams}:
    {
        params: {},
        searchParams: {
            source:string;
            name:string;
            cId:string;
        }
    }) {


  const { source,name,cId } = searchParams;
  if (!source || !name || !cId){
    return <NotFound title="Source or Manga not found" />
  }
  const safe = await isSafe();
  const sources = await findOneSource(source,safe);
  if (!sources) {
    return <NotFound title="No Sources" />;
  }

  const mangaSlug= fromBase64(name)

  const mangaData = await findOneCollectionItemsBookMark(parseInt(cId),mangaSlug);
  if (!mangaData ) {
    return <NotFound title="No Manga Data" />;
  }
  return (
    <div className="flex flex-col w-full container">
        <div className="flex flex-col">
        <ul className="grid grid-cols-1 px-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-2 text-xs">
          {mangaData?.map((chapter: any, index: number) => (
            <li className="" key={index}>
              <Link
                className="flex px-4 py-2 bg-green-700 justify-between items-center font-bold rounded-full text-white visited:text-red-600 visited:bg-gray-600 visited:hover:bg-gray-400 "
                href={`/dashboard/chapter?source=${source}&chapter=${toBase64(chapter.reading)}`}
              >
                <span> {chapter.reading}</span>
                <span className="text-xs text-gray-200">
                  {" "}
                  
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
