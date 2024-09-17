# HTTPS Server in TypeScript

This project is a simple HTTPS server built using Node.js and TypeScript. It demonstrates how to set up an HTTPS server with SSL certificates in a TypeScript project.

## Table of Contents
- [Clone the repository](#clone-the-repository)
- [Install dependencies](#install-dependencies)
- [Generate self-signed SSL certificate](#generate-self-signed-ssl-certificate)
- [Compile the TypeScript code](#compile-the-typeScript-code)
- [Start the server](#start-the-server)


## Features
- Serves content over HTTPS using self-signed SSL certificates.
- Written in TypeScript for better type safety and developer experience.

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v12 or higher)
- [OpenSSL](https://www.openssl.org/) (for generating self-signed certificates)

## Project Structure

```bash
/my-https-server
  /src
    server.ts          # HTTPS server source code
  /cert
    cert.pem           # Self-signed certificate
    key.pem            # Private key
  /dist
    (compiled JavaScript files will go here after building)
  tsconfig.json        # TypeScript configuration
  package.json         # Node.js dependencies and scripts

```


# Getting Started

## 1. Clone the repository
```bash
git clone https://github.com/yourusername/my-https-server.git
cd my-https-server
```

## 2. Install dependencies
```bash
npm install
```
## 3. Generate self-signed SSL certificate
To run the HTTPS server, you will need to generate a self-signed SSL certificate. You can do this using OpenSSL:
```bash
mkdir cert
openssl req -nodes -new -x509 -keyout cert/key.pem -out cert/cert.pem
```
- When prompted, fill in the certificate details (for development purposes, you can leave these fields as default).

## 4. Compile the TypeScript code
```bash
npx tsc
```
This will compile the TypeScript code into JavaScript and output it in the dist directory.

## 5. Start the server
```bash
node dist/server.js
```
