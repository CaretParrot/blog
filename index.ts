import { BlogEntry } from "./src/components/blog-entry";
import { BlogDatabase } from "./src/components/blog-database";

let database = document.createElement("blog-database");
document.body.appendChild(database);

let blogsFile = await fetch("blogs.json");
let blogsJSON = JSON.parse((await blogsFile.text()));

for (let i = 0; i < blogsJSON.length; i++) {
    let newBlog = document.createElement("blog-entry");
    newBlog.title = blogsJSON[i]["title"];
    newBlog.description = blogsJSON[i]["description"];
    newBlog.imageURL = blogsJSON[i]["imageURL"];

    newBlog.onclick = () => {
        database.style.display = "none";
        let backButton = document.createElement("button");
        let blogPost = document.createElement("div"); 

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