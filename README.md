# extract-changelog

Extracts the section for the current version out of the changelog.

Example workflow to automate creating a release on GitHub:

```yaml
name: release

on:
  push:
    tags:
      - "v*"

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - uses: frangio/extract-changelog@v1
        id: changelog
      - name: Release
        uses: softprops/action-gh-release@v1
        with:
          body_path: ${{ steps.changelog.outputs.file }}
```
