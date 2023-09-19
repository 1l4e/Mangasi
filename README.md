# Manga Reader App with Next.js, PostgreSQL, and Prisma
Welcome to the Manga Reader App, a web application built with Next.js, PostgreSQL, and Prisma. This app allows you to read your favorite manga online with ease. Follow the steps below to get started.

## Getting Started
### Prerequisites
Before you begin, ensure you have the following installed on your system:

    * Node.js (v14.0 or higher)
    * npm (v7.0 or higher)
    * PostgreSQL (v12.0 or higher)
### Clone the Repository

```bash
git clone <repository-url>
cd manga-reader-app
```

### Configure Environment Variables

    Create a .env file in the root directory of the project and fill it with your database credentials. You can use the .env.example file as a template:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/manga_reader_db"
Replace username and password with your PostgreSQL credentials.
```

### Install Dependencies
    Install the project dependencies by running:

```bash
npm install
```

### Initialize the Database
    Run the following command to initialize the database and seed it with sample data:

```bash
npm run seed
```
### Start the Development Server
Start the Next.js development server:

```bash
npm run dev
```

Your Manga Reader App should now be running at http://localhost:3000. Open this URL in your web browser to access the application.

Now you can login with default user : 

```
admin@example.com/123123
```

### Usage

Browse and read your favorite manga by navigating through the user-friendly interface.
Enjoy the seamless reading experience with Next.js.
Use the search feature to find manga by title, genre, or author.

### Contributing

We welcome contributions to improve the Manga Reader App. Feel free to submit issues or pull requests to help us enhance the application.

### License

This project is licensed under the MIT License - see the LICENSE file for details.

### Acknowledgments

Thank you to the Next.js, PostgreSQL, and Prisma communities for providing the tools and resources necessary to build this Manga Reader App.
Happy reading! 📚📖

# TO DO NEXT

[X] - Scrolling
[X] - Scroll Slider
[ ] - Back to Manga Info
[ ] - Bookmark
[ ] - Password protect collection
[ ] - New Update status
[ ] - New Update notification
[ ] - Check for collections update
[X] - NSFW



# Default Pattern

{
    "hot": "hot",
    "home": "https://www.nettruyenus.com/",
    "news": "",
    "proxy":"proxy2",
    "manga": {
        "item": {
            "name": "h3 a",
            "image": ".image img",
            "new_chapter": {
                "selector": "ul li",
                "chapter_name": "a",
                "chapter_updated": "i.time"
            }
        },
        "child": {
            "name": "#item-detail h1.title-detail",
            "image": ".detail-info img",
            "author": "li.author a",
            "genres": ".kind a",
            "status": "li.status a",
            "chapter": {
                "child": {
                    "parent": "h1 a",
                    "selector": ".page-chapter img",
                    "nextChapter": ".page-chapter img",
                    "prevChapter": ".page-chapter img"
                },
                "server": [
                    "data-original",
                    "data-cdn"
                ],
                "chapterList": "#item-detail .list-chapter nav ul li",
                "chapterName": ".chapter a",
                "updatedTime": " .no-wrap.small"
            },
            "otherName": "li.othername h2",
            "description": ".detail-content p"
        },
        "selector": ".items .item"
    },
    "search": "tim-truyen?keyword=",
    "genreList": "#mainNav > div > div > div > div > ul > li:nth-child(5) > ul > li > div > div:nth-child(1) > ul",
    "manga_pos": "4",
    "filterList": ".comic-filter .sort-by div.col-sm-9  div",
    "manga_slug": "truyen-tranh",
    "pagination": "page",
    "chapter_pos": [
        "4",
        "5",
        "6"
    ]
}