# Ayyappan & Co – 3D Engineering Website

A modern, 3D-enabled corporate website built for an electrical engineering and power infrastructure company. Features a stunning 3D hero section, dynamic content management, and a full-featured admin dashboard.

## Overview

This project is a production-ready React application built with TypeScript, featuring:
- Interactive 3D visualizations using React Three Fiber
- Full-featured admin dashboard with authentication
- Dynamic content management for services, projects, and clients
- Contact and service inquiry forms
- Responsive design with smooth animations
- Supabase backend for data persistence and authentication

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** - Fast build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **React Three Fiber** + **Drei** - 3D graphics and WebGL
- **Framer Motion** - Animation library
- **Zustand** - State management
- **Lucide React** - Icon library

### Backend
- **Supabase** - PostgreSQL database
- **Supabase Auth** - Email/password authentication
- **Row Level Security** - Database security policies

## Features

### Public Website
- **3D Hero Section** - Interactive 3D model with animations
- **Services Page** - Detailed service offerings with inquiry forms
- **Projects Gallery** - Filterable portfolio with detailed project pages
- **Clients Carousel** - Animated showcase of valued clients
- **Contact Page** - Form submission with Google Maps integration
- **About Page** - Company information, mission, vision, and values
- **Responsive Design** - Mobile-first, works on all devices

### Admin Dashboard
- **Authentication** - Secure login with Supabase Auth
- **Dashboard Overview** - Statistics and analytics
- **Services Management** - CRUD operations for services
- **Projects Management** - CRUD operations for projects with image galleries
- **Clients Management** - CRUD operations for client logos
- **Form Submissions** - View and manage contact/inquiry submissions
- **Status Management** - Update submission status (new, read, contacted, closed)

## Project Structure

```
ayyappan-co/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Header.tsx       # Navigation header
│   │   ├── Footer.tsx       # Footer with links
│   │   ├── Hero3D.tsx       # 3D hero scene
│   │   ├── ClientsCarousel.tsx  # Animated client carousel
│   │   ├── ProtectedRoute.tsx   # Auth wrapper
│   │   └── admin/
│   │       └── AdminLayout.tsx  # Admin dashboard layout
│   ├── pages/               # Page components
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   ├── ServiceDetail.tsx
│   │   ├── Projects.tsx
│   │   ├── ProjectDetail.tsx
│   │   ├── Contact.tsx
│   │   └── admin/           # Admin pages
│   │       ├── Login.tsx
│   │       ├── AdminPortal.tsx
│   │       ├── Dashboard.tsx
│   │       ├── ServicesManager.tsx
│   │       ├── ProjectsManager.tsx
│   │       ├── ClientsManager.tsx
│   │       └── SubmissionsViewer.tsx
│   ├── contexts/            # React contexts
│   │   └── AuthContext.tsx  # Authentication context
│   ├── store/               # State management
│   │   └── useStore.ts      # Zustand store
│   ├── lib/                 # Utilities and configs
│   │   └── supabase.ts      # Supabase client and types
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── supabase/
│   └── migrations/          # Database migrations
├── public/                  # Static assets
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```

## Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- Supabase account (free tier available at [supabase.com](https://supabase.com))
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/ayyappan-co.git
cd ayyappan-co
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Supabase

#### Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be provisioned (1-2 minutes)
3. Navigate to **Settings** → **API** in your Supabase dashboard
4. Copy your **Project URL** and **anon/public** key

#### Create Environment Variables
Create a `.env` file in the project root:
```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

#### Run Database Migration
The migration file is already created at `supabase/migrations/20251108051550_create_ayyappan_schema.sql`. You have two options:

**Option 1: Using Supabase Dashboard (Recommended for beginners)**
1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy the contents of `supabase/migrations/20251108051550_create_ayyappan_schema.sql`
4. Paste and run the SQL in the editor

**Option 2: Using Supabase CLI**
```bash
# Install Supabase CLI
npm install -g supabase

# Link to your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

### 4. Create Admin User

After running the migration, create an admin user:

1. Go to **Authentication** → **Users** in Supabase dashboard
2. Click **Add user** → **Create new user**
3. Enter email and password
4. Click **Create user**

This user can now log in to the admin dashboard at `/admin`.

### 5. Run the Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 6. Access Admin Dashboard
1. Navigate to `http://localhost:5173`
2. Change the URL to show the admin login: You can manually navigate or click through the site
3. Login with your Supabase admin credentials
4. Start managing content!

## Database Schema

### Tables

#### `services`
Stores information about engineering services offered
```sql
- id (uuid, PK)
- title (text)
- description (text)
- detailed_description (text)
- icon (text)
- image_url (text)
- display_order (integer)
- is_active (boolean)
- created_at (timestamptz)
- updated_at (timestamptz)
```

#### `projects`
Stores completed and ongoing projects
```sql
- id (uuid, PK)
- title (text)
- description (text)
- client_name (text)
- location (text)
- category (text)
- completion_year (integer)
- thumbnail_url (text)
- gallery_urls (jsonb array)
- is_featured (boolean)
- display_order (integer)
- created_at (timestamptz)
- updated_at (timestamptz)
```

#### `clients`
Stores client/partner company information
```sql
- id (uuid, PK)
- name (text)
- logo_url (text)
- display_order (integer)
- is_active (boolean)
- created_at (timestamptz)
```

#### `form_submissions`
Stores contact form and service inquiry submissions
```sql
- id (uuid, PK)
- form_type (text)
- name (text)
- email (text)
- phone (text)
- company (text)
- service_id (uuid, FK)
- message (text)
- budget (text)
- status (text)
- created_at (timestamptz)
```

#### `site_settings`
Stores general site configuration
```sql
- id (uuid, PK)
- key (text, unique)
- value (jsonb)
- description (text)
- updated_at (timestamptz)
```

