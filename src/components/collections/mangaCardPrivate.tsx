import { deleteOneMangaFromCollection } from "@/action/CollectionController";
import NotFound from "@/app/not-found";
import { authOptions } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";
import Link from "next/link";



export default async function MangaCardPrivate({ data,collectionId }: any) {
  const session = await getServerSession(authOptions);
  if (!session) return <NotFound />;
  async function removeFromCollection(formData:FormData){
    "use server"
    await deleteOneMangaFromCollection(formData,session?.user.id)
  }
  return (
    <div className="">
      <div className="overflow-hidden rounded-md relative">
        <form action={removeFromCollection}>

         <input name="collection" type="hidden" value={collectionId} />
        <input name="manga" type="hidden" value={data.id} />
        <button className="bg-red-500 px-2 text-white absolute top-0 right-0 ">Remove</button>
        </form>
        <Link href={`${data.sourceId}/${data.url}`}>
          <img
            src={data.image}
            alt="alt"
            width={305}
            height={400}
            className={cn("h-auto object-cover transition-all aspect-[3/4]")}
          />
        </Link>
        <div className=" text-center w-full ">
          <h3>{data.name}</h3>
          <ul>
          </ul>
        </div>
      </div>
    </div>
  );
}
