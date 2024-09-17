"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 3001;
app.use((0, cors_1.default)({
    origin: "http://localhost:3000", // Allow only requests from this origin
}));
// Type definition for our function to search node_modules
const findNodeModules = (folderPath) => {
    let foundNodeModules = [];
    const nodeModulesPath = path_1.default.join(folderPath, "node_modules");
    if (fs_1.default.existsSync(nodeModulesPath) &&
        fs_1.default.lstatSync(nodeModulesPath).isDirectory()) {
        foundNodeModules.push(folderPath);
    }
    let entries;
    try {
        entries = fs_1.default.readdirSync(folderPath, { withFileTypes: true });
    }
    catch (err) {
        console.error(`Error accessing ${folderPath}:`, err);
        return foundNodeModules;
    }
    for (const entry of entries) {
        const entryPath = path_1.default.join(folderPath, entry.name);
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
// API endpoint to search for node_modules directories
app.get("/api/node-modules", (req, res) => {
    const rootFolder = "/"; // Replace with your home directory path
    const result = findNodeModules(rootFolder);
    res.json(result); // Send the result as JSON
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
