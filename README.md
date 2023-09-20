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
    "api": "https://lxmanga.net/",
    "home": [
        {
            "slug": "/",
            "title": "Truyện hot",
            "selector": ".glide"
        },
        {
            "slug": "/",
            "title": "Truyện mới cập nhật",
            "selector": "div.grid"
        }
    ],
    "proxy": "proxy2",
    "search": "tim-truyen?keyword=",
    "selector": {
        "home": {
            "item": ".w-full.relative",
            "image": ".cover-frame .cover",
            "title": "a.text-ellipsis",
            "latest": ".latest-chapter a",
            "type" : ".cover",
            "imageSrc": "background-img"
        },
        "info": {
            "image": ".cover-frame .cover",
            "title": "div:nth-child(1) > div:nth-child(1) > span:nth-child(2)",
            "author": "div.mt-2:nth-child(4) > span:nth-child(2) > a:nth-child(1)",
            "genres": "div.mt-2:nth-child(3) > span:nth-child(2) a",
            "status": "span.text-blue-500",
            "otherName": "li.othername h2",
            "description": ""
        },
        "filter": {
            "item": ".w-full.relative",
            "image": ".cover-frame .cover",
            "title": "a.text-ellipsis",
            "latest": ".latest-chapter a",
            "type" : ".cover",
            "imageSrc": "src"
        },
        "chapter": {
            "item": ".text-center img.lazy",
            "imageSrc": "src"
        },
        "category": {
            "item": ".w-full.relative",
            "image": ".cover-frame .cover",
            "title": "a.text-ellipsis",
            "latest": ".latest-chapter a",
            "type" : ".cover",
            "imageSrc": "src"
        },
        "chapterLists": {
            "item": "ul.overflow-y-auto:nth-child(2) a",
            "time": ".listing td a:nth-child(2)",
            "title": "",
            "parent": "nav.grid:nth-child(2) > a:nth-child(2)"
        }
    },
    "proxyType": "",
    "pagination": "?page=*"
}
