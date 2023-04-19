# Download Artifact Action

This action downloads a Github Actions artifact and fails gracefully if it doesn't exist.

## Inputs

### `name`

**Required** Name of the artifact.

## Outputs

### `exists`

Boolean value indicating whether the artifact exists and was downloaded.

### `path`

File path to the downloaded artifact files.

## Example usage

```yaml
uses: Davepar/download-artifact-action@v1.0
with:
  name: 'replace-with-artifact-name'
```
