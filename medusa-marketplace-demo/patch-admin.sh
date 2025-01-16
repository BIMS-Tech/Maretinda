#!/bin/bash

# Define target file
TARGET_FILE="node_modules/@medusajs/dashboard/dist/app.mjs"

# Ensure the target file exists
if [ ! -f "$TARGET_FILE" ]; then
  echo "Error: Target file $TARGET_FILE not found."
  exit 1
fi

# Add Impersonate block
echo "Patching $TARGET_FILE..."

# Prepare a temporary file to store the modified content
TEMP_FILE=$(mktemp)

# Prepare impersonation block
IMPERSONATION_BLOCK=$(cat <<'EOF'
var MainLayout=()=>{
  const impersonateKey="IMPERSIONATED_AS";
  const removeImpersonate=async()=> {
    localStorage.removeItem(impersonateKey);
    await fetch("/admin/impersonate-reset");
    window.location.href="/app";
  };
  const impersionatedAs=localStorage.getItem(impersonateKey);
  const children=[];
  if(impersionatedAs){
    children.push(jsx14("div",{
      className:"flex justify-between bg-ui-tag-purple-icon px-2 py-1 h-8 text-ui-fg-on-inverted",
      children:[
        jsx14("p",{children:`Impersonated as ${impersionatedAs}`}),
        jsx14("button",{
          onClick:removeImpersonate,
          className:"border border-ui-tag-neutral-border px-2",
          children:"Remove Impersonation"
        })
      ]
    }));
  }
  children.push(jsx14(Shell,{children:jsx14(MainSidebar,{})}));
  return jsx14("div",{children});
EOF
)

# Use `awk` to replace the content dynamically
awk -v block="$IMPERSONATION_BLOCK" '
BEGIN { replaced = 0 }
{
  if (!replaced && /var MainLayout=/) {
    print block
    replaced = 1
    # Skip lines until the end of the original MainLayout function
    while (!/return jsx14\("div"/) {
      getline
    }
    next
  }
  print
}
' "$TARGET_FILE" > "$TEMP_FILE" && mv "$TEMP_FILE" "$TARGET_FILE"

# Clean Vite cache
VITE_CACHE_DIR="node_modules/@medusajs/admin-bundler/node_modules/.vite"

if [ -d "$VITE_CACHE_DIR" ]; then
  echo "Cleaning Vite cache..."
  rm -rf "$VITE_CACHE_DIR"
else
  echo "Vite cache directory not found. Skipping..."
fi

echo "Patch applied successfully."
