import { addNewCollection } from "@/action/CollectionController";
import { getUserFromSession } from "@/action/UserController";
import NotFound from "@/app/not-found";
import Content from "@/components/content.component";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function NewCollection() {
    const session = await getServerSession(authOptions);
    if (!session) return <NotFound/>
    const user = await getUserFromSession(session);
    if (!user) return <NotFound />
    async function serverAction(formData:FormData){
        "use server"
        await addNewCollection(user?.id,formData)
    }
  return (
    <Content>
      <div className="container mx-auto">
      <h1>Add new Collections</h1>
       <form action={serverAction}>
       <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input name="name" id="name" type="text" />
        <Label htmlFor="description">Description</Label>
        <Input name="description" id="name" type="text" />
        <Label htmlFor="image">Image</Label>
        <Input name="image" id="name" type="text" />
        <Input name="user" id="user" type="hidden" value={user.id} />
        <Button>Submit</Button>
        </div>
       </form>
      </div>
       
    </Content>
  )
}
