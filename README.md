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


### Component Tests

The frontend uses Jest and React Testing Library for unit and integration tests. Tests for reusable components are located in `src/components/common/__tests__/`.

**How to Run Tests:**

To run all tests, use the following command in the `app/frontend` directory:

```bash
npm test
```

This will execute all files matching the `*.test.tsx` pattern within the `src` directory.

**How to Update Snapshots:**

When components are intentionally changed, their corresponding snapshots need to be updated. Run the test command with the `-u` flag:

```bash
npm test -u
```

Review the changes to ensure they are expected before committing the updated snapshots.

**How to Create New Tests:**

1.  Navigate to the appropriate `__tests__` directory for the component you want to test (e.g., `src/components/common/__tests__/` for reusable components).
2.  Create a new file named after your component with the `.test.tsx` extension (e.g., `MyComponent.test.tsx`).
3.  Import the component you want to test and the `render` function from `@testing-library/react`.
4.  Use `describe` to group your test cases for the component.
5.  Use `it` or `test` to define individual test cases.
6.  Inside a test case, render your component using the `render` function, passing any necessary props.
7.  Use `expect(asFragment()).toMatchSnapshot()` to create or update a snapshot of the rendered component.
8.  Add additional assertions using `@testing-library/react` queries (e.g., `getByText`, `getByRole`) to test component behavior and output beyond snapshots if needed.

### Reusable Components Documentation

The frontend includes a set of reusable React components located in `src/components/common/` and `src/components/common/forms/`. These components are designed for consistency and efficiency across the application. Please use these components to help keep the layout uniform across the Frontend. For more detailed documentation for a component, please see the individual .tsx file of that component.

#### Display Components

*   **Alert**

    Displays alert messages with different styles and an optional title.

    *   **Use Cases:** Displaying feedback messages to the user (e.g., success after an operation, error after a failed request, warnings, or general information).

    *   **Props:**
        *   `variant` (`'success' | 'error' | 'warning' | 'info'`, default: `'info'`): The style of the alert.
        *   `title` (`string`, optional): An optional title for the alert.
        *   `children` (`React.ReactNode`): The main message content of the alert.
        *   `className` (`string`, optional): Additional CSS classes.

*   **Card**

    A simple container component with padding, shadow, and rounded corners, useful for grouping content visually.

    *   **Use Cases:** Grouping related content on a page, creating distinct sections within a layout, or displaying information in a visually separated block.

    *   **Props:**
        *   `children` (`React.ReactNode`, optional): Content inside the card.
        *   `className` (`string`, optional): Additional CSS classes to override default styling.

*   **EmptyState**

    Displays a message centered in a styled container, typically used when there is no data to display.

    *   **Use Cases:** Informing the user when a list or section is empty, providing guidance on how to populate content, or indicating that a search yielded no results.

    *   **Props:**
        *   `message` (`string`): The message to display.

*   **LoadingState**

    Displays a message centered in a styled container, typically used while content is loading.

    *   **Use Cases:** Indicating to the user that data is being fetched, a process is running, or content is being prepared for display.

    *   **Props:**
        *   `message` (`string`): The message to display (e.g., "Loading...").

*   **PageHeader**

    Displays a consistent page title and description.

    *   **Use Cases:** Providing a clear heading and brief context at the top of pages or major sections within a page.

    *   **Props:**
        *   `title` (`string`): The main title of the page or section.
        *   `description` (`string`): A brief description.

*   **Section**

    A wrapper for content sections with consistent padding and max-width, using a native HTML `<section>` tag.

    *   **Use Cases:** Structuring the main content areas of a page, applying consistent spacing and layout to different sections, and providing semantic HTML for accessibility and SEO.

    *   **Props:**
        *   `children` (`React.ReactNode`, optional): Content inside the section.
        *   `className` (`string`, optional): Additional CSS classes to override default styling.
        *   Accepts standard HTML `div` attributes like `id`.

#### Form Components

