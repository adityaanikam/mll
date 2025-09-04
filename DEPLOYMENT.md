# 🚀 Deployment Guide: FinTrust ML Project

This guide will help you deploy your FinTrust ML project to Vercel via GitHub, ensuring you avoid the 404 errors you encountered previously.

## 📋 Prerequisites

- [Git](https://git-scm.com/) installed on your machine
- [GitHub](https://github.com/) account
- [Vercel](https://vercel.com/) account
- [Node.js](https://nodejs.org/) (version 18 or higher)

## 🔧 Pre-Deployment Checklist

### 1. Fix Build Issues ✅
Before deploying, ensure your project builds successfully:

```bash
# Install dependencies
npm install

# Test the build locally
npm run build

# If build fails, fix any TypeScript/ESLint errors
npm run lint
```

**Common Issues Fixed:**
- ✅ Removed unused imports (`faShield`, `faStar`, `faBolt`)
- ✅ Fixed unescaped HTML entities (`'` → `&apos;`, `"` → `&ldquo;`)
- ✅ Fixed empty interface TypeScript error
- ✅ Removed problematic `page-old.tsx` file

### 2. Verify Project Structure
Ensure your project has the correct structure:
```
congi_ml_project/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── apply/page.tsx
│   │   └── dashboard/page.tsx
│   ├── components/
│   └── lib/
├── public/
├── package.json
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## 🐙 GitHub Setup

### 1. Initialize Git Repository
```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: FinTrust ML project setup"
```

### 2. Create GitHub Repository
1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `congi-ml-project` or similar
3. **Don't** initialize with README, .gitignore, or license (since you already have files)

### 3. Connect Local Repository to GitHub
```bash
# Add GitHub remote (replace with your actual repository URL)
git remote add origin https://github.com/YOUR_USERNAME/congi-ml-project.git

# Push to GitHub
git push -u origin main
```

## 🚀 Vercel Deployment

### 1. Connect Vercel to GitHub
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will automatically detect it's a Next.js project

### 2. Configure Build Settings
Vercel should auto-detect these settings, but verify:

- **Framework Preset**: Next.js
- **Root Directory**: `./` (leave empty)
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

### 3. Environment Variables
Your app uses the backend API at `https://cogni-ml.onrender.com`. Configure environment variables:

1. Go to Project Settings → Environment Variables
2. Add the following variables:
   - `NEXT_PUBLIC_API_URL` = `https://cogni-ml.onrender.com`
   - `API_URL` = `https://cogni-ml.onrender.com`
   - `NODE_ENV` = `production`

**Note**: The `NEXT_PUBLIC_` prefix makes the variable available in the browser.

### 4. Deploy
1. Click "Deploy"
2. Wait for the build to complete
3. Your app will be available at `https://your-project-name.vercel.app`

## 🔗 Backend Integration

Your FinTrust ML project is configured to work with the backend API at `https://cogni-ml.onrender.com`. The integration includes:

### API Endpoints Used:
- **Loan Prediction**: `/predict` - For ML-based loan eligibility prediction
- **System Health**: `/health` - For dashboard health monitoring
- **CIBIL Stats**: `/cibil-stats` - For credit score statistics
- **Model Info**: `/model-info` - For ML model information

### Configuration Files:
- `src/lib/config.ts` - API configuration and endpoints
- `src/lib/api.ts` - API utility functions and request handlers
- `env.example` - Environment variables template

### Frontend Integration:
- **Apply Page**: Sends loan application data to `/predict` endpoint
- **Dashboard Page**: Fetches system health and statistics from backend
- **Error Handling**: Proper error handling for API failures

## 🔍 Troubleshooting Common Issues

### 404 Error Solutions

**Issue**: Getting 404 errors on deployment
**Solutions**:
1. ✅ **Build Success**: Ensure `npm run build` passes locally
2. ✅ **File Structure**: Verify all pages are in `src/app/` directory
3. ✅ **No TypeScript Errors**: Fix all compilation errors
4. ✅ **No ESLint Errors**: Resolve linting issues
5. ✅ **Correct Imports**: Check all import paths use `@/` alias

### Build Failures
```bash
# Check for TypeScript errors
npx tsc --noEmit

# Check for ESLint errors
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix
```

### API Connection Issues
**Issue**: Frontend can't connect to backend API
**Solutions**:
1. ✅ **Check Backend URL**: Verify `https://cogni-ml.onrender.com` is accessible
2. ✅ **CORS Configuration**: Ensure backend allows requests from your domain
3. ✅ **Environment Variables**: Set `NEXT_PUBLIC_API_URL` in Vercel
4. ✅ **Network Requests**: Check browser network tab for failed requests
5. ✅ **Backend Health**: Test backend endpoints directly

**Test Backend Connectivity**:
```bash
# Test if backend is accessible
curl https://cogni-ml.onrender.com/health

# Test prediction endpoint
curl -X POST https://cogni-ml.onrender.com/predict \
  -H "Content-Type: application/json" \
  -d '{"age": 25, "gender": "Male", "marital_status": "Single"}'
```

### Import Path Issues
Ensure all imports use the correct paths:
```typescript
// ✅ Correct
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// ❌ Incorrect
import { Button } from "../../components/ui/button"
```

## 📝 Deployment Workflow

### For Future Updates
1. Make your changes locally
2. Test the build: `npm run build`
3. Commit changes: `git add . && git commit -m "Your message"`
4. Push to GitHub: `git push origin main`
5. Vercel will automatically redeploy

### Manual Deployment
If you need to trigger a manual deployment:
1. Go to Vercel Dashboard
2. Select your project
3. Click "Deployments" tab
4. Click "Redeploy" on the latest deployment

## 🎯 Best Practices

### 1. Always Test Locally First
```bash
# Test development server
npm run dev

# Test production build
npm run build
npm start
```

### 2. Use Semantic Versioning
```bash
# Update package.json version
npm version patch  # for bug fixes
npm version minor  # for new features
npm version major  # for breaking changes
```

### 3. Environment-Specific Configurations
Create different configs for different environments:
```typescript
// next.config.ts
const nextConfig = {
  // Production optimizations
  ...(process.env.NODE_ENV === 'production' && {
    output: 'standalone',
  }),
}
```

### 4. Performance Optimization
- Use Next.js Image component for images
- Implement proper loading states
- Optimize bundle size with dynamic imports

## 🔗 Useful Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Git workflow
git status           # Check file status
git add .            # Stage all changes
git commit -m "msg"  # Commit changes
git push origin main # Push to GitHub

# Vercel CLI (optional)
npx vercel           # Deploy to Vercel
npx vercel --prod    # Deploy to production
```

## 📞 Support

If you encounter issues:
1. Check the [Vercel Documentation](https://vercel.com/docs)
2. Review [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
3. Check build logs in Vercel Dashboard
4. Ensure all dependencies are properly installed

## ✅ Success Checklist

- [ ] Project builds successfully (`npm run build`)
- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] All imports use correct paths
- [ ] Repository pushed to GitHub
- [ ] Vercel project connected to GitHub
- [ ] Deployment successful
- [ ] App accessible at Vercel URL
- [ ] All routes working (/, /apply, /dashboard)

---

**🎉 Congratulations!** Your FinTrust ML project should now be successfully deployed and accessible without 404 errors!
