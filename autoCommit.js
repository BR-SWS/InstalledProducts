const { exec } = require("child_process");
const chokidar = require("chokidar");
const path = require("path");

const repoPath = path.resolve(__dirname); // Current folder

// Initialize file watcher
const watcher = chokidar.watch(repoPath, {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true,
  ignoreInitial: true,
});

function runGitCommands() {
  const commitMsg = `Auto commit on ${new Date().toISOString()}`;
  exec(
    `git add . && git commit -m "${commitMsg}" && git push origin main`,
    { cwd: repoPath },
    (err, stdout, stderr) => {
      if (err) {
        console.error("Error:", stderr);
      } else {
        console.log("Changes pushed:", commitMsg);
      }
    }
  );
}

watcher.on("change", (filePath) => {
  console.log(`File changed: ${filePath}`);
  runGitCommands();
});
