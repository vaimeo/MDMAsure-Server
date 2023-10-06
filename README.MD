# Device Management Platform - Backend

Welcome to the open source Backend repository. We're excited to have you here and invite you to contribute to the development of this project.

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Configuration](#configuration)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [Code of Conduct](#code-of-conduct)
- [License](#license)

## Introduction

This repository contains the backend code to manage the mobile devices, it's using [Google APIs Node.js Client](https://github.com/googleapis/google-api-nodejs-client/tree/main#google-apis-nodejs-client), a powerful solution for to intract with google APIs. The backend is built using Node.js and provides essential functionality and APIs for the platform's operation.

The motivation behind this project to provide the power to the enterprises to deploy on premises management system.

## Getting Started


### Prerequisites

Before you begin, ensure you have the following prerequisites installed:

- Node.js: [Download](https://nodejs.org/) (v16.5.1) 
- npm (Node Package Manager): [Download](https://www.npmjs.com/get-npm) (v8.11.0)
- bun [Download](https://bun.sh/) 

### Configuration

1. Set up your Google Application Credentials by exporting the JSON key file path:

   ```shell
   export GOOGLE_APPLICATION_CREDENTIALS="/PATH_TO_YOUR_FILE/auth.json"

To get the auth.json file please follow the official google [guidelines](https://github.com/googleapis/google-api-nodejs-client/tree/main#service-account-credentials) 

2. Setup the project configurations

```c
Create a .env file in app folder and define the following parameters
DB_HOST='localhost'
DB_USER='root'
DB_PASSWORD='anypass'
DB_NAME='mdm'
PROJECT_ID="your_google_project_id"
PUBSUB_TOPIC='projects/'$PROJECT_ID'/topics/mdmpubsub'
PROVESION_URL="https://5268-91-72-173-142.ngrok.io/enterprise/callback"
SERVER_PORT=9013
```

3. Create the database in mysql import [this](Database.sql) file.

4. To start the project, run the following command:

```shell 
 bun start
```
# API Reference
We have create the api endpoints to intract with google Android management service you can find the complete documentation [here]().


**Note!** *If you are running this on local machine to test, then you have to expose the service to the public, i will recommend [ngrok](https://ngrok.com/) to make the tunnel, The device provisioning will need to reach the* 

# Code of Conduct

# License
This library is licensed under Apache 2.0. Full license text is available in [LICENSE](MITLICENSE.md).

