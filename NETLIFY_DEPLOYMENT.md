# Netlify Deployment Guide

This guide explains how to deploy your application to Netlify.

## Prerequisites

1. A Netlify account (sign up at https://netlify.com)
2. Your code in a Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### Option 1: Deploy via Netlify UI (Recommended)

1. **Push your code to Git**
   ```bash
   git add .
   git commit -m "Prepare for Netlify deployment"
   git push origin main
   ```

2. **Connect to Netlify**
   - Log in to your Netlify account
   - Click "Add new site" → "Import an existing project"
   - Choose your Git provider (GitHub, GitLab, or Bitbucket)
   - Select your repository

3. **Configure build settings**
   Netlify should auto-detect the settings from `netlify.toml`, but verify:
   - Build command: `npm run build`
   - Publish directory: `dist/public`
   - Functions directory: `netlify/functions`

4. **Set environment variables**
   Go to Site settings → Environment variables and add:
   - `DATABASE_URL` - Your PostgreSQL database URL
   - `SESSION_SECRET` - A secure random string
   - `SENDGRID_API_KEY` - Your SendGrid API key (if using email)
   - `VITE_SUPABASE_URL` - Your Supabase URL
   - `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key
   - Any other environment variables from your `.env` file

5. **Deploy**
   - Click "Deploy site"
   - Wait for the build to complete
   - Your site will be live at a Netlify URL (e.g., `your-site.netlify.app`)

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Initialize your site**
   ```bash
   netlify init
   ```
   Follow the prompts to create a new site or link to an existing one.

4. **Set environment variables**
   ```bash
   netlify env:set DATABASE_URL "your-database-url"
   netlify env:set SESSION_SECRET "your-session-secret"
   netlify env:set SENDGRID_API_KEY "your-sendgrid-key"
   netlify env:set VITE_SUPABASE_URL "your-supabase-url"
   netlify env:set VITE_SUPABASE_ANON_KEY "your-supabase-anon-key"
   ```

5. **Deploy**
   ```bash
   netlify deploy --prod
   ```

## Custom Domain Setup

1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Enter your domain name
4. Follow the DNS configuration instructions
5. Wait for DNS propagation (can take up to 48 hours)

## Database Considerations

Your application uses a PostgreSQL database. For production:

1. **Use a managed database service** like:
   - Supabase (recommended - already configured)
   - Neon
   - Railway
   - Heroku Postgres
   - AWS RDS

2. **Update DATABASE_URL** in Netlify environment variables with your production database URL

3. **Run migrations** if needed:
   ```bash
   npm run db:push
   ```

## Important Notes

1. **Serverless Functions**: Your API routes are automatically deployed as Netlify Functions
2. **Cold Starts**: The first request after inactivity may be slower due to serverless cold starts
3. **Function Timeout**: Netlify Functions have a 10-second timeout on the free tier
4. **Build Minutes**: Free tier includes 300 build minutes/month
5. **Bandwidth**: Free tier includes 100GB bandwidth/month

## Troubleshooting

### Build Fails
- Check the build logs in Netlify dashboard
- Ensure all dependencies are in `package.json` (not devDependencies if needed at runtime)
- Verify Node version matches (set to 20 in netlify.toml)

### API Routes Not Working
- Check Functions logs in Netlify dashboard
- Verify environment variables are set correctly
- Ensure database connection string is correct

### CSS/Assets Not Loading
- Check that `dist/public` is being published
- Verify asset paths are relative, not absolute
- Check browser console for 404 errors

## Monitoring

- **Function logs**: Site → Functions → Select function → View logs
- **Deploy logs**: Site → Deploys → Select deploy → View logs
- **Analytics**: Available in Site → Analytics

## Support

For Netlify-specific issues, visit:
- Documentation: https://docs.netlify.com
- Community: https://answers.netlify.com
- Status: https://www.netlifystatus.com
