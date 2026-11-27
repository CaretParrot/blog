#!/bin/bash

# Paths used in the compilation process

DEFAULT_BLOG_DIRECTORY="./blogs"
blog_directory="${1:-$DEFAULT_BLOG_DIRECTORY}"
BLOG_ENTRY_SCHEMA="./schemas/blog-entry.schema.json"
TARGET="./src/all-blogs.json"

# If the blog directory is not a directory, exit with error

if [ ! -d $blog_directory ]; then
    echo "$blog_directory is not a directory, exiting..."
    exit 1
fi

# Create the target file, then start compilation

touch $TARGET
echo "[" > $TARGET

declare -i i=0

function traverse_blogs() {
    local directory="$1"

    # For each file in the directory, parse it through yaml-front-matter, then write it to the target

    for file in "$directory"/*; do
        if [ -f "$file" ]; then
            echo "$i: $file"
            i+=1
            cat "$file" | yaml-front-matter >> $TARGET
            echo "," >> $TARGET
        fi

        # Traverses directories recursively

        if [ -d "$file" ]; then
            traverse_blogs "$file"
        fi
    done
}

traverse_blogs "$blog_directory"

echo "]" >> $TARGET

# Clears up trailing commas, adds formatting

npx prettier --write $TARGET

# Validates the data to check for missing or misaligned metadata

ajv -s "./schemas/blogs-array.schema.json" -d "./src/all-blogs.json" --errors=text

if [ $? -ne 0 ]; then
    exit 1
fi

exit 0