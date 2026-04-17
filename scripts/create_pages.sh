#!/bin/bash
cd ~/Dev/miselia/miselia-frontend

pages=(
  "app/(public)/page.tsx"
  "app/(public)/pricing/page.tsx"
  "app/(public)/faq/page.tsx"
  "app/(auth)/login/page.tsx"
  "app/(auth)/register/page.tsx"
  "app/(auth)/callback/page.tsx"
  "app/(auth)/onboarding/page.tsx"
  "app/find-papers/page.tsx"
  "app/find-papers/[sessionId]/page.tsx"
  "app/(dashboard)/page.tsx"
  "app/(dashboard)/library/page.tsx"
  "app/(dashboard)/chat/page.tsx"
  "app/(dashboard)/chat/new/page.tsx"
  "app/(dashboard)/chat/[sessionId]/page.tsx"
  "app/(dashboard)/projects/page.tsx"
  "app/(dashboard)/projects/new/page.tsx"
  "app/(dashboard)/projects/[projectId]/page.tsx"
  "app/(dashboard)/projects/[projectId]/stages/new/page.tsx"
  "app/(dashboard)/projects/[projectId]/stages/[stageRunId]/progress/page.tsx"
  "app/(dashboard)/projects/[projectId]/stages/[stageRunId]/results/page.tsx"
  "app/(dashboard)/subscription/page.tsx"
  "app/(dashboard)/settings/page.tsx"
)

# Derive component name dari full directory path
derive_component() {
  local dir="$1"
  # Strip leading "app/" dan trailing "/page.tsx" sudah di-handle dari dirname
  # Strip route groups (public), (auth), (dashboard)
  # Strip dynamic segments [] tapi retain semantic name
  local stripped
  stripped=$(echo "$dir" \
    | sed 's|^app/||' \
    | tr -d '()' \
    | sed 's|\[sessionId\]|Session|g' \
    | sed 's|\[projectId\]|Project|g' \
    | sed 's|\[stageRunId\]|StageRun|g' \
    | sed 's|/| |g' \
  )

  # Capitalize setiap word, join tanpa spasi
  local component=""
  for word in $stripped; do
    # kebab-case → CamelCase
    word=$(echo "$word" | sed 's/-\([a-z]\)/\U\1/g')
    # Capitalize first char
    word="$(tr '[:lower:]' '[:upper:]' <<< ${word:0:1})${word:1}"
    component="${component}${word}"
  done

  # Edge case: root (public)/page.tsx → "Public" → rename ke "Home"
  if [[ "$component" == "Public" ]]; then
    component="Home"
  fi

  echo "${component}Page"
}

for page in "${pages[@]}"; do
  dir=$(dirname "$page")
  component=$(derive_component "$dir")
  mkdir -p "$dir"
  cat > "$page" << TEMPLATE
// TODO: Implementasi di fase berikutnya
export default function ${component}() {
  return null;
}
TEMPLATE
  echo "✓ Created $page → ${component}"
done
