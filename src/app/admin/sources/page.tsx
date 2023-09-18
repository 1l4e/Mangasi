import AddSource from "@/components/sources/addSource";
import ListSource from "@/components/sources/listSources";
import { findManySources } from "@/action/SourceModel";


export default async function Source() {
  const sources = await findManySources();
  return (
    <>
      <div className="relative container w-full">
        <section>
          <div className="flex flex-col gap-4">
            <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow">
              <div className="flex-1 space-y-4 lg:p-8 pt-6">
                <AddSource />
              </div>
            </div>
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
