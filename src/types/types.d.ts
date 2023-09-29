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

  export type SourceSelector = {
    api: string;
    search:string;
    pagination:string;
    proxy:string;
    proxyType:string;
    home: SelectorHome[];
    selector: {
      home: {
        item: string;
        title: string;
        image: string;
        imageSrc: string;
        type:string;
        latest: string;
      };
      category: {
        item: string;
        title: string;
        image: string;
        imageSrc: string;
        type:string;
        latest: string;
      };
      filter: {
        item: string;
        title: string;
        slug:string;
      };
      info: {
        title: string;
        otherName: string;
        description: string;
        image: string;
        type:string;
        imageSrc: string;
        genres:string;
        status:string;
        author:string;
      };
      chapterLists: {
        parent:string;
        item: string;
        title: string;
        time:string;
        slug:string;
      };
      chapter: {
        item: string;
        imageSrc:string;
      };
    };
  };

  export type SelectorHome = {
    title: string;
    selector: string;
    slug: string;
  }