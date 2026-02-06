# HRMS Assessment Project

A modern Human Resource Management System (HRMS) built with React, TypeScript, and Supabase. This application provides comprehensive employee management, attendance tracking, and dashboard analytics features.

## 🚀 Features

- **Dashboard Analytics**: Real-time insights and statistics about your workforce
- **Employee Management**: Complete CRUD operations for employee records
- **Attendance Tracking**: Monitor and manage employee attendance
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Dark Mode Support**: Theme switching with next-themes
- **Type-Safe**: Full TypeScript support for better development experience

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - UI library
- **TypeScript 5.8.3** - Type safety
- **Vite 5.4.19** - Build tool and dev server
- **React Router DOM 6.30.1** - Client-side routing
- **TailwindCSS 3.4.17** - Utility-first CSS framework
- **shadcn/ui** - Re-usable component library built on Radix UI
- **Framer Motion 12.33.0** - Animation library

### Backend & Database
- **Supabase** - Backend as a Service (BaaS)
  - PostgreSQL database
  - Real-time subscriptions
  - Authentication
  - Row Level Security (RLS)

### State Management & Data Fetching
- **TanStack Query (React Query) 5.83.0** - Server state management
- **React Hook Form 7.61.1** - Form handling
- **Zod 3.25.76** - Schema validation

### UI Components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **Recharts** - Charting library
- **Sonner** - Toast notifications
- **date-fns** - Date utility library

### Testing
- **Vitest 3.2.4** - Unit testing framework
- **Testing Library** - React component testing
- **jsdom** - DOM implementation for testing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **bun** package manager
- **Git**

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "assesment HRMS"
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory with the following variables:
   ```env
   VITE_SUPABASE_PROJECT_ID=your_project_id
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
   ```

   > **Note**: Replace the placeholder values with your actual Supabase project credentials.

4. **Set up Supabase**
   
   - Create a Supabase project at [supabase.com](https://supabase.com)
   - Run the SQL migrations from the `supabase/` directory
   - Configure Row Level Security (RLS) policies as needed

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
# or
bun run dev
```

The application will start at `http://localhost:5173`

### Build for Production
```bash
npm run build
# or
bun run build
```

### Preview Production Build
```bash
npm run preview
# or
bun run preview
```

### Build for Development Environment
```bash
npm run build:dev
```

## 🧪 Testing

### Run Tests
```bash
npm run test
# or
bun run test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
# or
bun run test:watch
```

## 📝 Code Quality

### Linting
```bash
npm run lint
# or
bun run lint
```

## 📁 Project Structure

```
assesment HRMS/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── attendance/  # Attendance-related components
│   │   ├── dashboard/   # Dashboard components
│   │   ├── employees/   # Employee management components
│   │   ├── layout/      # Layout components
│   │   └── ui/          # shadcn/ui components
│   ├── hooks/           # Custom React hooks
│   ├── integrations/    # External service integrations
│   │   └── supabase/    # Supabase client and types
│   ├── lib/             # Utility functions
│   ├── pages/           # Page components
│   ├── test/            # Test files
│   ├── App.tsx          # Main App component
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles
├── supabase/            # Supabase configuration and migrations
├── .env                 # Environment variables (not in git)
├── components.json      # shadcn/ui configuration
├── package.json         # Project dependencies
├── tailwind.config.ts   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
├── vitest.config.ts     # Vitest configuration
└── vercel.json          # Vercel deployment configuration
```

## 🌐 Deployment

### Vercel (Recommended)

This project is configured for deployment on Vercel:

1. **Install Vercel CLI** (optional)
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

   Or connect your GitHub repository to Vercel for automatic deployments.

3. **Environment Variables**
   
   Don't forget to add your environment variables in the Vercel dashboard:
   - `VITE_SUPABASE_PROJECT_ID`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`

### Other Platforms

The production build can be deployed to any static hosting service:
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_PROJECT_ID` | Your Supabase project ID | Yes |
| `VITE_SUPABASE_URL` | Your Supabase project URL | Yes |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Your Supabase publishable/anon key | Yes |

---

