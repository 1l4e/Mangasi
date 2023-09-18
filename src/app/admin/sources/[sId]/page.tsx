"use server";
import { fetchData } from "@/action/fetch";
import NotFound from "@/app/not-found";
import MangaCard from "@/components/mangaCard";
import Navigation from "@/components/sources/navigation";
import SourceGallery from "@/components/sources/singleSource";
import { home } from "@/lib/constant";
import { findOneSource } from "@/action/SourceModel";
import Image from "next/image";

export default async function SingleSource({ params, searchParams }: any) {
  const sources = await findOneSource(params.sId);
  if (!sources) {
    return <NotFound />;
  }
  let page = searchParams.page;
  if (!page) {
    page = 1;
  }
  page = parseInt(page);
  const url =`${home}/api/sources?id=${sources.id}&page=${page}`;
  const mangaLists = await fetchData(url,'no-cache');
  return (
    <div className="relative">
      <section>
        <div className="flex flex-col gap-4">
          <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow">
            <div className="flex flex-col  space-y-4 lg:p-8 pt-6 justify-center items-center text-center">
              <Image width={200} height={34} src={sources.image} alt={sources.name} />
              {sources.name}
            </div>
          </div>
          <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow">
            <Navigation sources={sources} page={page} />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:p-8 p-1 pt-6">
              {mangaLists.map((item: any, index: number) => (
                <MangaCard key={index} data={item} id={sources.id} />
              ))}
            </div>
            {<SourceGallery sources={sources} page={page} />}
          </div>
        </div>
      </section>
    </div>
  );
}
