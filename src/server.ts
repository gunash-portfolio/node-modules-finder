import fs from "node:fs";
import path from "node:path";

const folderPath: string = "/Users/gunashfarzaliyev"; // Replace with your folder path

const hasNodeModules = (folderName: string): boolean => {
  const fullPath = path.join(folderName, "node_modules");
  return fs.existsSync(fullPath) && fs.lstatSync(fullPath).isDirectory();
};

// Check if the specified folder contains a node_modules directory
const nodeModulesFolders = fs
  .readdirSync(folderPath)
  .map((folderName: string) => {
    return path.join(folderPath, folderName); // Get full path
  })
  .filter(hasNodeModules); // Filter folders with node_modules

console.log("Directories containing node_modules:", nodeModulesFolders);
