# Frontend Web Application

React-based single-page application for the Titanic Survivor Prediction system.

## 🚀 Quick Start (Zero Configuration)

```bash
# From the project root directory
docker compose -f 'compose/compose.dev.yaml' up -d --build

# Access the application
open http://localhost:8080
```

No setup needed! The service starts with hot reload enabled.

## 📋 Features

- **React 19** with TypeScript
- **Tailwind CSS** for responsive styling
- **Mobile-first** design approach
- **JWT Authentication** with persistent sessions
- **Reusable Component Library**
- **Hot Module Replacement** in development
- **Nginx** reverse proxy for API routing

## 🏗️ Application Routes

- `/` - Landing page with marketing content
- `/calculator` - Survival prediction calculator
- `/admin` - Model management console (requires login)
- `/dashboard` - User dashboard with prediction history
- `/signin` & `/signup` - Authentication pages

## 🛠️ Development Workflow


### Testing

```bash
cd app/frontend

# Install dependencies (if not already done)
npm install

# Run tests
npm test

# Check linting
npm run lint

# Check code formatting
npx prettier --check src

# Auto-fix formatting
npm run format
```

### Optional: Local Development

If you need to run locally without Docker:

```bash
cd app/frontend

# Install dependencies
npm install

# Start development server
npm start
# Runs on http://localhost:3000

# Run tests
npm test

# Build for production
npm run build
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/      # UI components
│   │   ├── common/     # Reusable components
│   │   │   ├── Alert.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   └── forms/
│   │   ├── calculator/ # Prediction UI
│   │   ├── admin/      # Admin console
│   │   └── models/     # Model management
│   ├── pages/          # Page components
│   ├── services/       # API integration
│   ├── hooks/          # Custom React hooks
│   └── App.tsx         # Root component
├── public/             # Static assets
├── nginx.conf          # Production config
└── nginx.dev.conf      # Development config
```

## 🎨 Component Library

The application includes a comprehensive set of reusable components:

### Display Components
```tsx
import { Alert, Card, Section, PageHeader } from 'components/common';

// Success alert
<Alert variant="success" title="Success!">
  Your prediction has been saved.
</Alert>

// Content card
<Card className="p-6">
  <h2>Passenger Details</h2>
  {/* content */}
</Card>
```

### Form Components
```tsx
import { Input, Select, Checkbox, Button } from 'components/common/forms';

// Text input with validation
<Input
  id="age"
  label="Age"
  type="number"
  value={age}
  onChange={setAge}
  min={0}
  max={100}
  required
/>

// Action button
<Button variant="primary" onClick={handleSubmit}>
  Predict Survival
</Button>
```

### Complete Component List
- **Display**: Alert, Card, Section, PageHeader, EmptyState, LoadingState
- **Forms**: Input, Select, Checkbox, Button, DropDown
- **Navigation**: Navbar, NavbarHamburger (mobile)
- **Utility**: Layout, ConnectionStatus

## 🧪 Testing Strategy

### Running Tests
```bash
# In Docker (recommended)
docker compose exec frontend-dev npm test

# Watch mode
docker compose exec frontend-dev npm test -- --watchAll

# Coverage report
docker compose exec frontend-dev npm test -- --coverage
```

### Test Structure
- Component snapshots in `__tests__/`
- Integration tests for user flows
- Unit tests for services and utilities

## 🎯 Development Features

### Hot Module Replacement
- Code changes reflect instantly
- State preserved during updates
- CSS updates without refresh

### API Proxy Configuration
- Development: Proxies `/api.*` to backend service
- Production: Nginx handles routing
- No CORS issues in development

### Mobile Development
- Responsive breakpoints: 640px, 768px, 1024px
- Touch-friendly interactions
- Optimized for phone and tablet

## 🐳 Production Build

The production build is automatically created when using:
```bash
docker compose -f compose/compose.prod-local.yaml up
```

This creates an optimized build with:
- Minified JavaScript and CSS
- Tree-shaken dependencies
- Optimized images
- Gzip compression via Nginx

## 🔧 Environment Configuration

The application uses these environment variables (set automatically in Docker):

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Dev server port | `8080` |
| `REACT_APP_API_URL` | Backend URL | Proxy via Nginx |

## 📱 Browser Support

- Chrome >= 119
- Firefox >= 122
- Safari >= 16.1
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## 🎨 Styling Guide

The app uses Tailwind CSS with custom theme:
```css
/* Color palette defined in global.css */
--primary: 210 40% 30%
--secondary: 210 40% 90%
--accent: 210 40% 50%
--background: 245 40% 98%
--foreground: 220 15% 20%
```

## 🔍 Troubleshooting

### Common Issues

**Blank page or components not loading:**
```bash
# Clear Docker volumes and rebuild
docker compose down -v
docker compose up --build
```

**Changes not reflecting:**
```bash
# Restart the frontend service
docker compose restart frontend-dev
```

**Test failures after component changes:**
```bash
# Update snapshots
docker compose exec frontend-dev npm test -- -u
```

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Component Examples](./src/components/common/__tests__)
