"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import AddToCollection from "../addToCollection";
import { Button } from "@/components/ui/button";

export default async function AddToCollectionDiaLog({data,id,collections}:any) {

  return (
    <div className="absolute right-0">
        <Dialog>
        <DialogTrigger><span className="px-4 py-1 flex justify-center items-center hover:bg-blue-700 bg-blue-500/50 ">Save</span></DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Select collection?</DialogTitle>
            <DialogDescription>
            <AddToCollection collections={collections} data={data} id={id} />
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
        </Dialog>
    </div>
  )
}
