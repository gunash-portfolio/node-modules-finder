"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const folderPath = "/"; // Replace with your folder path
const hasNodeModules = (folderName) => {
    const fullPath = node_path_1.default.join(folderName, "node_modules");
    return node_fs_1.default.existsSync(fullPath) && node_fs_1.default.lstatSync(fullPath).isDirectory();
};
// Check if the specified folder contains a node_modules directory
const nodeModulesFolders = node_fs_1.default
    .readdirSync(folderPath)
    .map((folderName) => {
    return node_path_1.default.join(folderPath, folderName); // Get full path
})
    .filter(hasNodeModules); // Filter folders with node_modules
console.log("Directories containing node_modules:", nodeModulesFolders);
