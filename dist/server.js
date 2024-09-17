"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const rootFolder = "/"; // Root folder of macOS
const findNodeModules = (folderPath) => {
    let foundNodeModules = [];
    // Check if the current folder has a node_modules folder
    const nodeModulesPath = node_path_1.default.join(folderPath, "node_modules");
    if (node_fs_1.default.existsSync(nodeModulesPath) &&
        node_fs_1.default.lstatSync(nodeModulesPath).isDirectory()) {
        foundNodeModules.push(folderPath);
    }
    let entries;
    try {
        // Get list of directories in the current folder
        entries = node_fs_1.default.readdirSync(folderPath, { withFileTypes: true });
    }
    catch (err) {
        console.error(`Error accessing ${folderPath}:`, err);
        return foundNodeModules; // Return what has been found so far, skipping this folder
    }
    // Loop through each entry and recurse if it's a directory
    for (const entry of entries) {
        const entryPath = node_path_1.default.join(folderPath, entry.name);
        // Skip if it's not a directory or it's a system/hidden directory
        if (entry.isDirectory() &&
            entry.name !== "node_modules" &&
            !entry.name.startsWith(".")) {
            try {
                foundNodeModules = foundNodeModules.concat(findNodeModules(entryPath));
            }
            catch (err) {
                console.error(`Error accessing ${entryPath}:`, err);
            }
        }
    }
    return foundNodeModules;
};
// Start search from the root folder
const nodeModulesFolders = findNodeModules(rootFolder);
console.log("Directories containing node_modules:", nodeModulesFolders);