*   **Button**

    A versatile button component with different variants, sizes, and states. Accepts all standard HTML button attributes.

    *   **Use Cases:** Initiating actions (e.g., submitting forms, saving data, triggering events), navigation (when styled as a link), and providing interactive elements for user input.

    *   **Props:**
        *   `variant` (`'primary' | 'secondary' | 'danger' | 'link'`, default: `'primary'`): The style of the button.
        *   `size` (`'sm' | 'md' | 'lg'`, default: `'md'`): The size of the button.
        *   `fullWidth` (`boolean`, default: `false`): If true, the button takes the full width.
        *   `children` (`React.ReactNode`): The content inside the button.
        *   `className` (`string`, optional): Additional CSS classes to override default styling.
        *   Accepts all standard HTML `button` attributes (e.g., `onClick`, `disabled`, `type`).

*   **Checkbox**

    A styled checkbox input with a label and optional description.

    *   **Use Cases:** Allowing users to select binary options (e.g., agreeing to terms, enabling a feature), indicating a state that can be toggled on or off.

    *   **Props:**
        *   `label` (`string`): The text label.
        *   `id` (`string`): Unique ID for the input and label.
        *   `checked` (`boolean`): Current checked state.
        *   `onChange` (`(checked: boolean) => void`): Callback for state changes.
        *   `disabled` (`boolean`, default: `false`): If true, the checkbox is disabled.
        *   `description` (`string`, optional): Optional text below the label.

*   **DropDown**

    A custom dropdown component with a button trigger and a panel for options.

    *   **Use Cases:** Presenting a list of options for the user to select from when a native select input is not desired, or when more complex content needs to be displayed in the options list.

    *   **Props:**
        *   `label` (`string`): Label above the trigger.
        *   `children` (`React.ReactNode`): Options to display (e.g., `<button>` elements).
        *   `id` (`string`): Unique ID for the trigger button.
        *   `value` (`string`): The currently selected value.
        *   `onSelect` (`(value: string) => void`): Callback when an option is selected.
        *   `disabled` (`boolean`, default: `false`): If true, the dropdown is disabled.
        *   `description` (`string`, optional): Optional text below the label.

*   **Input**

    A styled text, number, password, or email input with a label and optional description.

    *   **Use Cases:** Collecting various types of text-based or numerical user input in forms (e.g., names, ages, passwords, email addresses).

    *   **Props:**
        *   `label` (`string`): Label above the input.
        *   `id` (`string`): Unique ID for the input and label.
        *   `type` (`'text' | 'number' | 'password' | 'email'`, default: `'text'`): Input type.
        *   `value` (`string | number`): Current input value.
        *   `onChange` (`(value: string) => void`): Callback for value changes.
        *   `disabled` (`boolean`, default: `false`): If true, the input is disabled.
        *   `min` (`number`, optional): Minimum value (for `type='number'`).
        *   `max` (`number`, optional): Maximum value (for `type='number'`).
        *   `placeholder` (`string`, optional): Placeholder text.
        *   `required` (`boolean`, default: `false`): If true, the input is required.
        *   `description` (`string`, optional): Optional text below the input.

*   **Select**

    A styled wrapper around the native HTML `<select>` element with a label.

    *   **Use Cases:** Allowing users to select a single option from a predefined list of choices in a standard dropdown format.

    *   **Props:**
        *   `label` (`string`): Label above the select.
        *   `id` (`string`): Unique ID for the select and label.
        *   `options` (`SelectOption[]`): Array of `{ value: string | number, label: string }` objects.
        *   `value` (`string | number`): Current selected value.
        *   `onChange` (`(value: string) => void`): Callback for selection changes.
        *   `required` (`boolean`, default: `false`): If true, the select is required.
        *   `placeholder` (`string`, optional): Optional placeholder option.
        *   `disabled` (`boolean`, default: `false`): If true, the select is disabled.
        *   `className` (`string`, optional): Additional CSS classes to override default styling.
        *   Accepts standard HTML `select` attributes except `onChange`.

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
