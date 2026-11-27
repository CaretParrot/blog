# blog.js

An easy-to-use blog site generator, featuring...

- Custom elements for searching and viewing posts
- Markdown page support
- Easy CLI compilation
- Simple, fast interface

# Local Setup

Use this repository as a template from the repository home page. Create a local clone of the repository on your local machine for easy editing and testing. Use the command below to install any necessary dependencies.

```bash
npm i
```

# Creating Your First Blog

Create a folder called "blogs" in the root of the repository. This is the entry point for all of your blogs.

blog.js uses Markdown for writing blog entries, and supports YAML Front Matter metadata syntax. Create a file in your blogs folder and write your content. Here is an example from my own blog posts...

```
---
title: New system for blog entries!
description: You can now use Markdown syntax to write blogs!
datePublished: November 21, 2026
imageURL: https://caretparrot.github.io/papaya-salad/Profile%20Picture.png
tags: ["first-blog", "introduction"]
---

# This is my *new* first blog written in blog.js!

How does this work?
```

You can write as many entries as you like, and you may also nest them in folders within your "blogs" folder for easier organization.

# Metadata

With the current project specifications, each Markdown file must have a metadata block with the exact data shown in the example. Incomplete, missing, or misaligned metadata will cause the compilation to throw an error, and can lead to a poorer experience when viewing your posts.

It's recommended to fill out this metadata for the best experience in viewing posts and using the search bar. The order of the metadata does not matter.

# Compilation

blog.js has a compilation step to allow for metadata validation and for easier loading into the HTML.

> **IMPORTANT**: As of the latest version, compilation is done through a bash script. If your operating system does not use bash for its terminal, make sure to use a bash-supported terminal.

> If you are editing your blogs in VS Code, you can open the built-in terminal and open a terminal session in Git Bash. This should allow you to execute the bash script correctly. Executing the bash script on a terminal that does not support Bash may cause unintended behavior.

Compilation involves...

- Parsing each Markdown file from the "blogs" folder into JSON objects, which contain the main content and metadata.
- Aggregating all JSON objects into a single file, "all-blogs.json".
- Applying Prettier to format the file.
- Validating the metadata of all Markdown files through ajv. This ensures that metadata required for the blog database viewer is present.

To compile your blogs, run the following command **in the root directory of your repository**...

```bash
bash scripts/compile.bash [blog-directory]
```

Executing the command with no arguments compiles all files from the "blogs" directory in the root of the repository. You can also pass in a path to a different folder if you want to keep your blogs elsewhere.

> The compilation process does not spellcheck your blogs. It's recommend to use a CLI or web tool to spellcheck your posts before compilation.

# Testing

VSCode and many other IDEs have a built-in Markdown preview tool to help you see the final formatting of your documents. If you want to see all of the blogs together live on the page, run the following...

```bash
npm run dev
```

Open the link to view the document. You can also do this to test any CSS styling that you may have added.

# Publishing

Publishing your blog can be done through GitHub Pages. Your repository should already have a built-in GitHub Actions workflow to handle compilation and deployment of your page. This file may be modified to suit your deployment pipeline.
