import { scaffoldBlogSite } from "./blog-lib";
import blogs from ".//blogs/10_15_26.json" with { type: "json" };

// Scaffolds the blog site with no custom settings

document.body.appendChild(scaffoldBlogSite(blogs));
