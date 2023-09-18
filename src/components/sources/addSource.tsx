"use client"
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { addNewSource } from "@/action/source";
import { useState } from "react";


export default function AddSource() {
    const [message, setMessage] = useState<any>([]);

    async function onCreate(formData: FormData) {
        const res = await addNewSource(formData)
        setMessage(res.message)
      }
  return (
    <div>
      <h1 className="font-bold text-xl my-4">Add New Source</h1>
      <form action={onCreate} className="flex gap-4 flex-col">
        <div className="flex w-full gap-1.5">
          <div className="flex flex-col gap-2 ">
            <Label htmlFor="name">Name</Label>
            <Input name="source_name" type="text" id="name" placeholder="name" />
            
            <Label htmlFor="url">Url</Label>
            <Input name="source_url" type="text" id="url" placeholder="url" />
            <Label htmlFor="image">Image</Label>
            <Input name="source_image" type="text" id="image" placeholder="image" />

            <Label htmlFor="order">Order</Label>
            <Input name="source_order" type="number" id="order" placeholder="order" />
            <Label htmlFor="type">Type</Label>
            <Input name="source_type" type="text" id="order" placeholder="api/normal" />
            <Label htmlFor="safe" className="flex items-center gap-2">
              Safe
              <Checkbox name="source_safe" id="safe" />
            </Label>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <Label htmlFor="selector">Selector</Label>
            <Textarea name="source_selector" id="selector" placeholder="selector"  />
          </div>
        </div>
        {message?.map((item:any,index:number)=> (
          <p className="text-red-500 text-xs" key={index}>
            {item.path[0]} - {item.code} 
          </p>
        ))}
        <Button>Submit</Button>
      </form>
    </div>
  );
}
