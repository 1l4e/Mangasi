"use client";
import MangaCard from "../mangaCard";

export default async function MangaLists({
  mangaLists,
  sources,
  collections,
}: any) {
  return (
    <>
      {mangaLists.map((itemArray: any, index: number) => (
        <div key={index}>
          <div key={index}>
            <h1>{itemArray.title}</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 lg:p-8 p-1 pt-6">
              {itemArray?.mangas.map((item: any, index: number) => (
                <div key={index}>
                  <MangaCard
                    key={index}
                    data={item}
                    sources={sources}
                    collections={collections}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
