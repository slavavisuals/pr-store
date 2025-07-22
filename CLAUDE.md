# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ProStore is a modern e-commerce application built with Next.js 15, TypeScript, and Prisma. It features user authentication, product catalog management, and a responsive design using Tailwind CSS and shadcn/ui components.

## Development Commands

- **Development server**: `npm run dev` (runs on http://localhost:3000)
- **Build**: `npm run build`
- **Production server**: `npm start`
- **Linting**: `npm run lint`
- **Database operations**:
  - `npm run prisma:studio` - Opens Prisma Studio for database management
  - `npm run prisma:migrate` - Runs database migrations

## Architecture Overview

### Database (Prisma + PostgreSQL)
- Prisma client generated to `/lib/generated/prisma/`
- Models: Product, User, Account, Session, VerificationToken
- Users support authentication with NextAuth.js and credential-based login
- Products have UUID primary keys, slugs for routing, and support for multiple images

### Authentication (NextAuth.js)
- Configuration in `auth.ts`
- Credentials provider with bcrypt password hashing
- JWT session strategy with 30-day expiration
- Custom sign-in page at `/sign-in`
- Prisma adapter for session storage

### App Structure (Next.js App Router)
- **Root layout**: Global theming with next-themes, Inter font
- **Route groups**:
  - `(auth)/` - Authentication pages with dedicated layout
  - `(root)/` - Main application pages
- **API routes**: NextAuth handlers in `/api/auth/[...nextauth]/`

### Components Architecture
- **UI Components**: shadcn/ui components in `/components/ui/`
- **Shared Components**: Reusable components in `/components/shared/`
  - Header with logo, navigation, and user controls
  - Product components (cards, images, pricing, lists)
- **Styling**: Tailwind CSS with custom utilities, dark/light theme support

### Data Layer
- **Server Actions**: Database operations in `/lib/actions/`
  - `product.actions.ts` - Product CRUD operations
  - `user.actions.ts` - User management
- **Utilities**: Helper functions in `/lib/utils.ts`
  - `convertToPlainObject()` - Converts Prisma results to plain objects
  - `formatNumberWithDecimal()` - Price formatting
  - `cn()` - Tailwind class merging utility
- **Validation**: Zod schemas in `/lib/validators.ts`

### Environment Configuration
- Constants in `/lib/constants/index.ts` with environment variable fallbacks
- App name, description, server URL configurable via environment variables

## Key Patterns

### Data Fetching
- Server Actions for database operations with proper error handling
- Use `convertToPlainObject()` for Prisma results passed to client components
- Latest products limited by `LATEST_PRODUCTS_LIMIT` constant

### Styling
- Use `cn()` utility for conditional classes
- Follow shadcn/ui component patterns
- Responsive design with mobile-first approach
- Theme support via next-themes

### Type Safety
- Full TypeScript coverage
- Zod validation for forms and data input
- Prisma-generated types for database models

### File Organization
- Group related functionality in feature folders
- Server Actions in `/lib/actions/` with descriptive naming
- Shared constants in `/lib/constants/`
- Reusable utilities in `/lib/utils.ts`

## Development Notes

- Prisma client is generated to a custom location: `/lib/generated/prisma/`
- Use server actions for all database operations
- Images stored as string arrays in Product model
- User roles supported via `role` field (default: "user")
- Product slugs must be unique for routing