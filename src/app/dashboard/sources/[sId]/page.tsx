import NotFound from "@/app/not-found";
import Content from "@/components/content.component";
import MangaLists from "@/components/sources/mangaList";
import Navigation from "@/components/sources/navigation";
import SourceGallery from "@/components/sources/singleSource";
import { findManyCollectionByEmail } from "@/action/CollectionController";
import { isSafe } from "@/action/UserController";
import { authOptions } from "@/lib/auth";
import { findOneSource } from "@/action/SourceModel";
import { getServerSession } from "next-auth";
import { fetchSource } from "@/action/fetch";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";
import { fromBase64, toBase64 } from "@/lib/utils";


export default async function SingleSource({ params, searchParams }: any) {
  const safe = await isSafe();
  const sources = await findOneSource(params.sId, safe);
  const session = await getServerSession(authOptions);
  if (!session) return <NotFound title="not Auth" />;
  const collections = await findManyCollectionByEmail(session.user.id);
  if (!sources) {
    return <NotFound title="No Source" />;
  }
  let page = searchParams.page;
  let search = searchParams.search;
  let filter = searchParams.filter
  let category = searchParams.category
  if (!page) {
    page = 1;
  }
  page = parseInt(page);

  const pp = {
    page, search, filter, category: category ? fromBase64(category) : ''
  }
  const mangaLists = await fetchSource(sources, pp);
  if (!mangaLists || JSON.stringify(mangaLists) === "{}") {
    return <NotFound title="Error fetching data" />;
  }
  return (
    <>
      <Content>{sources.name}</Content>
      <Content>
        <Navigation sources={sources} page={page} />
        <MangaLists
          mangaLists={mangaLists}
          sources={sources}
          collections={collections}
        />
        {<SourceGallery sources={sources} page={page} />}
        <div className="fixed bottom-20 right-4">
          <Dialog>
            <DialogTrigger>
              <span className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2">
                Category
              </span>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>List of Chapter</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <div className="flex flex-col h-[50vh] overflow-scroll">
                <ul className="grid grid-cols-1 px-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-2 text-xs">
                  {mangaLists[0]?.filters?.map((item: any, index: number) => (
                    <li className="" key={index}>
                      <Link
                        className="flex px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 justify-between items-center font-bold rounded-full     "
                        href={`/dashboard/sources/${sources.id}?category=${toBase64(item.slug)}`}
                      >
                        <span> {item.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

            </DialogContent>
          </Dialog>
        </div>
      </Content>
    </>
  );
}
