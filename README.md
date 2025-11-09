# Ayyappan & Co – 3D Engineering Website

A modern, 3D-enabled corporate website built for an electrical engineering and power infrastructure company. Features a stunning 3D hero section, dynamic content management, a full-featured admin dashboard, and automated email notifications.

## Overview

This project is a production-ready React application built with TypeScript, featuring:
- Interactive 3D visualizations using React Three Fiber
- Full-featured admin dashboard with authentication
- Dynamic content management for services, projects, and clients
- Contact and service inquiry forms with email notifications
- Responsive design with smooth animations
- Supabase backend for data persistence and authentication
- EmailJS integration for real-time admin notifications

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** - Fast build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **React Three Fiber** + **Drei** - 3D graphics and WebGL
- **Framer Motion** - Animation library
- **Zustand** - State management
- **Lucide React** - Icon library
- **EmailJS** - Email notification service

### Backend
- **Supabase** - PostgreSQL database
- **Supabase Auth** - Email/password authentication
- **Supabase Storage** - Media file storage
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
- **Services Management** - CRUD operations for services with image upload
- **Projects Management** - CRUD operations for projects with image galleries
- **Clients Management** - CRUD operations for client logos
- **Form Submissions** - View and manage contact/inquiry submissions
- **Status Management** - Update submission status (new, read, contacted, closed)

