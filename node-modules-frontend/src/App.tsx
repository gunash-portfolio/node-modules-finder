import React, { useState, useEffect } from "react";

const App: React.FC = () => {
  const [nodeModulesFolders, setNodeModulesFolders] = useState<string[]>([]);

  useEffect(() => {
    // Fetch the node_modules directories from the backend
    fetch("http://localhost:3001/api/node-modules")
      .then((response) => response.json())
      .then((data) => setNodeModulesFolders(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="App">
      <h1>Directories containing node_modules</h1>
      <ul>
        {nodeModulesFolders.length > 0 ? (
          nodeModulesFolders.map((folder, index) => (
            <li key={index}>{folder}</li>
          ))
        ) : (
          <li>No node_modules directories found.</li>
        )}
      </ul>
    </div>
  );
};

export default App;
