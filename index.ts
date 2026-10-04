import { BlogEntry } from "./src/components/blog-entry";
import { BlogDatabase } from "./src/components/blog-database";

let newDatabase = document.createElement("blog-database");
document.body.appendChild(newDatabase);

let blogsFile = await fetch("blogs.json");
let blogsJSON = JSON.parse((await blogsFile.text()));

for (let i = 0; i < blogsJSON.length; i++) {
    let newBlog = document.createElement("blog-entry");
    newBlog.title = blogsJSON[i]["title"];
    newBlog.description = blogsJSON[i]["description"];
    newBlog.imageURL = blogsJSON[i]["imageURL"];
    newDatabase.appendChild(newBlog);
}