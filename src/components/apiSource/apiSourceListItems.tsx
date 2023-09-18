import NotFound from "@/app/not-found";
import { findOneSource } from "@/action/SourceModel";
import axios from "axios";
import Navigation from "../sources/navigation";
import MangaCard from "./apiMangaCard";
import SourceGallery from "../sources/singleSource";

export default async function ApiSource({params,searchParams}:any) {
   // console.log(params)
    const sourceId:string = params.sId;
    const sources = await findOneSource(sourceId);
    if (!sources){
        return <NotFound />
    }
    let page = searchParams.page;
    let search = searchParams.search;
    if (!page) {
        page = 1;
    }
    page = parseInt(page);
    let main = sources.url;
    const selector:any = sources.selector
    let url = `${main}${selector.news}?page=${page}`
   /*  if  (search){
        url +=`&search=${search}`;
      } */
  
      const res = await axios.get(url);
      const data = await res.data;
      const mangaLists= data.data

  return (
    <div className="container relative">
      <section>
        <div className="flex flex-col gap-4">
          <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow">
            <div className="flex flex-col  space-y-4 lg:p-8 pt-6 justify-center items-center text-center">
              <img src={sources.image} alt={sources.name} />
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
            {<SourceGallery sources={sources} page={page} search={search} />}
          </div>
        </div>
      </section>
    </div>
  )
}
