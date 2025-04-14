# Frontend Web for Titanic Survivor Prediction Application

## Overview

The Frontend Web is a React-based Single Page Application (SPA) built using TypeScript and styled with Tailwind CSS. It delivers an interactive, responsive user interface for the Titanic Survival Prediction Application. Optimized for both development and production, the service seamlessly integrates with the backend web API and adheres to modern best practices for scalable, containerized deployments.

## Features

- **Dynamic and Responsive UI:**  
  Provides a modern, interactive experience with real-time updates.
- **Production-Ready Build:**  
  Uses a multi-stage Dockerfile to build and serve the app efficiently with Nginx.
- **Modern Development Stack:**  
  Developed with React, TypeScript, and Tailwind CSS.
- **Component-Driven Structure:**  
  Emphasizes reusability and maintainability with clear separation of concerns.
- **Automated Testing:**  
  Integrated unit and integration tests using Jest and React Testing Library.

## Project Structure

```plaintext
app/frontend/
├── Dockerfile              # Multi-stage Dockerfile for building and serving the app
├── package.json            # Node.js dependencies and build/test scripts
├── README.md               # Frontend Web documentation (this file)
├── public/                 # Static assets and HTML templates
├── src/                   # Main application source code
│   ├── components/         # Reusable React components
│   ├── assets/             # Images, fonts, and icons
│   ├── services/           # API integration and utility modules
│   ├── App.tsx             # Root React component
│   └── index.tsx           # Application entry point
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
└── tests/                 # Unit and integration tests
```

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm or yarn
- Docker & Docker Compose (for containerized deployment)

### Setup Instructions

Follow these steps to set up your development environment:

1. **Clone the Repository (with Submodules)**  
   Clone the repository together with all its submodules:
   ```bash
   git clone --recurse-submodules https://mygit.th-deg.de/schober-teaching/student-projects/ain-23-software-engineering/ss-25/Random_Iceberg/web-backend.git
   ```

2. **Enter the Project Directory**  
   Change directory into the Docker Compose folder:
   ```bash
   cd docker-compose
   ```

3. **Checkout the Development Branch**  
   Create and switch to a local branch named `dev` that tracks the remote development branch:
   ```bash
   git checkout -b dev origin/dev
   ```

4. **Update All Submodules**  
   Initialize and update every submodule recursively:
   ```bash
   git submodule update --init --recursive
   ```

5. **Install Frontend Dependencies**  
   (From the appropriate directory, e.g., `app/frontend`) install the Node.js packages:
   ```bash
   npm install
   ```

6. **Start the Development Server**  
   Run the frontend development server:
   ```bash
   npm start
   ```
   Once the server starts, access the application at [http://localhost:3000](http://localhost:3000).

## Development & Testing

- **Hot Reloading:**  
  The development server supports hot reloading for rapid UI iterations.
- **Linting and Formatting:**  
  Use provided npm scripts (e.g., `npm run lint`, `npm run format`) to enforce code quality.
- **Testing:**  
  Run tests with:
  ```bash
  npm test
  ```

## Production Build & Deployment

1. **Build the Production Bundle:**
   ```bash
   npm run build
   ```
2. **Deploy with Docker Compose:**  
   The production build is served via a multi-stage Dockerfile using Nginx:
   ```bash
   docker-compose up --build -d
   ```

## Troubleshooting

- **Browser Console:**  
  Check the browser console for any UI errors.
- **Docker Logs:**
  ```bash
  docker-compose logs frontend
  ```
- **Container Status:**
  ```bash
  docker-compose ps
  ```

## Documentation & References

For further details on UI components, API integration, and architectural guidelines, please consult the [Project Charter](#) and the additional documentation within the `docs/` submodule.

---

Created and maintained by **team/random_iceberg**.
