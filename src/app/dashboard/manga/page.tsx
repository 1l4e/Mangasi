import { findManyCollectionByEmail } from "@/action/CollectionController";
import { findOneSource } from "@/action/SourceModel";
import { isSafe } from "@/action/UserController";
import { fetchManga } from "@/action/fetch";
import NotFound from "@/app/not-found";
import MangaChapterListComponent from "@/components/sources/user/MangaChapterList.component";
import { authOptions } from "@/lib/auth";
import { fromBase64 } from "@/lib/utils";
import { getServerSession } from "next-auth";


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
  const session = await getServerSession(authOptions);
  if (!session) return <NotFound title="not Auth" />;
  const collections = await findManyCollectionByEmail(session.user.id);
  if (!sources) {
    return <NotFound title="No Sources" />;
  }

  const mangaSlug= fromBase64(name)

  const mangaData = await fetchManga(sources,mangaSlug);
  if (!mangaData || mangaData.chapters.length ===0) {
    return <NotFound title="No Manga Data" />;
  }

  return (
    <div className="flex flex-col w-full container">
        <MangaChapterListComponent mangaData={mangaData} id={source} collections={collections} mangaSlug={mangaSlug}  />
    </div>
  );
}
