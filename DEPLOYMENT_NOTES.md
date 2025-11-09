# Deployment Notes - Ayyappan & Co

## Summary of Changes

This document provides a quick reference for the complete setup of the Ayyappan & Co website with Supabase database, storage, and EmailJS integration.

## What's Included

### 1. Database Migrations
Two migration files are available in `supabase/migrations/`:

#### `20251108051550_create_ayyappan_schema.sql`
- Creates all database tables (services, projects, clients, form_submissions, site_settings)
- Sets up Row Level Security (RLS) policies
- Creates indexes for performance
- Inserts sample data

#### `20251109111329_20251109111305_create_media_storage_bucket.sql`
- Creates `media` storage bucket (public)
- Sets up storage policies for file uploads

### 2. EmailJS Integration
New file: `src/lib/emailjs.ts`
- Handles email notifications when forms are submitted
- Gracefully degrades if EmailJS is not configured
- Sends detailed notification emails to admin

Updated files:
- `src/pages/Contact.tsx` - Added EmailJS notification on contact form submission
- `src/pages/ServiceDetail.tsx` - Added EmailJS notification on service inquiry submission

### 3. Updated README
Comprehensive documentation including:
- Complete setup instructions (Supabase + EmailJS)
- Database schema documentation
- RLS policy explanations
- Storage bucket configuration
- EmailJS setup guide with template
- Troubleshooting section
- API usage examples
- Deployment instructions

## Environment Variables Required

Create a `.env` file with:

```env
# Supabase (Required)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# EmailJS (Optional - app works without it)
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxx
```

## Quick Setup Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Supabase
1. Create project at [supabase.com](https://supabase.com)
2. Get URL and anon key from Settings → API
3. Run migrations via SQL Editor or Supabase CLI
4. Create admin user in Authentication → Users

### 3. Configure EmailJS (Optional)
1. Create account at [emailjs.com](https://www.emailjs.com)
2. Add email service (Gmail, Outlook, etc.)
3. Create template with these variables:
   - `{{form_type}}`
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{phone}}`
   - `{{company}}`
   - `{{service_name}}`
   - `{{budget}}`
   - `{{message}}`
   - `{{submitted_at}}`
4. Get Service ID, Template ID, and Public Key

### 4. Run Development Server
```bash
npm run dev
```

### 5. Build for Production
```bash
npm run build
```

## Database Schema Summary

### Tables
- **services** - Service offerings with images
- **projects** - Project portfolio with galleries
- **clients** - Client logos for carousel
- **form_submissions** - Contact and inquiry forms
- **site_settings** - Site configuration (JSON)

### Storage
- **media** bucket - Public storage for images
  - `services/` folder
  - `projects/` folder
  - `clients/` folder

### RLS Policies
- Public can read services, projects, clients
- Anyone can submit forms
- Only authenticated users can manage content
- Only authenticated users can upload files

## EmailJS Template Example

```
Subject: New Form Submission - {{form_type}}

New inquiry received from your website!

Contact Information:
-------------------
Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Company: {{company}}

{{#if service_name}}
Service Interested In: {{service_name}}
{{/if}}

{{#if budget}}
Budget Range: {{budget}}
{{/if}}

Message:
--------
{{message}}

Submitted at: {{submitted_at}}

---
Please respond to this inquiry promptly.
```

## Deployment Checklist

### Pre-Deployment
- [ ] Environment variables configured
- [ ] Database migrations run successfully
- [ ] Admin user created in Supabase
- [ ] Storage bucket created and set to public
- [ ] EmailJS configured (optional)
- [ ] Build completes without errors
- [ ] All tests pass (if applicable)

### Vercel Deployment
1. Push code to GitHub
2. Import project in Vercel
3. Add all environment variables
4. Deploy

### Netlify Deployment
1. Push code to GitHub
2. Import project in Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add all environment variables
6. Deploy

## Post-Deployment Tasks

### 1. Test All Features
- [ ] Public pages load correctly
- [ ] Admin login works
- [ ] File uploads work
- [ ] Forms submit successfully
- [ ] Email notifications arrive (if configured)
- [ ] Images display correctly

### 2. Configure Site Settings
Update in Supabase Table Editor → site_settings:
- `company_info` - Company details
- `contact_info` - Contact information
- `social_links` - Social media URLs

### 3. Add Content
1. Log in to admin dashboard
2. Add services with images
3. Add projects with galleries
4. Add client logos
5. Test everything on frontend

## Troubleshooting Quick Reference

### Build Issues
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Migration Issues
- Run migrations one at a time in SQL Editor
- Check for `IF NOT EXISTS` in all CREATE statements
- Verify RLS is enabled on all tables

### EmailJS Not Working
- Check all 3 env variables are set
- Verify service is connected in EmailJS dashboard
- Check email isn't in spam folder
- Remember: App works without EmailJS

### Images Not Loading
- Verify bucket is public
- Check RLS policies on storage.objects
- Test direct URL in browser
- Ensure uploaded file path is correct

## Support Resources

- **Supabase Docs**: https://supabase.com/docs
- **EmailJS Docs**: https://www.emailjs.com/docs/
- **Vite Docs**: https://vitejs.dev
- **React Router Docs**: https://reactrouter.com

## Notes

- EmailJS is optional but recommended for better customer experience
- Free tier limits: EmailJS (200 emails/month), Supabase (500MB storage)
- Always test in staging before deploying to production
- Keep environment variables secure
- Regularly backup Supabase database

---

**Last Updated**: 2025-01-09
