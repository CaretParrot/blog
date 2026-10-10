import { BlogEntry } from "./src/components/blog-entry";
import { BlogDatabase } from "./src/components/blog-database";
import { registerSchema, validate, SchemaObject } from "@hyperjump/json-schema/draft-2020-12";

// Creates the database to hold the blogs

let database: BlogDatabase = document.createElement("blog-database");
document.body.appendChild(database);

// Fetches the schema and registers the schema to the URL

let blogsSchemaFile = await fetch("blogs.schema.json");
let schemaText: SchemaObject = JSON.parse(await blogsSchemaFile.text());
registerSchema(schemaText, "https://caretparrot.github.io/blog");

// Fetches the blogs

let blogsFile = await fetch("blogs.json");
let blogsJSON = JSON.parse(await blogsFile.text());

// Tests the blogs against the schema

const schemaTest = await validate("https://caretparrot.github.io/blog", blogsJSON);

if (!schemaTest.valid) {
    throw `INVALID_BLOG: ${schemaTest.errors}`;
}

for (let i = 0; i < blogsJSON.length; i++) {
    let newBlog: BlogEntry = document.createElement("blog-entry");

    newBlog.title = blogsJSON[i]["title"];
    newBlog.description = blogsJSON[i]["description"];
    newBlog.imageURL = blogsJSON[i]["imageURL"];
    newBlog.datePublished = new Date(blogsJSON[i]["datePublished"]);

    newBlog.onclick = () => {
        database.style.display = "none";
        let backButton: HTMLButtonElement = document.createElement("button");
        let blogPost: HTMLDivElement = document.createElement("div"); 

        blogPost.innerHTML = blogsJSON[i]["content"];

        backButton.innerHTML = "&lt-";
        backButton.onclick = () => {
            backButton.remove();
            blogPost.remove();
            database.style.display = "block";
        }
        
        document.body.appendChild(backButton);
        document.body.appendChild(blogPost);
    }

    database.appendChild(newBlog);
}