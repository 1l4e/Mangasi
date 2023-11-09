
import NotFound from "@/app/not-found";
import Heading from "@/components/heading.compoenent";
import ListSource from "@/components/sources/listSources";
import { isSafe } from "@/action/UserController";
import { findManySources } from "@/action/SourceModel";
import logger from "@/lib/logger";

async function getSource(safe:boolean){
  try {
   return  await findManySources(safe);
  } catch (error) {
    logger(error)
    return 
  }
}


export default async function Source() {
  const safe = await isSafe()
  const sources = await getSource(safe);
  if (!sources){
    return <NotFound title="Something WRong, Refresh page"/>
  }
  return (
    <>
    <Heading>Sources</Heading>
      <div className="container relative">
      
        <section>
          <div className="flex flex-col gap-4">
            <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow">
              <div className="flex-1 space-y-4 lg:p-8 pt-6">
                <ListSource sources={sources} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
