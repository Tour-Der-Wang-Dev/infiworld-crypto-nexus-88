
# InfiWorld Project Files Explainer

This document provides an overview of all files in the InfiWorld Crypto Hub project, maintaining the folder hierarchy. Each file is marked with an emoji indicating its importance based on imports:

- 🟢 (Green): Key file with many imports (>5)
- 🟡 (Yellow): Moderate importance (2-5 imports)
- 🔴 (Red): Less frequently imported (<2 imports)

## Root Directory

- `index.html` 🟢 - Main HTML entry point for the Vite application
- `vite.config.ts` 🟢 - Configuration for Vite bundler with path aliases and plugins
- `tailwind.config.ts` 🟢 - Tailwind CSS configuration with InfiWorld's custom colors and themes
- `package.json` 🟢 - Project metadata and dependencies
- `tsconfig.json` 🟢 - TypeScript configuration
- `tsconfig.app.json` 🟡 - Extended TypeScript configuration for the app
- `tsconfig.node.json` 🟡 - TypeScript configuration for Node.js environment

## src Directory

- `main.tsx` 🟢 - Application entry point with React DOM rendering
- `App.tsx` 🟢 - Main application component with router and providers setup
- `App.css` 🟡 - Global CSS styles for the application
- `index.css` 🟢 - Global Tailwind CSS styles and custom variables
- `vite-env.d.ts` 🔴 - Type declarations for Vite environment

### src/components

- `Layout.tsx` 🟢 - Main layout component with navbar, footer, and background
- `Navbar.tsx` 🟢 - Navigation component with responsive design
- `Footer.tsx` 🟢 - Footer component with links and copyright information
- `StarsBackground.tsx` 🟡 - Animated stars background component
- `TaskListPage.tsx` 🟢 - Main page for the task management system
- `TaskList.tsx` 🟢 - Component for displaying and managing the list of questions/tasks
- `TaskForm.tsx` 🟡 - Form component for creating and editing questions
- `QuestionItem.tsx` 🟡 - Component for displaying individual questions
- `FeatureCard.tsx` 🟡 - Reusable card component for features display
- `MapComponent.tsx` 🟢 - Map integration with Mapbox GL for displaying store locations
- `StoreDetails.tsx` 🟡 - Component for displaying details about a selected store

### src/components/ui

- `accordion.tsx` 🟡 - Shadcn UI accordion component
- `alert-dialog.tsx` 🟡 - Shadcn UI alert dialog component
- `alert.tsx` 🔴 - Shadcn UI alert component
- `aspect-ratio.tsx` 🔴 - Shadcn UI aspect ratio component
- `avatar.tsx` 🔴 - Shadcn UI avatar component
- `badge.tsx` 🟡 - Shadcn UI badge component for status indicators
- `breadcrumb.tsx` 🔴 - Shadcn UI breadcrumb component
- `button.tsx` 🟢 - Shadcn UI button component used throughout the application
- `calendar.tsx` 🟡 - Shadcn UI calendar component
- `card.tsx` 🟢 - Shadcn UI card component for content containers
- `carousel.tsx` 🟡 - Shadcn UI carousel component
- `chart.tsx` 🟡 - Shadcn UI chart component for data visualization
- `checkbox.tsx` 🟡 - Shadcn UI checkbox component
- `collapsible.tsx` 🔴 - Shadcn UI collapsible component
- `command.tsx` 🔴 - Shadcn UI command component
- `context-menu.tsx` 🔴 - Shadcn UI context menu component
- `dialog.tsx` 🟡 - Shadcn UI dialog component
- `drawer.tsx` 🔴 - Shadcn UI drawer component
- `dropdown-menu.tsx` 🟡 - Shadcn UI dropdown menu component
- `form.tsx` 🟢 - Shadcn UI form component for form handling
- `hover-card.tsx` 🔴 - Shadcn UI hover card component
- `input-otp.tsx` 🔴 - Shadcn UI input OTP component
- `input.tsx` 🟢 - Shadcn UI input component
- `label.tsx` 🟡 - Shadcn UI label component
- `menubar.tsx` 🔴 - Shadcn UI menubar component
- `navigation-menu.tsx` 🔴 - Shadcn UI navigation menu component
- `pagination.tsx` 🔴 - Shadcn UI pagination component
- `popover.tsx` 🟡 - Shadcn UI popover component
- `progress.tsx` 🔴 - Shadcn UI progress component
- `radio-group.tsx` 🔴 - Shadcn UI radio group component
- `resizable.tsx` 🔴 - Shadcn UI resizable component
- `scroll-area.tsx` 🔴 - Shadcn UI scroll area component
- `select.tsx` 🟡 - Shadcn UI select component
- `separator.tsx` 🟡 - Shadcn UI separator component
- `sheet.tsx` 🔴 - Shadcn UI sheet component
- `sidebar.tsx` 🟡 - Shadcn UI sidebar component
- `skeleton.tsx` 🔴 - Shadcn UI skeleton loading component
- `slider.tsx` 🔴 - Shadcn UI slider component
- `sonner.tsx` 🟡 - Shadcn UI sonner toast component
- `switch.tsx` 🔴 - Shadcn UI switch component
- `table.tsx` 🟡 - Shadcn UI table component
- `tabs.tsx` 🟡 - Shadcn UI tabs component
- `textarea.tsx` 🟢 - Shadcn UI textarea component
- `toast.tsx` 🟢 - Shadcn UI toast component
- `toaster.tsx` 🟡 - Shadcn UI toaster component
- `toggle-group.tsx` 🔴 - Shadcn UI toggle group component
- `toggle.tsx` 🔴 - Shadcn UI toggle component
- `tooltip.tsx` 🟡 - Shadcn UI tooltip component
- `use-toast.ts` 🟡 - Shadcn UI hook for toast functionality

### src/hooks

- `use-mobile.tsx` 🟡 - Custom hook for responsive design detection
- `use-toast.ts` 🟢 - Hook for managing toasts throughout the application

### src/lib

- `utils.ts` 🟢 - Utility functions used across the application

### src/pages

- `Index.tsx` 🟢 - Home page component
- `Map.tsx` 🟢 - Map page for viewing store locations
- `Marketplace.tsx` 🟢 - Marketplace page for listings
- `Freelance.tsx` 🟢 - Freelance platform page
- `Reservations.tsx` 🟢 - Reservations page for booking
- `Verification.tsx` 🟢 - KYC verification page
- `NotFound.tsx` 🟡 - 404 Not Found page

## public Directory

- `favicon.ico` 🟢 - Application favicon
- `placeholder.svg` 🟡 - Placeholder image for content that hasn't loaded
- `robots.txt` 🔴 - Instructions for web crawlers
- `lovable-uploads/` 🟢 - Directory containing uploaded assets

## Folder Structure Assessment

The project follows a standard React application structure with sensible organization. Components are properly separated, UI components are well-organized using the Shadcn UI library, and pages are clearly defined.
