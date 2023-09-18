export interface MangaInfo {
  image: string;
  name: string;
  new_chapter: {
    selector: string;
    chapter_name: string;
    chapter_updated: string;
  };
}

export interface MangaChild {
  chapter: {
    chapterList: string;
    updatedTime: string;
    child: {
      selector: string;
    };
  };
  name: string;
  otherName: string;
  author: string;
  status: string;
}

export interface MangaObject {
  selector: string;
  item: MangaInfo;
  child: MangaChild;
}

export interface MangaData {
  home: string;
  search: string;
  genreList: string;
  filterList: string;
  manga: MangaObject;
  news: string;
  hot: string;
  pagination: string;
}