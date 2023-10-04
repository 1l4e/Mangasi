const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require('bcrypt')



const source = [
  {
    url: 'https://nettruyenco.vn/',
    name: 'Net truyện CO',
    image: 'https://st.nettruyenus.com/data/logos/logo-nettruyen.png',
    selector: JSON.parse('{"api": "https://nettruyenco.vn/", "home": [{"slug": "/", "title": "Truyện đề cử", "selector": ".top-comics"}, {"slug": "/", "title": "Truyện mới cập nhật", "selector": ".main .center-side"}], "proxy": "proxy2", "search": "tim-truyen?keyword=", "selector": {"home": {"item": ".items .item", "image": ".image img", "title": "h3 a", "latest": "ul li", "imageSrc": "src"}, "info": {"image": ".detail-info img", "title": "h1", "author": "li.author a", "genres": ".kind a", "status": "li.status a", "otherName": "li.othername h2", "description": ".detail-content p"}, "filter": {"item": ".items .item", "image": ".image img", "title": "h3 a", "latest": "ul li", "imageSrc": "src"}, "chapter": {"item": ".page-chapter img", "imageSrc": "src"}, "category": {"item": ".items .item", "image": ".image img", "title": "h3 a", "latest": "ul li", "imageSrc": "src"}, "chapterLists": {"item": "#item-detail .list-chapter nav ul li", "time": ".no-wrap.small", "title": ".chapter a", "parent": "h1 a"}}, "proxyType": "", "pagination": "?page=*"}'),
    order: 1,
    safe: true,
    type: 'normal'
  },
  {
    url: 'https://www.nettruyenus.com/',
    name: 'Net truyện US',
    image: 'https://st.nettruyenus.com/data/logos/logo-nettruyen.png',
    selector: JSON.parse('{"api": "https://www.nettruyenus.com/", "home": [{"slug": "/", "title": "Truyện đề cử", "selector": ".top-comics"}, {"slug": "/", "title": "Truyện mới cập nhật", "selector": ".main .center-side"}], "proxy": "proxy3", "search": "tim-truyen?keyword=", "selector": {"home": {"item": ".items .item", "image": ".image img", "title": "h3 a", "latest": "ul li", "imageSrc": "data-original"}, "info": {"image": ".detail-info img", "title": "h1", "author": "li.author a", "genres": ".kind a", "status": "li.status a", "otherName": "li.othername h2", "description": ".detail-content p"}, "filter": {"item": ".items .item", "image": ".image img", "title": "h3 a", "latest": "ul li", "imageSrc": "data-original"}, "chapter": {"item": ".page-chapter img", "imageSrc": "data-original"}, "category": {"item": ".items .item", "image": ".image img", "title": "h3 a", "latest": "ul li", "imageSrc": "data-original"}, "chapterLists": {"item": "#item-detail .list-chapter nav ul li", "time": ".no-wrap.small", "title": ".chapter a", "parent": "h1 a"}}, "proxyType": "", "pagination": "?page=*", "proxyImage": "proxy2"}'),
    order: 1,
    safe: true,
    type: 'normal'
  },
  {
    url: 'https://hentaicube.net/',
    name: 'CubeTeam',
    image: 'https://hentaicube.net/wp-content/uploads/2018/08/cube-team-logo-retina.png',
    selector: JSON.parse('{"api": "https://hentaicube.net/", "home": [{"slug": "/", "title": "Truyện mới cập nhật", "selector": "#loop-content"}], "proxy": "proxy2", "search": "?s=*&post_type=wp-manga", "selector": {"home": {"item": ".badge-pos-2", "image": "img", "title": "h3 a", "latest": ".chapter-item", "imageSrc": "src"}, "info": {"image": ".summary_image img", "title": "h1", "author": "", "genres": ".genres-content a", "status": "div.post-content_item:nth-child(1) > div:nth-child(2)", "otherName": "", "description": ".manga-excerpt"}, "filter": {"item": ".badge-pos-2", "image": " img", "title": "h3 a", "latest": "ul li", "imageSrc": "src"}, "search": {"item": "div.c-tabs-item__content", "image": "img", "title": "h3 a", "latest": ".chapter", "imageSrc": "src"}, "chapter": {"item": ".doc-truyen img", "imageSrc": "src"}, "category": {"item": ".badge-pos-2", "image": "img", "title": "h3 a", "latest": "ul li", "imageSrc": "src"}, "chapterLists": {"item": ".version-chap li", "time": ".chapter-release-date", "title": " a", "parent": ".breadcrumb > li:nth-child(3) > a:nth-child(1)"}}, "proxyType": "https://manga.chamthoi.com/", "pagination": "/page/*/"}'),
    order: 1,
    safe: false,
    type: 'normal'
  },
  {
    url: 'https://lxmanga.net/',
    name: 'LxManga',
    image: 'https://media.loveitopcdn.com/3807/logo-coca-cola-vector-dongphucsongphu3.png',
    selector: JSON.parse('{"api": "https://lxmanga.net/", "home": [{"slug": "danh-sach", "title": "Truyện hot", "selector": "div.grid"}], "proxy": "", "search": "tim-kiem?sort=-updated_at&filter[name]=*&filter[status]=2,1", "selector": {"home": {"item": ".w-full.relative", "type": ".cover", "image": ".cover-frame .cover", "title": "a.text-ellipsis", "latest": ".latest-chapter a", "imageSrc": "background-img"}, "info": {"type": ".cover", "image": ".cover-frame .cover", "title": "div:nth-child(1) > div:nth-child(1) > span:nth-child(2)", "author": "div.mt-2:nth-child(4) > span:nth-child(2) > a:nth-child(1)", "genres": "div.mt-2:nth-child(3) > span:nth-child(2) a", "status": "span.text-blue-500", "otherName": "li.othername h2", "description": ""}, "filter": {"item": "ul.absolute a", "slug": "a", "title": "span"}, "chapter": {"item": ".text-center img.lazy", "imageSrc": "src"}, "category": {"item": ".w-full.relative", "type": ".cover", "image": ".cover-frame .cover", "title": "a.text-ellipsis", "latest": ".latest-chapter a", "imageSrc": "src"}, "chapterLists": {"item": "ul.overflow-y-auto:nth-child(2) a", "time": ".listing td a:nth-child(2)", "title": "", "parent": "nav.grid:nth-child(2) > a:nth-child(2)"}}, "proxyType": "", "pagination": "?page=*"}'),
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