### Email Notifications
- **Instant Alerts** - Admin receives email when form is submitted
- **Detailed Info** - Includes all form data and submission time
- **Service Inquiries** - Shows which service customer is interested in
- **Optional** - Works without configuration, degrades gracefully

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
│   │   ├── supabase.ts      # Supabase client and types
│   │   ├── storage.ts       # File upload utilities
│   │   └── emailjs.ts       # Email notification service
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── supabase/
│   └── migrations/          # Database migrations
│       ├── 20251108051550_create_ayyappan_schema.sql
│       └── 20251109111329_20251109111305_create_media_storage_bucket.sql
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
- EmailJS account (free tier available at [emailjs.com](https://www.emailjs.com))
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
1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click **New Project**
3. Enter project details:
   - **Name**: Ayyappan & Co
   - **Database Password**: Choose a strong password (save it)
   - **Region**: Choose closest to your location
4. Click **Create new project** and wait 1-2 minutes for provisioning

#### Get API Credentials
1. Navigate to **Settings** → **API** in your Supabase dashboard
2. Copy the following:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon/public** key (starts with `eyJ...`)

#### Create Environment Variables
Create a `.env` file in the project root:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_EMAILJS_SERVICE_ID=your-service-id
VITE_EMAILJS_TEMPLATE_ID=your-template-id
VITE_EMAILJS_PUBLIC_KEY=your-public-key
```

**Note**: EmailJS variables are optional. If not configured, the app will work but won't send email notifications.

#### Run Database Migrations

**Option 1: Using Supabase Dashboard (Recommended for beginners)**
1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor** (left sidebar)
3. Click **New Query**
4. Copy the contents of `supabase/migrations/20251108051550_create_ayyappan_schema.sql`
5. Paste into the editor and click **Run**
6. Repeat for `supabase/migrations/20251109111329_20251109111305_create_media_storage_bucket.sql`

**Option 2: Using Supabase CLI**
```bash
# Install Supabase CLI globally
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project (get project ref from Settings > General)
supabase link --project-ref your-project-ref

# Run all migrations
supabase db push
```

### 4. Set Up EmailJS (Optional but Recommended)

EmailJS sends email notifications to admins when forms are submitted.

#### Create EmailJS Account
1. Go to [emailjs.com](https://www.emailjs.com) and sign up
2. Verify your email address

#### Add Email Service
1. Go to **Email Services** in dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow connection instructions
5. Copy the **Service ID**

#### Create Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template structure:

```
New Form Submission - {{form_type}}

From: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Company: {{company}}
Service: {{service_name}}
Budget: {{budget}}

Message:
{{message}}

Submitted at: {{submitted_at}}
```

4. Set **To Email** to your admin email
5. Click **Save** and copy the **Template ID**

#### Get Public Key
1. Go to **Account** → **General**
2. Copy your **Public Key**

#### Update .env File
Add the three EmailJS values to your `.env` file:
```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxx
```

### 5. Create Admin User

After running the migration, create an admin user:

1. Go to **Authentication** → **Users** in Supabase dashboard
2. Click **Add user** → **Create new user**
3. Enter:
   - **Email**: admin@ayyappanco.com (or your preferred email)
   - **Password**: Choose a strong password
4. Click **Create user**
5. Optional: Click on the user and confirm their email manually

This user can now log in to the admin dashboard at `/admin`.

### 6. Verify Storage Bucket

The migration creates a `media` bucket for file uploads. Verify it exists:

1. Go to **Storage** in Supabase dashboard
2. You should see a bucket named **media**
3. If not, create it manually:
   - Click **New bucket**
   - Name: `media`
   - **Public bucket**: checked
   - Click **Create bucket**

### 7. Run the Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 8. Access Admin Dashboard
1. Navigate to `http://localhost:5173/admin/login`
2. Login with your Supabase admin credentials
3. Start managing content!

## Database Schema

### Tables

#### `services`
Stores information about engineering services offered
```sql
- id (uuid, PK)
- title (text, NOT NULL)
- description (text, NOT NULL)
- detailed_description (text, NOT NULL)
- icon (text, DEFAULT 'wrench')
- image_url (text)
- display_order (integer, DEFAULT 0)
- is_active (boolean, DEFAULT true)
- created_at (timestamptz, DEFAULT now())
- updated_at (timestamptz, DEFAULT now())
```

#### `projects`
Stores completed and ongoing projects
```sql
- id (uuid, PK)
- title (text, NOT NULL)
- description (text, NOT NULL)
- client_name (text, NOT NULL)
- location (text, NOT NULL)
- category (text, NOT NULL)
- completion_year (integer)
- thumbnail_url (text)
- gallery_urls (jsonb, DEFAULT '[]')
- is_featured (boolean, DEFAULT false)
- display_order (integer, DEFAULT 0)
- created_at (timestamptz, DEFAULT now())
- updated_at (timestamptz, DEFAULT now())
```

#### `clients`
Stores client/partner company information
```sql
- id (uuid, PK)
- name (text, NOT NULL)
- logo_url (text, NOT NULL)
- display_order (integer, DEFAULT 0)
- is_active (boolean, DEFAULT true)
- created_at (timestamptz, DEFAULT now())
```

#### `form_submissions`
Stores contact form and service inquiry submissions
```sql
- id (uuid, PK)
- form_type (text, NOT NULL)
- name (text, NOT NULL)
- email (text, NOT NULL)
- phone (text)
- company (text)
- service_id (uuid, FK to services)
- message (text, NOT NULL)
- budget (text)
- status (text, DEFAULT 'new')
- created_at (timestamptz, DEFAULT now())
```

#### `site_settings`
Stores general site configuration
```sql
- id (uuid, PK)
- key (text, UNIQUE, NOT NULL)
- value (jsonb, NOT NULL)
- description (text)
- updated_at (timestamptz, DEFAULT now())
```

### Storage Buckets

#### `media`
Public bucket for storing images
- **Services**: `services/{timestamp}-{random}.{ext}`
- **Projects**: `projects/{timestamp}-{random}.{ext}`
- **Clients**: `clients/{timestamp}-{random}.{ext}`

### Row Level Security (RLS)

All tables have RLS enabled with the following policies:

#### Public Content
- **Services, Projects, Clients**: Anonymous users can SELECT (read)
- **Site Settings**: Everyone can read

#### Form Submissions
- **Anyone**: Can INSERT (create new submissions)
- **Authenticated Users**: Can SELECT, UPDATE (admin only)

#### Admin Actions
- **Authenticated Users**: Full CRUD on services, projects, clients, site_settings

#### Storage
- **Public**: Can view/download files from `media` bucket
- **Authenticated Users**: Can upload, update, delete files

## Usage Guide

### Managing Services
1. Log in to admin dashboard
2. Navigate to **Services** section
3. Click **Add Service**
4. Fill in:
   - Title and descriptions
   - Select icon (power, network, building)
   - Upload service image (optional)
   - Set display order and active status
5. Click **Create**

### Managing Projects
1. Navigate to **Projects** section
2. Click **Add Project**
3. Fill in project details:
   - Title, description
   - Client name, location
   - Category (Transmission/Distribution/Substation)
   - Completion year
   - Upload thumbnail and gallery images
4. Toggle **Featured Project** for homepage display
5. Set display order
6. Click **Create**

### Managing Clients
1. Navigate to **Clients** section
2. Click **Add Client**
3. Enter client name
4. Upload logo image
5. Set display order for carousel
6. Toggle active status
7. Click **Create**

### Viewing Form Submissions
1. Navigate to **Form Submissions**
2. Filter by:
   - **Form type**: Contact or Service Inquiry
   - **Status**: New, Read, Contacted, Closed
3. Click **View** to see full details
4. Update status as you process inquiries

### Uploading Images
The admin interface handles uploads automatically:
1. Click the upload area in any form
2. Select an image file (PNG, JPG, SVG)
3. File is uploaded to Supabase Storage
4. Public URL is saved to database
5. Image displays immediately in preview

**Supported formats**: PNG, JPG, JPEG, SVG
**Max file size**: 5MB (configurable in storage settings)

## Email Notifications

### How It Works
When a user submits a contact form or service inquiry:
1. Form data is saved to Supabase database
2. EmailJS sends notification email to admin
3. Email includes all form details
4. Admin can respond directly to customer email

### Email Content
The notification email includes:
- Form type (Contact or Service Inquiry)
- Customer name, email, phone, company
- Service interested in (for inquiries)
- Budget range (for inquiries)
- Message/details
- Submission timestamp

### Troubleshooting EmailJS
If emails aren't sending:
1. Check `.env` file has correct EmailJS credentials
2. Verify EmailJS service is connected to your email
3. Check EmailJS dashboard for failed sends
4. Ensure template ID matches your template
5. Check browser console for errors

**Note**: The app works without EmailJS. If not configured, form submissions still save to database but no email is sent.

## Customization

### Changing Colors
The project uses a gradient color scheme. To modify:

1. Open component files in `src/components/` and `src/pages/`
2. Find gradient classes like `from-[#0047FF] via-[#7A00FF] to-[#00C853]`
3. Replace with your brand colors
4. Update all instances for consistency

Current color scheme:
- Primary Blue: `#0047FF`
- Secondary Purple: `#7A00FF`
- Accent Green: `#00C853`

### Modifying 3D Scene
Edit `src/components/Hero3D.tsx` to customize the 3D visualization:
- Change building colors in `<meshStandardMaterial>` components
- Adjust lighting in `<directionalLight>` and `<pointLight>` components
- Modify camera position in `<PerspectiveCamera>`
- Update auto-rotate speed in `<OrbitControls>`

### Contact Information
Update contact details in the Supabase `site_settings` table:

1. Go to **Table Editor** → **site_settings**
2. Find row with key `contact_info`
3. Update the JSON value:
```json
{
  "email": "your-email@company.com",
  "phone": "+91-XXXXXXXXXX",
  "address": "Your Complete Address"
}
```

Or update directly in SQL Editor:
```sql
UPDATE site_settings
SET value = '{
  "email": "your-email@company.com",
  "phone": "+91-XXXXXXXXXX",
  "address": "Your Address"
}'::jsonb
WHERE key = 'contact_info';
```

### Company Logo
To use your company logo:
1. Add logo file to `public/` folder as `logo.jpg` or `logo.png`
2. Logo automatically displays in header (see `src/components/Header.tsx`)

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
   - `VITE_EMAILJS_SERVICE_ID` (optional)
   - `VITE_EMAILJS_TEMPLATE_ID` (optional)
   - `VITE_EMAILJS_PUBLIC_KEY` (optional)
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

## Troubleshooting

### Missing Supabase Environment Variables
**Error**: "Missing Supabase environment variables"

**Solution**:
- Ensure `.env` file exists in project root
- Check that variables are prefixed with `VITE_`
- Restart dev server after adding environment variables: `npm run dev`

### Admin Login Not Working
**Problem**: Cannot log in to admin dashboard

**Solutions**:
1. Verify user exists in Supabase Auth dashboard
2. Confirm email and password are correct
3. Check that RLS policies are set up (run migrations)
4. Try resetting password in Supabase dashboard
5. Check browser console for error messages

### 3D Scene Not Loading
**Problem**: Hero section is blank or shows errors

**Solutions**:
1. Check browser console for WebGL errors
2. Ensure browser supports WebGL 2.0
3. Try a different browser (Chrome/Edge/Firefox recommended)
4. Update graphics drivers
5. Disable hardware acceleration if issues persist

### Form Submissions Not Saving
**Problem**: Forms submit but don't appear in admin

**Solutions**:
1. Check RLS policy for `form_submissions` table
2. Verify Supabase connection in browser Network tab
3. Check for API errors in browser console
4. Ensure `.env` variables are correct
5. Verify migrations ran successfully

### Images Not Uploading
**Problem**: Upload button doesn't work or shows errors

**Solutions**:
1. Verify `media` bucket exists in Supabase Storage
2. Check bucket is set to **Public**
3. Ensure RLS policies allow authenticated uploads
4. Check file size is under 5MB
5. Verify image format is supported (PNG, JPG, SVG)

### Images Not Displaying
**Problem**: Uploaded images don't show on website

**Solutions**:
1. Check bucket is set to **Public**
2. Verify public URL in database is correct
3. Check CORS settings in Supabase Storage
4. Ensure image path starts with bucket name
5. Test direct URL in browser

### CORS Errors
**Problem**: Browser shows CORS errors

**Solutions**:
1. Check Supabase URL in `.env` is correct
2. Ensure you're not using localhost URL in production
3. Verify Supabase project is active
4. Check API keys are valid
5. Clear browser cache and cookies

### EmailJS Not Sending
**Problem**: Forms submit but no email received

**Solutions**:
1. Check all three EmailJS env variables are set
2. Verify EmailJS service is connected to email
3. Check EmailJS dashboard for errors
4. Ensure template exists and ID is correct
5. Verify email isn't in spam folder
6. Check EmailJS monthly quota (free tier: 200 emails/month)

**Note**: App works without EmailJS. Forms still save to database if EmailJS fails.

### Build Errors
**Problem**: `npm run build` fails

**Solutions**:
1. Delete `node_modules` and run `npm install`
2. Run `npm run typecheck` to find TypeScript errors
3. Check all imports are correct
4. Ensure all dependencies are installed
5. Clear npm cache: `npm cache clean --force`

### Migration Errors
**Problem**: SQL migrations fail to run

**Solutions**:
1. Check you have correct permissions in Supabase
2. Run migrations one at a time
3. Check for syntax errors in SQL
4. Verify tables don't already exist (use `IF NOT EXISTS`)
5. Check Supabase project is active and not paused

## Performance Optimization

The project includes several optimizations:
- Code splitting with React lazy loading
- Image lazy loading
- Optimized 3D rendering with React Three Fiber
- Database indexes for fast queries
- Framer Motion animations with reduced motion support
- Compressed production builds with Vite

## Security Best Practices

### Environment Variables
- Never commit `.env` file to version control
- Keep Supabase service role key secure (not used in frontend)
- Rotate API keys regularly
- Use environment-specific keys for dev/staging/production

### Database Security
- RLS policies protect data access
- Admin authentication required for content management
- Form submissions sanitized before storage
- SQL injection prevention through parameterized queries

### Storage Security
- Public bucket for read-only access
- Authenticated users only for uploads
- File type validation
- File size limits

### Authentication
- Secure password requirements
- Email verification recommended
- Session management via Supabase
- Protected routes for admin pages

## API Usage Examples

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

### File Upload
```typescript
import { uploadFile, generateFileName } from './lib/storage';

// Upload file
const file = event.target.files[0];
const filePath = generateFileName('projects', file);
const result = await uploadFile('media', filePath, file);

if (result.error) {
  console.error('Upload failed:', result.error);
} else {
  console.log('Public URL:', result.publicUrl);
}
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

## Development Tips

### Database Changes
When modifying database schema:
1. Create a new migration file in `supabase/migrations/`
2. Use timestamp prefix: `YYYYMMDDHHMMSS_description.sql`
3. Always use `IF NOT EXISTS` for table creation
4. Include comprehensive comments
5. Test migration on local/staging first

### Component Development
- Keep components small and focused
- Use TypeScript for type safety
- Follow existing naming conventions
- Add proper error handling
- Test responsive design

### State Management
- Use Zustand for global state
- Use React Context for auth state
- Local state for component-specific data
- Avoid prop drilling

### Styling
- Use TailwindCSS utility classes
- Follow mobile-first approach
- Use consistent spacing (multiples of 4)
- Maintain color scheme consistency

## License

This project is proprietary software for Ayyappan & Co.

## Support

For issues or questions:
- Email: support@ayyappanco.com
- Documentation: This README
- Supabase Docs: [supabase.com/docs](https://supabase.com/docs)
- EmailJS Docs: [emailjs.com/docs](https://www.emailjs.com/docs/)

## Credits

Built with:
- [React](https://react.dev)
- [Vite](https://vitejs.dev)
- [Supabase](https://supabase.com)
- [EmailJS](https://www.emailjs.com)
- [Three.js](https://threejs.org) via React Three Fiber
- [Framer Motion](https://www.framer.com/motion)
- [TailwindCSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)

---

**Ayyappan & Co** - Engineering India's Power Infrastructure
