import { BlogEntry } from "./components/blog-entry";
import { BlogDatabase } from "./components/blog-database";

export type BlogType = {
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
function createDatabase(): BlogDatabase {
    let database: BlogDatabase = document.createElement("blog-database");
    document.body.appendChild(database);
    return database;
}

/**
 * Creates a blog entry using the JSONBlog type.
 */
function createBlogEntry(blogsJSON: BlogType[], i: number, config?: BlogGenerationConfig): BlogEntry {
    let newBlog: BlogEntry = document.createElement("blog-entry");
    newBlog.title = blogsJSON[i]["title"];
    newBlog.description = blogsJSON[i]["description"];
    newBlog.imageURL = blogsJSON[i]["imageURL"] || config?.defaultImageURL || "";
    newBlog.datePublished = new Date(blogsJSON[i]["datePublished"]);
    return newBlog;
}

function addDefaultNavigation(database: BlogDatabase, blogs: BlogType[], i: number): void {
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
function generateBlogs(blogs: BlogType[], database: BlogDatabase, config?: BlogGenerationConfig): void {
    for (let i = 0; i < blogs.length; i++) {
        let newBlog = createBlogEntry(blogs, i, config);

        // Links the blog entry to the full post

        newBlog.onclick = () => {
            addDefaultNavigation(database, blogs, i);
        }

        database.appendChild(newBlog);
    }
}

/**
 * Scaffolds the blog site.
 */
export function scaffoldBlogSite(blogs: BlogType[], config?: BlogGenerationConfig): void {
    let database = createDatabase();
    generateBlogs(blogs, database, config);
}