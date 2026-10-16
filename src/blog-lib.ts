import { BlogEntryElement } from "./components/blog-entry";
import { BlogDatabaseElement } from "./components/blog-database";

export type BlogEntry = {
    title: string;
    description: string;
    datePublished: Date;
    imageURL: string;
    content: string;
};

export type BlogGenerationConfig = {
    defaultImageURL?: string;
};

/**
 * Creates the database for the blogs.
 */
function createDatabase(): BlogDatabaseElement {
    let database: BlogDatabaseElement = document.createElement("blog-database");
    document.body.appendChild(database);
    return database;
}

/**
 * Creates a blog entry using the JSONBlog type.
 */
function createBlogEntry(blogsJSON: BlogEntry[], i: number, config?: BlogGenerationConfig): BlogEntryElement {
    let newBlog: BlogEntryElement = document.createElement("blog-entry");
    newBlog.title = blogsJSON[i]["title"];
    newBlog.description = blogsJSON[i]["description"];
    newBlog.imageURL = blogsJSON[i]["imageURL"] || config?.defaultImageURL || "";
    newBlog.datePublished = new Date(blogsJSON[i]["datePublished"]);
    return newBlog;
}

function addDefaultNavigation(database: BlogDatabaseElement, blogs: BlogEntry[], i: number): void {
    // Hides the main database and creates the blog post page

    database.style.display = "none";
    let backButton: HTMLButtonElement = document.createElement("button");
    let blogPost: HTMLDivElement = document.createElement("div"); 

    // Fills in the blog content

    blogPost.innerHTML = blogs[i]["content"];

    // Sets the back button to point back to the database page

    backButton.innerHTML = "&lt-";

    backButton.onclick = () => {
        backButton.remove();
        blogPost.remove();
        database.style.display = "block";
    }

    // Adds the elements to the DOM
    
    document.body.appendChild(backButton);
    document.body.appendChild(blogPost);
}

/**
 * Fills in the blog database using the database input.
 */
function generateBlogs(blogs: BlogEntry[], database: BlogDatabaseElement, config?: BlogGenerationConfig): void {
    for (let i = 0; i < blogs.length; i++) {
        let newBlog = createBlogEntry(blogs, i, config);

        // Links the blog entry to the full post

        newBlog.onclick = () => {
            addDefaultNavigation(database, blogs, i);
        }

        database.appendChild(newBlog);
    }
}

export function validateJSON(blogs: any): BlogEntry[] {
    try {
        let json;

        if (typeof blogs === "string") {
            json = JSON.parse(blogs);
        } else {
            json = blogs;
        }

        const result: BlogEntry[] = [];

        for (let i = 0; i < blogs.length; i++) {
            result.push({
                title: json[i].title,
                description: json[i].description,
                datePublished: new Date(json[i].datePublished),
                imageURL: json[i].imageURL,
                content: json[i].content
            });
        }

        return result;
    } catch (error) {
        throw error;
    }
}

/**
 * Scaffolds the blog site.
 */
export function scaffoldBlogSite(blogs: any, config?: BlogGenerationConfig): void {
    let database = createDatabase();
    let validatedJSON: BlogEntry[] = validateJSON(blogs);

    generateBlogs(validatedJSON, database, config);
}