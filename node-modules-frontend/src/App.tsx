import React, { useState, useEffect } from "react";
import "./styles.css"; // Import the CSS file

interface OpenFolderButtonProps {
  folderPath: string;
}

const OpenFolderButton: React.FC<OpenFolderButtonProps> = ({ folderPath }) => {
  const openFolder = async (): Promise<void> => {
    try {
      const response = await fetch("http://localhost:3001/api/open-folder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ folderPath }),
      });

      if (!response.ok) {
        throw new Error("Failed to open folder");
      }

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error opening folder:", error);
    }
  };

  return (
    <button className="folder-button" onClick={openFolder}>
      Open {folderPath}
    </button>
  );
};

const App: React.FC = () => {
  const [nodeModulesFolders, setNodeModulesFolders] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNodeModules = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/node-modules");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setNodeModulesFolders(data);
      } catch (error: any) {
        setError(error.message);
      }
    };
    fetchNodeModules();
  }, []);

  return (
    <div className="container">
      <h1>Folder Opener</h1>
      {error && <p className="error-message">{error}</p>}
      {/* Render buttons for the fetched node modules folders */}
      {nodeModulesFolders.length > 0 ? (
        nodeModulesFolders.map((folder, index) => (
          <OpenFolderButton key={index} folderPath={folder} />
        ))
      ) : (
        <p className="no-folders">No folders found.</p>
      )}
    </div>
  );
};

export default App;
