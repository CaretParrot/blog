#!/bin/bash

# Paths used in the compilation process

blog_entry_schema="../schemas/blog-entry.schema.json"
buffer="../src/all-blogs-buffer.json"
target="../src/all-blogs.json"

# Navigate to the blogs folder to read through the blogs

cd blogs
touch $buffer
echo "[" > $buffer

# Loops through all files, checking against blog_entry_schema

for FILE in *; do 
    echo "Checking: $FILE..."
    
    ajv -s $blog_entry_schema -d "$FILE" --strict-required

    # If the entry is invalid, delete the buffer and return a failure

    if [ $? -ne 0 ]; then
        rm $buffer
        exit 1
    fi

    # Otherwise, write the contents of the file to the buffer

    cat "$FILE" >> $buffer
    echo "," >> $buffer
done

echo "]" >> $buffer

# Clears up trailing commas, adds formatting

npx prettier --write $buffer

# Copies the buffer into the target, and returns a success

touch $target
cat $buffer > $target
rm $buffer

exit 0