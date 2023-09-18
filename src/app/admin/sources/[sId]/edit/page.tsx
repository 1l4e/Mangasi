
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { editSource } from "@/action/source";
import { findOneSource } from "@/action/SourceModel";
import NotFound from "@/app/not-found";


export default async function EditSource({params}:any) {
    const source = await findOneSource(params.sId);
    if (!source){
        return <NotFound />
    }

  return (
    <div className="container relative">
        <section>
          <div className="flex flex-col gap-4">
            <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow">
              <div className="flex-1 space-y-4 lg:p-8 pt-6">
              <div>
      <h1 className="font-bold text-xl my-4">Edit Source</h1>
      <form action={editSource} className="flex gap-4 flex-col">
        <div className="flex w-full gap-1.5">
          <div className="flex flex-col gap-2 ">
            <Input name="source_id" type="hidden" value={source.id} />
            <Label htmlFor="name">Name</Label>
            <Input name="source_name" type="text" id="name" placeholder="name" defaultValue={source.name} />
            
            <Label htmlFor="url">Url</Label>
            <Input name="source_url" type="text" id="url" placeholder="url"  defaultValue={source.url}/>
            <Label htmlFor="image">Image</Label>
            <Input name="source_image" type="text" id="image" placeholder="image" defaultValue={source.image} />

            <Label htmlFor="order">Order</Label>
            <Input name="source_order" type="number" id="order" placeholder="order" defaultValue={source.order} />
            <Label htmlFor="safe" className="flex items-center gap-2">
              Safe
              <Checkbox name="source_safe" id="safe" defaultChecked={source.safe} />
            </Label>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <Label htmlFor="selector">Selector</Label>
            <Textarea className="h-[200px]" name="source_selector" id="selector" placeholder="selector" defaultValue={JSON.stringify(source.selector,undefined,4)} >
                
                </Textarea>
          </div>
        </div>
        
        <Button>Submit</Button>
      </form>
    </div>
              </div>
            </div>
            
          </div>
        </section>
      </div>
    
  );
}
