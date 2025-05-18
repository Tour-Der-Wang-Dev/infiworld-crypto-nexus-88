
# InfiWorld Crypto Hub - System Architecture

This document provides a high-level overview of the InfiWorld Crypto Hub system architecture, designed to help new contributors understand how the various components interact.

## System Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│                         Client Application (React)                      │
│                                                                         │
├─────────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────────┤
│         │         │         │         │         │         │             │
│  Home   │   Map   │ Market- │ Free-   │ Reserv- │ Verifi- │  NotFound   │
│  Page   │  Page   │ place   │ lance   │ ations  │ cation  │    Page     │
│         │         │  Page   │  Page   │  Page   │  Page   │             │
└─────────┴────┬────┴────┬────┴────┬────┴────┬────┴────┬────┴─────────────┘
               │         │         │         │         │
               │         │         │         │         │
┌──────────────┴─────────┴─────────┴─────────┴─────────┴──────────────────┐
│                                                                         │
│                       Component Library (Shadcn UI)                     │
│                                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │    Forms    │  │   Layout    │  │   Display   │  │  Feedback   │     │
│  │ Components  │  │ Components  │  │ Components  │  │ Components  │     │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘     │
│                                                                         │
└─────────────────────────────────┬───────────────────────────────────────┘
                                  │
                                  │
┌─────────────────────────────────┴───────────────────────────────────────┐
│                                                                         │
│                            Core Services                                │
│                                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │   Router    │  │React Query  │  │   Mapbox    │  │Form Handling│     │
│  │(React Router)│  │  (State)   │  │    API      │  │(React Hook  │     │
│  │             │  │             │  │             │  │  Form/Zod)  │     │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘     │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│                           External Services                             │
│                                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │  Database   │  │ Auth Service│  │  Payments   │  │   Maps      │     │
│  │ (Future)    │  │  (Future)   │  │  (Future)   │  │ (Mapbox)    │     │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘     │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## Core Components

### Pages

- **Home Page**: Landing page introducing InfiWorld Crypto Hub
- **Map Page**: Interactive map showing crypto-friendly locations
- **Marketplace Page**: Listings for crypto transactions
- **Freelance Page**: Platform for crypto freelancing opportunities
- **Reservations Page**: Booking system with crypto payment options
- **Verification Page**: KYC verification system for users
- **NotFound Page**: 404 error page

### Feature Components

- **TaskList**: Question and task management system
- **MapComponent**: Mapbox GL integration for location display
- **StoreDetails**: Display component for location information
- **QuestionItem**: Component for displaying individual questions
- **TaskForm**: Form for creating/editing questions and tasks

### Core Services

- **React Router**: Handles navigation and routing
- **React Query**: Manages server state and data fetching
- **Mapbox API**: Provides mapping capabilities
- **Form Handling**: Uses React Hook Form with Zod validation

## Data Flow

1. User interacts with the application through Pages
2. Pages use Feature Components, which in turn use UI Components
3. Feature Components may fetch data using React Query
4. External services are accessed through appropriate APIs

## Future Integration Points

- **Database**: Will integrate with Supabase or similar service
- **Authentication**: Will implement user authentication system
- **Payment Processing**: Will integrate crypto payment gateways

## Styling Architecture

- Tailwind CSS for utility-based styling
- Custom theme with InfiWorld brand colors
- Responsive design with mobile-first approach

## Development Workflow

1. Local development with Vite dev server
2. Component development and testing
3. Integration with external services
4. Deployment to production

## Scalability Considerations

- Component-based architecture allows for easy scaling
- Separation of concerns between UI, state, and business logic
- Modular design enables independent development of features
