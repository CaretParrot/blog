import { BlogEntry } from "./components/blog-entry";
import { BlogDatabase } from "./components/blog-database";
import blogsJSON from "./blogs.json" with {type: "json"}; 
import { BlogPost } from "./blogs.schema";
import Ajv from "ajv";

const DEFAULT_PICTURE_URL = "https://caretparrot.github.io/papaya-salad/Profile%20Picture.png";
const ajv = new Ajv();

if (!ajv.validate(BlogPost, blogsJSON)) {
    let errorText = `ValidationError: Blog JSON is invalid.\n${ajv.errorsText()}`;
    document.body.innerHTML = errorText;
    throw errorText;
}

// Creates the database to hold the blogs

let database: BlogDatabase = document.createElement("blog-database");
document.body.appendChild(database);

// Generates the blogs for the blog database

for (let i = 0; i < blogsJSON.length; i++) {
    // Creates the new element, filling in information

    let newBlog: BlogEntry = document.createElement("blog-entry");
    newBlog.title = blogsJSON[i]["title"];
    newBlog.description = blogsJSON[i]["description"];
    newBlog.imageURL = blogsJSON[i]["imageURL"] || DEFAULT_PICTURE_URL;
    newBlog.datePublished = new Date(blogsJSON[i]["datePublished"]);

    // Links the blog entry to the full post

    newBlog.onclick = () => {
        // Hides the main database and creates the blog post page

        database.style.display = "none";
        let backButton: HTMLButtonElement = document.createElement("button");
        let blogPost: HTMLDivElement = document.createElement("div"); 

        // Fills in the blog content

        blogPost.innerHTML = blogsJSON[i]["content"];

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

    database.appendChild(newBlog);
}