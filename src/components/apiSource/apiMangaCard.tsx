import { addMangaToCollection, findManyCollectionByEmail } from "@/action/CollectionController";
import NotFound from "@/app/not-found";
import { authOptions } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";
import Link from "next/link";


import AddToCollection from "../sources/addToCollection";
import Image from "next/image";

export default async function MangaCard({ data, id }: any) {
  const session = await getServerSession(authOptions);
  if (!session) return <NotFound />;
 /*  const collections = await findManyCollectionByEmail(session.user.id); */



  return (
    <div className="">
      <div className="overflow-hidden rounded-md relative">
        {/* <AddToCollection collections={collections} data={data} id={id} /> */}
        <Link href={`${id}/${data.id}`}>
          <Image
            src={data.cover_url}
            alt="alt"
            width={305}
            height={400}
            className={cn("h-auto object-cover transition-all aspect-[3/4]")}
          />
        </Link>
        <div className=" text-center w-full ">
          <h3>{data.name}</h3>
          <ul>
              <li className="flex justify-between text-xs ">
                <Link href={id + "/" + data.id + "/" + data.newest_chapter_id }>
                  Chapter {data.newest_chapter_number}
                </Link>
                <span>{data.newest_chapter_created_at}</span>
              </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
