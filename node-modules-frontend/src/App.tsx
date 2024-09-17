import React, { useState, useEffect } from "react";

const App: React.FC = () => {
  const [nodeModulesFolders, setNodeModulesFolders] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the node_modules directories from the backend
    fetch("http://localhost:3001/api/node-modules")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setNodeModulesFolders(data))
      .catch((error) => setError(error.message));
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => alert("Path copied to clipboard!"))
      .catch((err) => console.error("Failed to copy: ", err));
  };

  return (
    <div className="App">
      <h1>Directories containing node_modules</h1>
      {error && <p>Error: {error}</p>}
      <ul>
        {nodeModulesFolders.length > 0 ? (
          nodeModulesFolders.map((folder, index) => (
            <li key={index}>
              <button onClick={() => copyToClipboard(folder)}>{folder}</button>
            </li>
          ))
        ) : (
          <li>No node_modules directories found.</li>
        )}
      </ul>
    </div>
  );
};

export default App;
