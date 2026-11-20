import { scaffoldBlogSite } from "./blog-lib";
import blogs from "./all-blogs.json" with { type: "json" };

// Scaffolds the blog site with no custom settings

document.body.appendChild(await scaffoldBlogSite(blogs));
