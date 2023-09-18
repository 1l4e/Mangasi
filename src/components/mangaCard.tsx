"use client"

import { cn } from "@/lib/utils";
import Link from "next/link";

import AddToCollectionDialog from "./sources/user/AddToCollectionDialog.component";

export default async function MangaCard({ data, sources ,collections}: any) {
  return (
    <div className="">
      <div className="overflow-hidden rounded-md relative">
        <AddToCollectionDialog collections={collections} data={data} id={sources.id} />
        <Link href={`${sources.id}/${data.url}`}>
        {/* <Link href={`/dashboard/manga/${data.url}?id=${sources.id}`}> */}
          <img
            src={`/api/proxy2?source=${sources.url}&image=${data.image}`}
            alt="alt"
            width={305}
            height={400}
            className={cn("h-auto object-cover transition-all aspect-[3/4]")}
          />
        </Link>
        <div className=" text-center w-full ">
          <h3>{data.name}</h3>
          <ul>
            {data.latestChapters.map((latest: any, index: number) => (
              <li key={index} className="flex justify-between text-xs ">
                <Link href={sources.id + "/" + latest.url}>
                  {latest.name}
                </Link>
                <span>{latest.updated}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
