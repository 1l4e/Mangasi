import type {  Prisma  }  from '@prisma/client'

export type Collection = {
    id: number;
      name: string;
      slug: string;
      image: string;
      description: string;
      url: string;
      chapters: Prisma.JsonValue;
      created_at: Date | null;
      updated_at: Date | null;
      safe: boolean;
      sourceId: number;
  }