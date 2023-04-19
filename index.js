/*
 * Attempts to download Github Action artifact files.
 *
 * Inspiration from https://github.com/xSAVIKx/artifact-exists-action
 */

const core = require('@actions/core');
const artifact = require('@actions/artifact');
const fs = require('fs');

async function run() {
  try {
    const name = core.getInput("name", { required: true });
    const tempArtifactPath = fs.mkdtempSync("") + `/${name}`;
    const artifactClient = artifact.create();
    core.info(
      `Starting download for ${name}. Files will be stored at ${tempArtifactPath} if exists.`
    );
    const downloadOptions = {
      createArtifactFolder: false,
    };
    try {
      const downloadResponse = await artifactClient.downloadArtifact(
        name,
        tempArtifactPath,
        downloadOptions
      );
      core.info(`Artifact ${downloadResponse.artifactName} exists.`);
      core.setOutput("exists", true);
      core.setOutput("path", tempArtifactPath);
    } catch (err) {
      core.info(`Artifact ${name} does not exist.`);
      core.setOutput("exists", false);
    }
  } catch (err) {
    core.setFailed(err.message);
  }
}

run();
