# Frontend Service for Titanic Survivor Prediction Application

The frontend is a React and TypeScript Single Page Application (SPA) that powers the user interface for the Titanic Survivor Prediction Application. Designed to be responsive, robust, and intuitive, this service delivers a seamless user experience across all devices. All necessary configurations are pre-integrated, negating the need for manual environment setups.

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

This frontend service provides:
- An interactive landing page introducing both the survival prediction tool and AI course advertisements.
- Real-time user interface updates for survival prediction outcomes.
- Secure communication with the backend API for authentication and predictions.
- A responsive design that ensures optimal performance on desktop and mobile devices.

The SPA is architected following modern React best practices and is fully production-ready using the latest TypeScript standards.

## Features

- **Dynamic User Interface:**  
  Provides real-time updates and interactive elements for a smooth user experience.
- **Responsive Design:**  
  Fully compatible with desktop and mobile devices without additional configuration.
- **Seamless API Integration:**  
  Communicates directly with the backend for authenticated survival predictions and administrative actions.
- **Production-Ready Build:**  
  Optimized for performance and scalability, including a robust Docker integration for streamlined deployment.
- **Zero Manual Configuration:**  
  All settings are pre-configured to work in a containerized environment.

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
   
   or using yarn:
   
   ```bash
   yarn install
   ```

## Development

- **Run Locally with Hot Reload:**  
  Start the development server to see changes in real-time:
  
  ```bash
  npm start
  ```
  
  The development server will be available at [http://localhost:3000](http://localhost:3000).

- **Code Quality Tools:**  
  - **Linting:** Execute `npm run lint` to check code quality.
  - **Formatting:** Run `npm run format` to apply Prettier formatting consistently.

## Testing

- **Unit and Integration Tests:**  
  Run tests using:
  
  ```bash
  npm test
  ```

## Deployment

The frontend is designed to be deployed seamlessly alongside other services using Docker Compose.

- **Production Build and Docker Deployment:**  
  Build the production-ready version with:
  
  ```bash
  npm run build
  ```
  
  Then, deploy within the full orchestration by issuing:
  
  ```bash
  docker-compose up --build -d
  ```
  
  This single command deploys the complete multi-service application including frontend, backend, model service, and Supabase without requiring manual intervention.

## Troubleshooting

- **Common Issues:**
  - Check the browser's console for any JavaScript errors.
  - Verify that the backend API is accessible and running at the predefined endpoint.
  - Examine the Docker logs for the frontend container if the application does not load as expected:
    
    ```bash
    docker-compose logs frontend
    ```
    
  - Use `docker-compose ps` to verify that all containers are up and running.

## Documentation

For detailed information on API integration, component structure, and further architectural insights, refer to the project documentation available in the `/docs` submodule. Documentation aligns with the overall Project Charter and agile development cycles.

---

*This frontend service is part of a comprehensive system designed to offer an intuitive, high-performing, and scalable solution for the Titanic Survivor Prediction Application, adhering strictly to production-ready standards and agile methodologies.*
