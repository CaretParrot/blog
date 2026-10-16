import { scaffoldBlogSite } from "./blog-lib";
import blogs from "./blogs.json" with {type: "json"};

scaffoldBlogSite(blogs);