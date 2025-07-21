# Synergy Brand Architect Platform

## Project Overview
A professional web platform for Synergy Brand Architect, delivering advanced digital marketing services through an intelligent, interactive content management ecosystem.

### Key Technologies
- Next.js React framework for responsive design
- TypeScript for type-safe development
- AI-enhanced interactive components
- Razorpay payment integration
- Comprehensive user authentication
- Sitemap and visitor tracking integration
- Optimized footer with real-time visitor count
- PostgreSQL database for data persistence
- Express.js backend server

## Recent Changes

### Complete Blog Functionality Removal (January 21, 2025)
- **Issue**: User requested complete removal of all blog functionality from both admin panel and public website
- **Actions**:
  - Fixed severe corruption in `server/storage.ts` that was preventing deployment
  - Removed all blog database schemas, types, and enums from `shared/schema.ts`
  - Eliminated blog routes, components, and navigation from frontend
  - Updated service package descriptions to replace "blog posts" with "content articles"
  - Cleaned up schema markup to remove blog-related SEO data
  - Removed blog image assets from `public/images/blog/`
- **Result**: Website fully functional with zero blog references remaining
- **Status**: ✓ Completed and verified working

### Port Configuration Fix (January 20, 2025)
- **Issue**: Deployment failed due to port mismatch between server code (3000) and deployment configuration (5000)
- **Fix**: Updated `server/index.ts` to use port 5000 for both development and production modes
- **Result**: Server now correctly listens on port 5000, matching the deployment configuration in `.replit`
- **Status**: ✓ Fixed and verified working

## Project Architecture

### Backend
- **Server**: Express.js application serving on port 5000
- **Database**: PostgreSQL with Drizzle ORM
- **Routes**: RESTful API endpoints in `server/routes.ts`
- **Storage**: Interface-based storage pattern in `server/storage.ts`

### Frontend
- **Framework**: React with Vite for development
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state
- **UI Components**: Shadcn/UI with Tailwind CSS
- **Forms**: React Hook Form with Zod validation

### Deployment
- **Environment**: Replit Deployments
- **Port**: 5000 (configured in `.replit`)
- **Build**: `npm run build` (Vite + esbuild)
- **Start**: `npm run start` (production mode)

## User Preferences
- Use simple, everyday language for non-technical communication
- Document architectural changes promptly
- Focus on production-ready, professional implementations