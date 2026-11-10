#!/usr/bin/env bash
set -euo pipefail
# Start the Zensical dev server for local preview.
# Automatically locates the docs root (the directory containing zensical.toml)
# by walking up from the current directory, falling back to the repo root.
# Usage: ./_local-scripts/start-zensical.sh [-- <extra zensical serve args>]

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# Find the docs root: nearest directory containing zensical.toml,
# searching upward from the current directory.
find_docs_root() {
	local dir="$1"
	while [ "$dir" != "/" ]; do
		if [ -f "$dir/zensical.toml" ]; then
			echo "$dir"
			return 0
		fi
		dir="$(dirname "$dir")"
	done
	return 1
}

DOCS_ROOT="$(find_docs_root "$PWD" || find_docs_root "$REPO_ROOT" || true)"
if [ -z "$DOCS_ROOT" ]; then
	echo "Could not find zensical.toml in any parent directory of:" >&2
	echo "  - $PWD" >&2
	echo "  - $REPO_ROOT" >&2
	exit 1
fi
cd "$DOCS_ROOT"
echo "Docs root: $DOCS_ROOT"

# Choose how to invoke zensical: prefer uv (project-managed deps),
# fall back to a zensical binary already on PATH.
if command -v uv >/dev/null 2>&1 && [ -f "pyproject.toml" ]; then
	echo "Ensuring dependencies are synced via uv..."
	uv sync --quiet
	CMD=(uv run zensical)
elif command -v zensical >/dev/null 2>&1; then
	CMD=(zensical)
else
	echo "Neither uv nor zensical found. Install uv (https://docs.astral.sh/uv/) or zensical and retry." >&2
	exit 1
fi

echo "Starting zensical serve..."
exec "${CMD[@]}" serve --config-file "$DOCS_ROOT/zensical.toml" "$@"
