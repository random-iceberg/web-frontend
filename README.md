# Frontend Service for Titanic Survivor Prediction Application 

This React and TypeScript Single Page Application (SPA) provides the user interface for the Titanic Survivor Prediction Application. It is designed to be responsive, robust, and production-ready with zero manual configuration required.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Documentation](#documentation)

## Overview

The frontend service offers:
- An interactive landing page showcasing both the survival prediction tool and AI course advertisements.
- Real-time updates for prediction outcomes.
- Secure communication with the backend API for authentication and prediction requests.
- A fully responsive design ensuring optimal performance across devices.

## Features

- **Dynamic User Interface**: Provides an intuitive and interactive experience.
- **Responsive Design**: Optimized for desktop and mobile devices.
- **Seamless API Integration**: Communicates effectively with the backend.
- **Production-Ready**: Pre-configured for containerized deployment with Docker Compose.
- **Zero Manual Configuration**: All settings are integrated out-of-the-box.

## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://your.git.repo/app/frontend.git
   cd app/frontend
   ```

2. **Install Dependencies:**

   Using npm:
   ```bash
   npm install
   ```

   Or using yarn:
   ```bash
   yarn install
   ```

## Development

- **Run Locally with Hot Reload:**
  ```bash
  npm start
  ```
  The development server will be available at [http://localhost:3000](http://localhost:3000).

- **Code Quality Tools:**
  - Run `npm run lint` to check code quality.
  - Run `npm run format` to apply Prettier formatting consistently.

## Testing

Run tests using:
```bash
npm test
```
Ensure that unit and integration tests are updated as you develop new features.

## Deployment

Build the production-ready version with:
```bash
npm run build
```

Then deploy the full service stack using Docker Compose:
```bash
docker-compose up --build -d
```

## Troubleshooting

- **Common Issues:**
  - Check the browser’s console for JavaScript errors.
  - Confirm that the backend API is accessible.
  - Review Docker logs if the application fails to load:
    ```bash
    docker-compose logs frontend
    ```
  - Verify container statuses with:
    ```bash
    docker-compose ps
    ```

## Documentation

For detailed API integration, component structure, and further architectural insights, please refer to the project documentation available in the [docs submodule](https://mygit.th-deg.de/schober-teaching/student-projects/ain-23-software-engineering/ss-25/Random_Iceberg/docker-compose/-/wikis/home).
