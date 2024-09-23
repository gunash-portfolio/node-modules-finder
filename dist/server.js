"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const app = (0, express_1.default)();
const port = 3001;
app.use(express_1.default.json());
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
// API endpoint to open a folder
app.post("/api/open-folder", (req, res) => {
    const { folderPath } = req.body;
    // Open the folder using system-specific command
    if (process.platform === "darwin") {
        // macOS
        (0, child_process_1.exec)(`open "${folderPath}"`, (err) => {
            if (err) {
                return res.status(500).json({ error: "Failed to open folder" });
            }
            res.status(200).json({ message: "Folder opened" });
        });
    }
    else if (process.platform === "win32") {
        // Windows
        (0, child_process_1.exec)(`start "" "${folderPath}"`, (err) => {
            if (err) {
                return res.status(500).json({ error: "Failed to open folder" });
            }
            res.status(200).json({ message: "Folder opened" });
        });
    }
    else if (process.platform === "linux") {
        // Linux
        (0, child_process_1.exec)(`xdg-open "${folderPath}"`, (err) => {
            if (err) {
                return res.status(500).json({ error: "Failed to open folder" });
            }
            res.status(200).json({ message: "Folder opened" });
        });
    }
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
