#!/bin/bash

# Paths used in the compilation process

blog_directory="./blogs"
blog_entry_schema="./schemas/blog-entry.schema.json"
buffer="./src/all-blogs-buffer.json"
target="./src/all-blogs.json"

# Navigate to the blogs folder to read through the blogs

if [ ! -d $blog_directory ]; then
    echo "$blog_directory is not a directory, exiting..."
    exit 1
fi

touch $buffer
echo "[" > $buffer

# Loops through all files, checking against blog_entry_schema

function traverse_blogs() {
    local directory="$1"

    for file in "$directory"/*; do
        if [ -f "$file" ]; then
            echo "Checking: $file..."
            
            ajv -s $blog_entry_schema -d "$file" --strict-required

            # If the entry is invalid, delete the buffer and return a failure

            if [ $? -ne 0 ]; then
                rm $buffer
                exit 1
            fi

            # Otherwise, write the contents of the file to the buffer

            cat "$file" >> $buffer
            echo "," >> $buffer
        fi

        if [ -d "$file" ]; then
            traverse_blogs "$file"
        fi
    done
}

traverse_blogs "$blog_directory"

echo "]" >> $buffer

# Clears up trailing commas, adds formatting

npx prettier --write $buffer

# Copies the buffer into the target, and returns a success

touch $target
cat $buffer > $target
rm $buffer

exit 0