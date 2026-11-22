#!/bin/bash

# Paths used in the compilation process

blog_directory="./blogs"
blog_entry_schema="./schemas/blog-entry.schema.json"
target="./src/all-blogs.json"

# If the blog directory is not a directory, exit with error

if [ ! -d $blog_directory ]; then
    echo "$blog_directory is not a directory, exiting..."
    exit 1
fi

# Creates a buffer to avoid overwriting main file on failure

touch $target
echo "[" > $target

function traverse_blogs() {
    local directory="$1"

    for file in "$directory"/*; do
        if [ -f "$file" ]; then
            echo "Adding: $file"
            cat "$file" | yaml-front-matter >> $target
            echo "," >> $target
        fi

        if [ -d "$file" ]; then
            traverse_blogs "$file"
        fi
    done
}

traverse_blogs "$blog_directory"

echo "]" >> $target

# Clears up trailing commas, adds formatting

npx prettier --write $target

exit 0