<!-- Moved from `app/frontend/README.md` -->

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
