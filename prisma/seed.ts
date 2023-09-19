const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require('bcrypt')



const source =  [
  {
    url: 'https://nhattruyenplus.com/',
    name: 'NhatTruyen',
    image: 'https://st.nhattruyenplus.com/data/logos/logo-nhattruyen.png',
    selector: JSON.parse('{"hot": "hot", "home": "https://nhattruyenplus.com/", "news": "", "manga": {"item": {"name": "h3 a", "image": ".image img", "new_chapter": {"selector": "ul li", "chapter_name": "a", "chapter_updated": "i.time"}}, "child": {"name": "#item-detail h1.title-detail", "image": ".detail-info img", "author": "li.author a", "genres": ".kind a", "status": "li.status a", "chapter": {"child": {"parent": "h1 a", "selector": ".page-chapter img", "nextChapter": ".page-chapter img", "prevChapter": ".page-chapter img"}, "server": ["data-original", "data-cdn"], "chapterList": "#item-detail .list-chapter nav ul li", "chapterName": ".chapter a", "updatedTime": " .no-wrap.small"}, "otherName": "li.othername h2", "description": ".detail-content p"}, "selector": ".items .item"}, "search": "the-loai?keyword=", "genreList": "#mainNav > div > div > div > div > ul > li:nth-child(5) > ul > li > div > div:nth-child(1) > ul", "manga_pos": "4", "filterList": ".comic-filter .sort-by div.col-sm-9  div", "manga_slug": "truyen-tranh", "pagination": "page", "chapter_pos": ["4", "5", "6"]}'),
    order: 4,
    safe: true,
    type: 'normal'
  },
  {
    url: 'https://hentaicube.net/',
    name: 'CubeTeam',
    image: 'https://hentaicube.net/wp-content/uploads/2018/08/cube-team-logo-retina.png',
    selector: JSON.parse('{"hot": "hot", "home": "https://hentaicube.net/", "news": "", "manga": {"item": {"name": "h3 a", "image": " img", "new_chapter": {"selector": ".chapter-item", "chapter_name": "a", "chapter_updated": ".post-on"}}, "child": {"name": "h1", "image": ".summary_image img", "author": "", "genres": ".genres-content a", "status": "div.post-content_item:nth-child(1) > div:nth-child(2)", "chapter": {"child": {"parent": ".breadcrumb > li:nth-child(3) > a:nth-child(1)", "selector": ".doc-truyen img", "nextChapter": ".nav-next", "prevChapter": ".nav-previous "}, "server": ["src", "data-cdn"], "chapterList": ".version-chap li", "chapterName": "a", "updatedTime": ".chapter-release-date"}, "otherName": "", "description": ".manga-excerpt"}, "selector": ".badge-pos-2"}, "proxy": "proxy2", "search": "?s=", "genreList": "#mainNav > div > div > div > div > ul > li:nth-child(5) > ul > li > div > div:nth-child(1) > ul", "manga_pos": "4", "filterList": ".comic-filter .sort-by div.col-sm-9  div", "manga_slug": "read", "pagination": "/page/*/", "chapter_pos": ["4", "5", "6"]}'),
    order: 1,
    safe: false,
    type: 'normal'
  },
  {
    url: 'https://www.nettruyenus.com/',
    name: 'Net truyện',
    image: 'https://st.nettruyenus.com/data/logos/logo-nettruyen.png',
    selector: JSON.parse('{"hot": "hot", "home": "https://www.nettruyenus.com/", "news": "", "manga": {"item": {"name": "h3 a", "image": ".image img", "new_chapter": {"selector": "ul li", "chapter_name": "a", "chapter_updated": "i.time"}}, "child": {"name": "#item-detail h1.title-detail", "image": ".detail-info img", "author": "li.author a", "genres": ".kind a", "status": "li.status a", "chapter": {"child": {"parent": "h1 a", "selector": ".page-chapter img", "nextChapter": ".page-chapter img", "prevChapter": ".page-chapter img"}, "server": ["data-original", "data-cdn"], "chapterList": "#item-detail .list-chapter nav ul li", "chapterName": ".chapter a", "updatedTime": " .no-wrap.small"}, "otherName": "li.othername h2", "description": ".detail-content p"}, "selector": ".items .item"}, "proxy": "proxy2", "search": "tim-truyen?keyword=", "genreList": "#mainNav > div > div > div > div > ul > li:nth-child(5) > ul > li > div > div:nth-child(1) > ul", "manga_pos": "4", "filterList": ".comic-filter .sort-by div.col-sm-9  div", "manga_slug": "truyen-tranh", "pagination": "?page=*", "chapter_pos": ["4", "5", "6"]}'),
    order: 1,
    safe: true,
    type: 'normal'
  },
  {
    url: 'https://lxmanga.net/',
    name: 'LxManga',
    image: 'https://st.nettruyenus.com/data/logos/logo-nettruyen.png',
    selector: JSON.parse('{"hot": "hot", "home": "https://lxmanga.net/", "news": "danh-sach", "manga": {"item": {"name": ".text-ellipsis", "type": "div.rounded-t-lg.cover", "image": ".cover-frame .cover", "new_chapter": {"selector": ".latest-chapter a", "chapter_name": ".latest-chapter a", "chapter_updated": ".latest-chapter span"}}, "child": {"name": "div:nth-child(1) > div:nth-child(1) > span:nth-child(2)", "type": ".cover", "image": ".cover-frame .cover", "author": "div.mt-2:nth-child(4) > span:nth-child(2) > a:nth-child(1)", "genres": "div.mt-2:nth-child(3) > span:nth-child(2) a", "status": "span.text-blue-500", "chapter": {"child": {"parent": "nav.grid:nth-child(2) > a:nth-child(2)", "selector": ".text-center img.lazy", "nextChapter": ".text-center img", "prevChapter": ".text-center img"}, "server": ["src", "src"], "chapterList": "ul.overflow-y-auto:nth-child(2) a", "chapterName": "", "updatedTime": ".listing td a:nth-child(2)"}, "otherName": "li.othername h2", "description": ""}, "selector": ".mt-4 div.manga-vertical"}, "search": "tim-kiem?sort=-updated_at&filter[name]=", "genreList": ".grid-cols-3 a", "manga_pos": "2", "filterList": "", "manga_slug": "truyen", "pagination": "?page=*", "chapter_pos": ["2", "3"]}'),
    order: 1,
    safe: false,
    type: 'normal'
  }
  ]
    

async function seed(){
  //Default password 123123
    const user= {
      name: "1l4e",
      email: "admin@example.com",
      password: await bcrypt.hash('123123',10),
      is_admin: true
  }
    await prisma.source.deleteMany({});
    await prisma.users.deleteMany({});
    await prisma.collection.deleteMany({});

    const uu =await prisma.users.create({
        data: user
    })
    await prisma.source.createMany({
        data: source
    })
    await prisma.collection.create({
        data: {
          name: 'Default',
          image: 'https://st.nettruyenus.com/data/comics/236/thuong-nguyen-do.jpg',
          description: 'First Collections',
          author_id: uu.id
        }
    })
    console.log("Seeded")
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });