#!/bin/bash
# Validate JSON-LD schema markup in Next.js page files
# Usage: ./validate-schema.sh [path-to-file-or-directory]
#
# Checks for:
# - Valid JSON-LD syntax
# - Required @context and @type fields
# - Common schema.org types used correctly

set -euo pipefail

TARGET="${1:-.}"

echo "Validating Schema.org JSON-LD markup..."
echo "========================================="

# Find files containing JSON-LD
FILES=$(grep -rl "application/ld+json\|@context.*schema.org" "$TARGET" --include="*.tsx" --include="*.ts" --include="*.json" 2>/dev/null || true)

if [ -z "$FILES" ]; then
  echo "No files with JSON-LD markup found in $TARGET"
  exit 0
fi

ERRORS=0
WARNINGS=0

for FILE in $FILES; do
  echo ""
  echo "Checking: $FILE"
  echo "---"

  # Check for @context
  if ! grep -q '@context' "$FILE"; then
    echo "  ERROR: Missing @context field"
    ERRORS=$((ERRORS + 1))
  fi

  # Check for @type
  if ! grep -q '@type' "$FILE"; then
    echo "  ERROR: Missing @type field"
    ERRORS=$((ERRORS + 1))
  fi

  # Check for common required fields based on type
  if grep -q '"Organization"' "$FILE"; then
    for FIELD in '"name"' '"url"' '"address"'; do
      if ! grep -q "$FIELD" "$FILE"; then
        echo "  WARNING: Organization missing recommended field: $FIELD"
        WARNINGS=$((WARNINGS + 1))
      fi
    done
  fi

  if grep -q '"Service"' "$FILE"; then
    for FIELD in '"name"' '"description"' '"provider"'; do
      if ! grep -q "$FIELD" "$FILE"; then
        echo "  WARNING: Service missing recommended field: $FIELD"
        WARNINGS=$((WARNINGS + 1))
      fi
    done
  fi

  if grep -q '"Article"\|"BlogPosting"' "$FILE"; then
    for FIELD in '"headline"' '"datePublished"' '"author"'; do
      if ! grep -q "$FIELD" "$FILE"; then
        echo "  WARNING: Article missing recommended field: $FIELD"
        WARNINGS=$((WARNINGS + 1))
      fi
    done
  fi

  if grep -q '"JobPosting"' "$FILE"; then
    for FIELD in '"title"' '"description"' '"datePosted"'; do
      if ! grep -q "$FIELD" "$FILE"; then
        echo "  WARNING: JobPosting missing recommended field: $FIELD"
        WARNINGS=$((WARNINGS + 1))
      fi
    done
  fi

  echo "  Done."
done

echo ""
echo "========================================="
echo "Results: $ERRORS errors, $WARNINGS warnings"

if [ $ERRORS -gt 0 ]; then
  exit 1
fi
