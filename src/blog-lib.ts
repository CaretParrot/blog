import { BlogEntryElement } from "./components/blog-entry";
import { BlogDatabaseElement } from "./components/blog-database";
import { BlogSearchElement } from "./components/blog-search";
import Ajv, { type JSONSchemaType } from "ajv";

export type BlogEntry = {
    title: string;
    description: string;
    datePublished: string;
    imageURL: string;
    content: string;
    keywords: string[];
};

export const BlogEntrySchema: JSONSchemaType<BlogEntry> = {
    type: "object",
    definitions: {
        title: { type: "string" },
        description: { type: "string" },
        datePublished: { type: "string" },
        imageURL: { type: "string" },
        content: { type: "string" },
        keywords: {
            type: "array",
            items: {type: "string"}
        }
    },
    required: ["title", "description", "datePublished", "imageURL", "content", "keywords"]
};

/**
 * Creates the database for the blogs.
 */
function createDatabase(): BlogDatabaseElement {
    let database = document.createElement("blog-database");
    document.body.appendChild(database);

    return database;
}

function createSearch(database: BlogDatabaseElement): BlogSearchElement {
    let searchBar = document.createElement("blog-search");
    database.appendChild(searchBar);
    return searchBar;
}

function addSearchListener(blogSearch: BlogSearchElement, blogEntries: BlogEntryElement[]) {
    blogSearch.resultsCount = filterBlogEntriesThatContain(blogEntries, blogSearch.query);

    blogSearch.oninput = () => {
        blogSearch.resultsCount = filterBlogEntriesThatContain(blogEntries, blogSearch.query);
    }
}

function filterBlogEntriesThatContain(blogEntries: BlogEntryElement[], query: string): number {
    let filteredResultsCount = 0;

    for (let i = 0; i < blogEntries.length; i++) {
        if (blogEntries[i].title.includes(query) ||
            blogEntries[i].datePublished.toString().includes(query) ||
            blogEntries[i].description.includes(query)) {
            blogEntries[i].style.display = "grid";
            filteredResultsCount++;
        } else {
            blogEntries[i].style.display = "none";
        }
    }

    return filteredResultsCount;
}

/**
 * Creates a blog entry using the JSONBlog type.
 */
function createBlogEntry(blogsJSON: BlogEntry[], i: number): BlogEntryElement {
    let newBlog: BlogEntryElement = document.createElement("blog-entry");
    newBlog.title = blogsJSON[i]["title"];
    newBlog.description = blogsJSON[i]["description"];
    newBlog.imageURL = blogsJSON[i]["imageURL"] || "";
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
function generateBlogs(blogs: BlogEntry[], database: BlogDatabaseElement): BlogEntryElement[] {
    let blogElements: BlogEntryElement[] = [];

    for (let i = 0; i < blogs.length; i++) {
        blogElements.push(createBlogEntry(blogs, i));

        // Links the blog entry to the full post

        blogElements[i].onclick = () => {
            addDefaultNavigation(database, blogs, i);
        }

        database.count++;
    }

    blogElements.sort((a, b) => b.datePublished.getTime() - a.datePublished.getTime());
    
    for (let i = 0; i < blogElements.length; i++) {
        database.appendChild(blogElements[i]);
    }

    return blogElements;
}

export function validateJSON(blogs: any): BlogEntry[] {
    try {
        const json = (typeof blogs === "string") ? JSON.parse(blogs) : blogs;
        const result: BlogEntry[] = [];
        const ajv = new Ajv();
        const validate = ajv.compile(BlogEntrySchema);

        for (let i = 0; i < blogs.length; i++) {
            if (!validate(json[i])) {
                throw validate.errors;
            }

            result.push({
                title: json[i].title,
                description: json[i].description,
                datePublished: json[i].datePublished,
                imageURL: json[i].imageURL,
                content: json[i].content,
                keywords: json[i].keywords
            } as BlogEntry);
        }

        return result;
    } catch (error) {
        throw error;
    }
}

/**
 * Scaffolds the blog site.
 */
export function scaffoldBlogSite(blogs: any): void {
    let database = createDatabase();
    let searchBar = createSearch(database);
    let validatedJSON: BlogEntry[] = validateJSON(blogs);

    let blogElements = generateBlogs(validatedJSON, database);
    addSearchListener(searchBar, blogElements);
}