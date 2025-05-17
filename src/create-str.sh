#!/bin/bash
## chmod +x fileName.sh
## ./generate-structure.sh
##
# Directories to create
dirs=(
  "assets/files"
  "assets/fonts"
  "assets/images"
  "assets/styles"
  "assets/theme"
  
  "config"
  "constants"
  "domain/types"
  "domain/enums"

  "features/feature-one/api"
  "features/feature-one/components"
  "features/feature-one/hooks"
  "features/feature-one/services"
  "features/feature-one/types"
  "features/feature-one/utils"
  "features/feature-one/__tests__"

  "hooks"

  "i18n"
  "locales/ar"
  "locales/en"

  "mock"
  "navigation"
  "providers"

  "redux/slices"
  "redux/store"

  "services"

  "shared/components/ui"
  "shared/components/layout"
  "shared/components/feedback"
  "shared/HOC"
  "shared/pipes"
  "shared/lib"

  "test"
)

echo "🚀 Generating project structure..."

# Loop through and create directories
for dir in "${dirs[@]}"; do
  mkdir -p "$dir"
  echo "📁 Created: $dir"
done

echo "✅ Structure created successfully!"
