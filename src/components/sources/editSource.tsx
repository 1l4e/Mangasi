import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { editSource } from "@/action/source";


export default function EditSource({params}:any) {
    console.log(params)
    async function onCreate(formData: FormData) {
        const res = await editSource(formData)
      }
  return (
    <div>
      <h1 className="font-bold text-xl my-4">Edit Source</h1>
      <form action={onCreate} className="flex gap-4 flex-col">
        <div className="flex w-full gap-1.5">
          <div className="flex flex-col gap-2 ">
            <Input name="source_id" type="hidden" />
            <Label htmlFor="name">Name</Label>
            <Input name="source_name" type="text" id="name" placeholder="name" />
            
            <Label htmlFor="url">Url</Label>
            <Input name="source_url" type="text" id="url" placeholder="url" />
            <Label htmlFor="image">Image</Label>
            <Input name="source_image" type="text" id="image" placeholder="image" />

            <Label htmlFor="order">Order</Label>
            <Input name="source_order" type="number" id="order" placeholder="order" />
            <Label htmlFor="safe" className="flex items-center gap-2">
              Safe
              <Checkbox name="source_safe" id="safe" />
            </Label>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <Label htmlFor="selector">Selector</Label>
            <Textarea name="source_selector" id="selector" placeholder="selector" />
          </div>
        </div>
        
        <Button>Submit</Button>
      </form>
    </div>
  );
}
