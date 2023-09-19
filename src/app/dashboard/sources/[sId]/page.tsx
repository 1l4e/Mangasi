import NotFound from "@/app/not-found";
import Content from "@/components/content.component";
import MangaLists from "@/components/sources/mangaList";
import Navigation from "@/components/sources/navigation";
import SourceGallery from "@/components/sources/singleSource";
import { findManyCollectionByEmail } from "@/action/CollectionController";
import { isSafe } from "@/action/UserController";
import { authOptions } from "@/lib/auth";
import { home } from "@/lib/constant";
import { findOneSource } from "@/action/SourceModel";
import { getServerSession } from "next-auth";
import { fetchSource } from "@/action/fetch";

async function getData(url: string) {
  try {
    const res = await fetch(url);
  const data = await res.json();
  return data.data;
  } catch (error) {
    console.log(error)
    return 
  }
  
}

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
  if (!page) {
    page = 1;
  }
  page = parseInt(page);
  let url = `${home}/api/sources?id=${sources.id}&page=${page}`;

  if (search) {
    url += `&search=${search}`;
  }
  if (filter){
    url+= `&filter=${filter}`
  }
  const pp = {
    page,search,filter
  }
  const mangaLists = await fetchSource(sources,pp)
  if (!mangaLists || JSON.stringify(mangaLists) === "{}") {
    return <NotFound title="Something wrong" />;
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
        {<SourceGallery sources={sources} page={page} search={search} />}
      </Content>
    </>
  );
}
