"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const sourceSchema = z.object({
  name: z.string(),
  url: z.string().url(),
  image: z.string().url(),
  order: z.string(),
  selector: z.string(),
});

export async function addNewSource(formData: FormData) {
  try {
    let name = formData.get("source_name");
    let url = formData.get("source_url");
    let image = formData.get("source_image");
    let order = formData.get("source_order");
    let selector = formData.get("source_selector");
    let type = formData.get("source_type");
    let safe_source = formData.get('source_safe')?.toString();
    let safe = false
    if (!safe_source) {
        safe = false
    }
    else{
        safe = true
    }
    if (!name || !url || !image || !order || !selector || !type) {
       return {message: [
            {
              code: "error",
              path: ["empty field"],
            },
          ],}
    }
    sourceSchema.parse({
      name,
      url,
      image,
      order,
      selector,
      type
    });
    
    const check = await prisma.source.findFirst({
        where: {
            name: name.toString()
        }
    })
    if (check) {
        return {
            message: [
              {
                code: "source exists",
                path: ["exists"],
              },
            ],
          };
    }
    await prisma.source.create({
        data:{
            name: name.toString(),
            url: url.toString(),
            image: image.toString(),
            order: parseInt(order.toString()),
            selector: JSON.parse(selector.toString()),
            type: type.toString(),
            safe: safe
        }
    })
    revalidatePath('/admin/sources');
    return {
      message: [
        {
          code: "success",
          path: ["success"],
        },
      ],
    };
  } catch (error: any) {
    console.log(error)
    return {
      message: error.errors,
    };
  }
}

export async function editSource(formData:FormData){
  try {
    console.log("Edit Source")
    let id = formData.get('source_id');
    let name = formData.get("source_name");
    let url = formData.get("source_url");
    let image = formData.get("source_image");
    let order = formData.get("source_order");
    let selector = formData.get("source_selector");
    let safe_source = formData.get('source_safe')?.toString();
    let safe = false
    if (!safe_source) {
        safe = false
    }
    else{
        safe = true
    }
    if (!id || !name || !url || !image || !order || !selector) {
       return {message: [
            {
              code: "error",
              path: ["empty field"],
            },
          ],}
    }
    sourceSchema.parse({
      name,
      url,
      image,
      order,
      selector,
    });

    await prisma.source.update({
        where:{
          id: parseInt(id.toString())
        },
        data:{
            name: name.toString(),
            url: url.toString(),
            image: image.toString(),
            order: parseInt(order.toString()),
            selector: JSON.parse(selector.toString()),
            safe: safe
        }
    })
    revalidatePath('/admin/sources');
    return {
      message: [
        {
          code: "success",
          path: ["success"],
        },
      ],
    };
  } catch (error: any) {
    return {
      message: error.errors,
    };
  }
}

export async function deleteSource(formData:FormData){

  const id = formData.get('id')
  if (!id){
    return {
      message: "failed"
    }
  }
  const source = await prisma.source.findFirst({
    where: {
      id: parseInt(id.toString())
    }
  })
  if (source){
    await prisma.source.delete({
      where: {
        id: parseInt(id.toString())
      }
    })
    revalidatePath(`/admin/sources`);
    return {
      message: "success"
    }
  }
  return {
    message: "Something Wrong"
  }
}