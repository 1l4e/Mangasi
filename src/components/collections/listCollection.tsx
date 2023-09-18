import { getServerSession } from "next-auth";
import CollectionCard from "./collectionCard";
import { authOptions } from "@/lib/auth";
import NotFound from "@/app/not-found";
import { findManyCollectionByEmail } from "@/action/CollectionController";
import { getUserFromSession } from "@/action/UserController";

export default async function ListCollection() {

  const session = await getServerSession(authOptions);
  if (!session) return <NotFound />
  const user = await getUserFromSession(session)
  if(!user){
    return <></>
  }
  const collections = await findManyCollectionByEmail(user.id);

  return (
    <div className="flex flex-row gap-4 container">
      {collections?.map((items:any,index:number)=>(
       <CollectionCard data={items} key={index} />
      ))}
      <CollectionCard />
    </div>
  )
}
