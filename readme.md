# Image Processing with Sharp and TypeScript Server

This repository contains a TypeScript server that utilizes the [Sharp](https://github.com/lovell/sharp) library for efficient image processing. The server is built using [Express](https://expressjs.com/) and is equipped with testing using [Jasmine](https://jasmine.github.io/) and [Supertest](https://github.com/visionmedia/supertest). Additionally, it includes linting with ESLint and code formatting with Prettier.

## Prerequisites

Before you can run this server, ensure you have the following prerequisites installed:

- Node.js: Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).

## Getting Started

1. Clone this repository to your local machine:
```
$ git clone <repository-url>
```
2. Install module for project
```
$ npm install
```
3. Start project
```
$ npm start
```
### Usage
The server will listen on port 3000:

### Scripts
- Install: ```npm install```
- Build: ```npm run build```
- Lint: ```npm run lint```
- Prettify: ```npm run prettify```
- Run unit tests: ```npm run test```
- Start server: ```npm run start```

#### API Endpoint
http://localhost:3000/api/images 
You need to provide filename,width and height to check this API.
Example: http://localhost:3000/api/images?filename=fjord&width=600&height=500

### Notes
- Images are served from `assets/images`. 
- Image thumbs will be stored in `assets/thumbnails`