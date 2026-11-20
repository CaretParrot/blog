#!/bin/bash

cd blogs
echo "[" > ../src/all-blogs.json

for FILE in *; do 
    echo "Checking: $FILE..."
    
    ajv -s ../schemas/blog-entry.schema.json -d "$FILE" --strict-required

    if [ $? -ne 0 ]; then
        exit 1
    fi

    cat "$FILE" >> ../src/all-blogs.json
    echo "," >> ../src/all-blogs.json
done

echo "]" >> ../src/all-blogs.json
npx prettier --write ../src/all-blogs.json



exit 0