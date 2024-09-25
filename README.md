# **Node Modules Finder**

The Node Modules Finder application is a simple tool designed to help users manage and open folders containing `node_modules`. It consists of a frontend built with React and a backend powered by Express.js. This document provides an overview of both components, including installation instructions, features, and API details.

## **Table of Contents**
- [Overview](#overview)
- [Frontend](#frontend)
  - [Features](#frontend-features)
  - [Installation](#frontend-installation)
  - [Usage](#frontend-usage)
- [Backend](#backend)
  - [Features](#backend-features)
  - [Installation](#backend-installation)
  - [API Endpoints](#backend-api-endpoints)
- [Importand](#important)
- [Future Enhancements: Elevating Functionality](#future-enhancements-elevating-functionality)
- [Acknowledgements](#acknowledgements)
- [License](#license)


## **Overview**
The Node Modules Finder application consists of two main components: the frontend, which provides the user interface, and the backend, which handles API requests for folder management.

---

## **Frontend**
The frontend is built using React and provides a clean and intuitive interface for users to view and open folders.

### Frontend Features

- Displays a list of folders containing `node_modules`.
- Allows users to open selected folders with a single click.
- Provides error handling and feedback messages.

### Frontend Installation

To set up the frontend locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/gunash-portfolio/node-modules-finder
   cd node-modules-finder/node-modules-frontend
   ```

2. **Install dependencies:**

      ```bash
      npm install
      ```
3. **Run the application:**

      ```bash
      npm start
      ```
### Frontend Usage

- Once the application is running, it will automatically fetch and display a list of folder paths containing `node_modules`.

---
## **Backend**
The backend is built using Express.js and provides the necessary API endpoints for the frontend to communicate with.

### Backend Features
- **Search for `node_modules` directories**: Recursively searches the filesystem for directories named `node_modules`.
- **Open folders**: Allows users to open specific folders based on their paths.
### Backend Installation
To set up the backend locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/gunash-portfolio/node-modules-finder
   cd node-modules-finder/src
   ```

2. **Install dependencies:**

      ```bash
      npm install
      ```
3. **Compile dependencies:**

      ```bash
      npx tsc
      ```
4. **Run the server:**
      ```bash
      node dist/server.js
      ```

  The server will start on `http://localhost:3001`.
### Backend API Endpoints
1.**Get Node Modules**
  - **Endpoint**: `GET /api/node-modules `
  - **Description**: Recursively searches for directories named `node_modules ` starting from the root directory (or a specified directory).
  - **Response**: A JSON array of folder paths containing `node_modules `.
  ```json
  [
    "/path/to/folder1",
    "/path/to/folder2"
  ]
  ```
2.**Open Folder**
  - **Endpoint**: `POST /api/open-folder `
  - **Description**: Opens a specified folder based on the provided path.
  - **Requested Body**:
  ```json
  {
    "folderPath": "/path/to/folder"
  }
  ```
  - **Response:**
    - **Success:** Returns a JSON object with a success message.
      ```json
      {
      "message": "Folder opened"
      }
      ```
    - **Error:** Returns a JSON object with a error message if the folder could not be opened.
      ```json
      {
       "error": "Failed to open folder"
      }
      ```
## **Important**
- First you must install compile and run backend side:
- Second you must install and run frontend side and open `http://localhost:3000` in your browser:


    ---
## **Future Enhancements: Elevating Functionality**
To further enhance the capabilities of the Node Modules Finder application,
the following features could be considered for future development:
- **User Authentication:**: Implement user authentication to restrict access to folder opening functionality based on user roles or permissions.
- **Folder Navigation Interface:**: Create a user-friendly interface that allows users to navigate the filesystem visually, selecting folders to open without needing to remember paths.
- **Search Functionality:**: Add a search feature that allows users to quickly find specific folders or files within the `node_modules` directories.
- **Favorites and History:**: Implement a system for users to mark certain folders as favorites and maintain a history of recently opened folders for quick access.
- **File Management Features:**: Extend functionality to allow users to perform file management tasks such as copying, moving, or deleting files directly from the interface.
- **Error Handling Improvements:**: Enhance error handling to provide more informative feedback to users when folder opening fails, including potential causes and troubleshooting steps.
- **Mobile Compatibility**: Optimize the application for mobile devices, enabling users to access folder management features on the go.
- **Configuration Options:**: Allow users to customize the root search path and other settings to tailor the application to their specific needs.


## Acknowledgements
- Inspired by the need to manage folder structures in a Node.js environment.
- Thanks to the Node.js, Express, and React communities for their resources and documentation.




## **License**
This project is licensed under the MIT License. [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
