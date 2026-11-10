import { BlogEntryElement } from "./components/blog-entry";
import { BlogDatabaseElement } from "./components/blog-database";
import { BlogSearchElement } from "./components/blog-search";
import * as blogsSchema from "../blogs.schema.json" with {type: "json"};
import Ajv, { type JSONSchemaType } from "ajv";

/**
 * Defines the type to check input JSON files against.
 */
export type BlogEntryArray = BlogEntry[];

/**
 * Shape of each blog entry object.
 */
export type BlogEntry = {
    title: string;
    description: string;
    datePublished: string;
    imageURL: string;
    content: string;
    keywords?: string[];
    tags?: string[];
};

/**
 * Transforms the input schema input a format for Ajv.
 */

let ajvSchema: JSONSchemaType<BlogEntryArray> = JSON.parse(JSON.stringify(blogsSchema));
delete ajvSchema.$schema;

const ajv = new Ajv();
const validate = ajv.compile<BlogEntryArray>(ajvSchema);

/**
 * Creates the database for the blogs.
 * 
 * @returns
 */
function createDatabase(): BlogDatabaseElement {
    let database = document.createElement("blog-database");
    document.body.appendChild(database);

    return database;
}

/**
 * Creates a search bar and inserts it into the database.
 * 
 * @param database
 * @returns 
 */
function createSearch(database: BlogDatabaseElement): BlogSearchElement {
    let searchBar = document.createElement("blog-search");
    database.appendChild(searchBar);

    return searchBar;
}

/**
 * Adds an event listener to a search bar to filter for blog entries.
 * Sets up the search range limit for the blog search entries.
 * 
 * @param blogSearch 
 * @param blogEntries 
 */
function addSearchListener(
    blogSearch: BlogSearchElement,
    blogEntries: BlogEntryElement[]
) {
    blogSearch.resultsCount = blogEntries.length;

    blogSearch.addEventListener("filterentries", () => {
        blogSearch.resultsCount = applyFilters(blogEntries, blogSearch);
    });

    blogSearch.minDate = blogEntries[0].datePublished;
    blogSearch.maxDate = new Date();
    blogSearch.startDate = blogSearch.minDate;
    blogSearch.endDate = blogSearch.maxDate;
}

/**
 * Applies all filters to the blog entries.
 * This includes a string match and a date range match.
 * Date range match will not run if either date is invalid.
 * 
 * @param blogEntries 
 * @param blogSearch 
 * @returns 
 */
function applyFilters(
    blogEntries: BlogEntryElement[],
    blogSearch: BlogSearchElement
): number {
    let finalResultsCount = 0;
    finalResultsCount = searchQuery(blogEntries, blogSearch.query);

    finalResultsCount = dateRangeQuery(
        blogEntries,
        blogSearch.startDate,
        blogSearch.endDate
    );

    return finalResultsCount;
}

/**
 * Loops through all blog entries, showing only ones that match the search query.
 * 
 * @param blogEntries 
 * @param query 
 * @param caseSensitive 
 * @returns 
 */
function searchQuery(
    blogEntries: BlogEntryElement[],
    query: string,
    caseSensitive: boolean = false
): number {
    let filteredResultsCount = 0;

    for (let i = 0; i < blogEntries.length; i++) {
        if (
            (caseSensitive &&
                (blogEntries[i].title.includes(query) ||
                    blogEntries[i].description.includes(query))) ||
            (!caseSensitive &&
                (blogEntries[i].title
                    .toLowerCase()
                    .includes(query.toLowerCase()) ||
                    blogEntries[i].description
                        .toLowerCase()
                        .includes(query.toLowerCase())))
        ) {
            blogEntries[i].style.display = "grid";
            filteredResultsCount++;
        } else {
            blogEntries[i].style.display = "none";
        }
    }

    return filteredResultsCount;
}

/**
 * Loops through all blog entries, showing only the ones that fall within the date range.
 * Stacks upon previous filters.
 * 
 * @param blogEntries 
 * @param startDate 
 * @param endDate 
 * @returns 
 */
function dateRangeQuery(
    blogEntries: BlogEntryElement[],
    startDate: Date,
    endDate: Date
): number {
    let filteredResultsCount = 0;

    for (let i = 0; i < blogEntries.length; i++) {
        if (
            blogEntries[i].datePublished >= startDate &&
            blogEntries[i].datePublished <= endDate &&
            blogEntries[i].style.display !== "none"
        ) {
            blogEntries[i].style.display = "grid";
            filteredResultsCount++;
        } else {
            blogEntries[i].style.display = "none";
        }
    }

    return filteredResultsCount;
}

/**
 *
 * Creates a blog entry element.
 * Function does not append elements to the DOM, since all entries are sorted after creation.
 *
 * @param blogsJSON 
 * @param i 
 * @returns 
 */
function createBlogEntry(blogsJSON: BlogEntry[], i: number): BlogEntryElement {
    let newBlog: BlogEntryElement = document.createElement("blog-entry");
    newBlog.title = blogsJSON[i]["title"];
    newBlog.description = blogsJSON[i]["description"];
    newBlog.imageURL = blogsJSON[i]["imageURL"] || "";
    newBlog.datePublished = new Date(blogsJSON[i]["datePublished"]);
    return newBlog;
}

/**
 * Creates the default button interaction for each blog post.
 * Blog entries generate content page on click, then deletes the elements when the page is exited.
 * 
 * @param database 
 * @param blogs 
 * @param i 
 */
function defaultNavigation(
    database: BlogDatabaseElement,
    blogs: BlogEntry[],
    i: number
): void {
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
        database.style.display = "grid";
    };

    // Adds the elements to the DOM

    document.body.appendChild(backButton);
    document.body.appendChild(blogPost);
}

/**
 *
 * Adds all blog entries to the document.
 * Blogs are automatically sorted by date published.
 *
 * @param blogs 
 * @param database 
 * @returns 
 */
function generateBlogs(
    blogs: BlogEntry[],
    database: BlogDatabaseElement
): BlogEntryElement[] {
    let blogElements: BlogEntryElement[] = [];

    for (let i = 0; i < blogs.length; i++) {
        // Creates a blog entry and adds it to the list

        blogElements.push(createBlogEntry(blogs, i));

        // Links the blog entry to the full post

        blogElements[i].onclick = () => {
            defaultNavigation(database, blogs, i);
        };
    }

    blogElements.sort(
        (a, b) => b.datePublished.getTime() - a.datePublished.getTime()
    );

    for (let i = 0; i < blogElements.length; i++) {
        database.appendChild(blogElements[i]);
    }

    database.entryCount = blogs.length;

    return blogElements;
}

/**
 * Validates the JSON input.
 * If the input is invalid, throws and error and stops rendering the page.
 * Otherwise, returns an array of blog entries.
 * 
 * @param blogs 
 * @returns 
 */
export function validateJSON(blogs: any): BlogEntry[] {
    const json = (typeof blogs === "string") ? JSON.parse(blogs) : blogs;

    if (!validate(json)) {
        throw validate.errors;
    }
    
    return json;
}

/**
 * Scaffolds the blog site, using arbitrary input.
 */
export function scaffoldBlogSite(blogs: any): void {
    let database = createDatabase();
    let searchBar = createSearch(database);
    let validatedJSON: BlogEntry[] = validateJSON(blogs);

    let blogElements = generateBlogs(validatedJSON, database);
    addSearchListener(searchBar, blogElements);
}
