import fs from "node:fs";
import path from "node:path";

const rootFolder: string = "/"; // Root folder of macOS

const findNodeModules = (folderPath: string): string[] => {
  let foundNodeModules: string[] = [];

  // Check if the current folder has a node_modules folder
  const nodeModulesPath = path.join(folderPath, "node_modules");
  if (
    fs.existsSync(nodeModulesPath) &&
    fs.lstatSync(nodeModulesPath).isDirectory()
  ) {
    foundNodeModules.push(folderPath);
  }

  let entries;
  try {
    // Get list of directories in the current folder
    entries = fs.readdirSync(folderPath, { withFileTypes: true });
  } catch (err) {
    console.error(`Error accessing ${folderPath}:`, err);
    return foundNodeModules; // Return what has been found so far, skipping this folder
  }

  // Loop through each entry and recurse if it's a directory
  for (const entry of entries) {
    const entryPath = path.join(folderPath, entry.name);

    // Skip if it's not a directory or it's a system/hidden directory
    if (
      entry.isDirectory() &&
      entry.name !== "node_modules" &&
      !entry.name.startsWith(".")
    ) {
      try {
        foundNodeModules = foundNodeModules.concat(findNodeModules(entryPath));
      } catch (err) {
        console.error(`Error accessing ${entryPath}:`, err);
      }
    }
  }

  return foundNodeModules;
};

// Start search from the root folder
const nodeModulesFolders = findNodeModules(rootFolder);

console.log("Directories containing node_modules:", nodeModulesFolders);
