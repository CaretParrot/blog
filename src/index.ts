import { scaffoldBlogSite } from "./blog-lib";
import blogs from "./blogs.json" with { type: "json" };

// Scaffolds the blog site with no custom settings

scaffoldBlogSite(blogs);
