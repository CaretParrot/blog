import { BlogEntryElement } from "./components/blog-entry";
import { BlogDatabaseElement } from "./components/blog-database";
import { BlogSearchElement } from "./components/blog-search";
import { type BlogScaffoldConfig } from "./config";
import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";

/**
 * Shape of each blog entry object.
 */
export type BlogEntry = {
    title: string;
    description: string;
    datePublished: string;
    imageURL: string;
    __content: string;
    tags: string[];
};

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

    blogSearch.oninput = () => {
        blogSearch.resultsCount = applyFilters(blogEntries, blogSearch);
    };

    blogSearch.minDate = blogEntries[blogEntries.length - 1].datePublished;
    blogSearch.maxDate = blogEntries[0].datePublished;
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
            blogEntries[i].datePublished <= endDate
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

    newBlog.title = blogsJSON[i].title;
    newBlog.description = blogsJSON[i].description;
    newBlog.imageURL = blogsJSON[i].imageURL;
    newBlog.datePublished = new Date(blogsJSON[i].datePublished);
    newBlog.tags = blogsJSON[i].tags;

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
async function defaultNavigation(
    database: BlogDatabaseElement,
    blogs: BlogEntry[],
    i: number
): Promise<void> {
    // Hides the main database and creates the blog post page

    database.style.display = "none";
    let backButton: HTMLButtonElement = document.createElement("button");
    let blogPost: HTMLDivElement = document.createElement("div");

    // Fills in the blog content by parsing and sanitizing the Markdown

    blogPost.innerHTML = DOMPurify.sanitize(
        await marked.parse(blogs[i].__content)
    );

    // Sets the back button to point back to the database page

    backButton.innerHTML = "Back";
    backButton.style.cursor = "pointer";
    backButton.style.fontFamily = "inherit";

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
 * Creates a list of blog entry elements from the input data.
 * Blogs are automatically sorted by date published.
 *
 * @param blogs
 * @param database
 * @returns
 */
async function generateBlogs(
    blogs: BlogEntry[],
    database: BlogDatabaseElement
): Promise<BlogEntryElement[]> {
    let blogElements: BlogEntryElement[] = [];

    for (let i = 0; i < blogs.length; i++) {
        // Creates a blog entry and adds it to the list

        blogElements.push(createBlogEntry(blogs, i));

        // Links the blog entry to the full post

        blogElements[i].onclick = () => {
            defaultNavigation(database, blogs, i);
        };
    }

    // Sorts the blogs by date published

    blogElements.sort(
        (a, b) => b.datePublished.getTime() - a.datePublished.getTime()
    );

    database.entryCount = blogs.length;

    return blogElements;
}

/**
 * Scaffolds the blog site, using arbitrary input.
 *
 * Does not handle data validation. Please check the this project's README file for data validation 
 * handling.
 */
export default async function scaffoldBlogSite(
    blogs: BlogEntry[],
    blogScaffoldConfig: BlogScaffoldConfig = {
        searchBar: true,
    }
): Promise<BlogDatabaseElement> {
    let database = document.createElement("blog-database");
    let searchBar;

    if (blogScaffoldConfig.searchBar) {
        searchBar = document.createElement("blog-search");
        database.appendChild(searchBar);
    }

    let blogElements = await generateBlogs(blogs, database);

    for (let i = 0; i < blogElements.length; i++) {
        database.appendChild(blogElements[i]);
    }

    if (blogScaffoldConfig.searchBar && searchBar !== undefined) {
        addSearchListener(searchBar, blogElements);
    }

    return database;
}