### Row Level Security (RLS)

All tables have RLS enabled with the following policies:

- **Public Content**: Services, projects, and clients are viewable by everyone (anon users)
- **Form Submissions**: Anyone can create, only authenticated users can view/update
- **Admin Actions**: Only authenticated users can modify services, projects, and clients
- **Site Settings**: Everyone can read, only authenticated users can modify

## Usage Guide

### Adding New Services
1. Log in to admin dashboard
2. Navigate to **Services** section
3. Click **Add Service**
4. Fill in title, descriptions, select icon
5. Set display order and active status
6. Click **Create**

### Managing Projects
1. Navigate to **Projects** section
2. Click **Add Project**
3. Fill in project details:
   - Title, description
   - Client name, location
   - Category (Transmission/Distribution/Substation)
   - Completion year
   - Thumbnail URL (optional)
4. Toggle **Featured Project** for homepage display
5. Set display order
6. Click **Create**

### Managing Clients
1. Navigate to **Clients** section
2. Click **Add Client**
3. Enter client name and logo URL
4. Set display order for carousel
5. Toggle active status
6. Click **Create**

### Viewing Form Submissions
1. Navigate to **Form Submissions**
2. Filter by form type or status
3. Click **View** to see full details
4. Update status as you process inquiries:
   - **New** - Just received
   - **Read** - Reviewed
   - **Contacted** - Reached out to customer
   - **Closed** - Completed

## Customization

### Changing Colors
The project uses a gradient color scheme. To modify:

1. Open `src/components/` files
2. Find gradient classes like `from-[#0047FF] via-[#7A00FF] to-[#00C853]`
3. Replace with your brand colors
4. Update all instances for consistency

Current color scheme:
- Primary Blue: `#0047FF`
- Secondary Purple: `#7A00FF`
- Accent Green: `#00C853`

### Modifying 3D Scene
Edit `src/components/Hero3D.tsx` to customize the 3D visualization:
- Change building colors in the `<meshStandardMaterial>` components
- Adjust lighting in the `<directionalLight>` and `<pointLight>` components
- Modify camera position in `<PerspectiveCamera>`
- Update auto-rotate speed in `<OrbitControls>`

### Contact Information
Update contact details in the Supabase `site_settings` table:
```sql
UPDATE site_settings
SET value = '{
  "email": "your-email@company.com",
  "phone": "+91-XXXXXXXXXX",
  "address": "Your Address"
}'
WHERE key = 'contact_info';
```

## Build for Production

### Build the Application
```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Run Type Checking
```bash
npm run typecheck
```

### Run Linting
```bash
npm run lint
```

### Preview Production Build
```bash
npm run preview
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click **Import Project**
4. Select your repository
5. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Click **Deploy**

Your site will be live in minutes!

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click **Add new site** → **Import an existing project**
4. Select your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Add environment variables
7. Click **Deploy**

## Supabase Client Usage Examples

### Reading Data
```typescript
import { supabase } from './lib/supabase';

// Get all active services
const { data: services } = await supabase
  .from('services')
  .select('*')
  .eq('is_active', true)
  .order('display_order');

// Get featured projects
const { data: projects } = await supabase
  .from('projects')
  .select('*')
  .eq('is_featured', true)
  .order('display_order');
```

### Creating Data
```typescript
// Create new form submission
const { data, error } = await supabase
  .from('form_submissions')
  .insert({
    form_type: 'contact',
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Interested in your services'
  });
```

### Updating Data
```typescript
// Update project
const { error } = await supabase
  .from('projects')
  .update({
    title: 'Updated Project Name',
    updated_at: new Date().toISOString()
  })
  .eq('id', projectId);
```

### Deleting Data
```typescript
// Delete client
const { error } = await supabase
  .from('clients')
  .delete()
  .eq('id', clientId);
```

### Authentication
```typescript
// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'admin@example.com',
  password: 'password123'
});

// Sign out
await supabase.auth.signOut();

// Get current user
const { data: { user } } = await supabase.auth.getUser();
```

## Troubleshooting

### "Missing Supabase environment variables" error
- Ensure `.env` file exists in project root
- Check that variables are prefixed with `VITE_`
- Restart dev server after adding environment variables

### Admin login not working
- Verify user exists in Supabase Auth dashboard
- Check that RLS policies are correctly set up
- Ensure email and password are correct

### 3D scene not loading
- Check browser console for WebGL errors
- Ensure browser supports WebGL 2.0
- Try a different browser (Chrome/Edge/Firefox recommended)

### Form submissions not saving
- Check RLS policy for `form_submissions` table
- Verify Supabase connection in browser console
- Check network tab for API errors

## Performance Optimization

The project includes several optimizations:
- Code splitting with React lazy loading
- Image lazy loading
- Optimized 3D rendering with React Three Fiber
- Database indexes for fast queries
- Framer Motion animations with reduced motion support

## Security Notes

- Never commit `.env` file to version control
- Keep Supabase service role key secure (not used in frontend)
- RLS policies protect data access
- Admin authentication required for content management
- Form submissions sanitized before storage

## License

This project is proprietary software for Ayyappan & Co.

## Support

For issues or questions:
- Email: support@ayyappanco.com
- Documentation: This README
- Supabase Docs: [supabase.com/docs](https://supabase.com/docs)

## Credits

Built with:
- [React](https://react.dev)
- [Vite](https://vitejs.dev)
- [Supabase](https://supabase.com)
- [Three.js](https://threejs.org) via React Three Fiber
- [Framer Motion](https://www.framer.com/motion)
- [TailwindCSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)

---

**Ayyappan & Co** - Engineering India's Power Infrastructure
