import express, { Request, Response } from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { exec } from "child_process";

const app = express();
const port = 3001;
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // Allow only requests from this origin
  }),
);

// Type definition for our function to search node_modules
const findNodeModules = (folderPath: string): string[] => {
  let foundNodeModules: string[] = [];

  const nodeModulesPath = path.join(folderPath, "node_modules");
  if (
    fs.existsSync(nodeModulesPath) &&
    fs.lstatSync(nodeModulesPath).isDirectory()
  ) {
    foundNodeModules.push(folderPath);
  }

  let entries;
  try {
    entries = fs.readdirSync(folderPath, { withFileTypes: true });
  } catch (err) {
    console.error(`Error accessing ${folderPath}:`, err);
    return foundNodeModules;
  }

  for (const entry of entries) {
    const entryPath = path.join(folderPath, entry.name);
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

// API endpoint to search for node_modules directories
app.get("/api/node-modules", (req: Request, res: Response) => {
  const rootFolder = "/"; // Replace with your home directory path
  const result = findNodeModules(rootFolder);
  res.json(result); // Send the result as JSON
});

// API endpoint to open a folder
app.post("/api/open-folder", (req: Request, res: Response) => {
  const { folderPath } = req.body;

  // Open the folder using system-specific command
  if (process.platform === "darwin") {
    // macOS
    exec(`open "${folderPath}"`, (err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to open folder" });
      }
      res.status(200).json({ message: "Folder opened" });
    });
  } else if (process.platform === "win32") {
    // Windows
    exec(`start "" "${folderPath}"`, (err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to open folder" });
      }
      res.status(200).json({ message: "Folder opened" });
    });
  } else if (process.platform === "linux") {
    // Linux
    exec(`xdg-open "${folderPath}"`, (err) => {
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
