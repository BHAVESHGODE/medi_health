# Complete Vercel Deployment Guide for MediHealth

## 📋 Prerequisites

Before deploying to Vercel, ensure you have:
- ✅ GitHub account (code already pushed there)
- ✅ Vercel account (free at vercel.com)
- ✅ Backend running on Render: `https://medi-health-backend.onrender.com`
- ✅ Frontend configured with correct environment variables

---

## 🚀 Step-by-Step Deployment Guide

### **Step 1: Prepare Your Frontend** ✅

Your frontend is already configured! Verify these files:

**1. `.env.production` file** (Already configured)
```dotenv
VITE_API_BASE_URL=https://medi-health-backend.onrender.com
```
✅ This points to your Render backend

**2. `vercel.json` file** (Already configured)
```json
{
    "rewrites": [
        {
            "source": "/(.*)",
            "destination": "/index.html"
        }
    ]
}
```
✅ This handles client-side routing (React Router)

**3. `package.json` has build script**
```json
"build": "vite build"
```
✅ Vercel will run this automatically

---

### **Step 2: Deploy to Vercel** (Easy Method - GitHub Integration)

#### **Option A: Using Vercel Dashboard (Recommended)**

1. **Go to Vercel Website**
   - Visit https://vercel.com
   - Sign in with GitHub (or create account)

2. **Import Your Repository**
   - Click "Add New..." → "Project"
   - Click "Import Git Repository"
   - Select your repository: `medi_health`
   - Click "Import"

3. **Configure Project Settings**
   - **Project Name**: `medihealth` (or your choice)
   - **Framework Preset**: Select "Vite"
   - **Root Directory**: `frontend/` (If not auto-detected)
   - Click "Continue"

4. **Set Environment Variables**
   - You'll see an "Environment Variables" section
   - Add the following:
     - **Name**: `VITE_API_BASE_URL`
     - **Value**: `https://medi-health-backend.onrender.com`
   - Click "Add"
   - Click "Deploy"

5. **Wait for Deployment**
   - Vercel will build and deploy automatically
   - Takes 2-3 minutes
   - You'll see a ✅ when complete

6. **Get Your Vercel URL**
   - Copy your deployment URL (e.g., `https://medihealth.vercel.app`)

---

#### **Option B: Using Vercel CLI (Advanced)**

If you prefer command line:

```bash
# Install Vercel CLI globally
npm i -g vercel

# Navigate to frontend directory
cd frontend

# Deploy
vercel deploy --prod

# Follow the prompts:
# 1. Link to existing project? → No (first time)
# 2. Set up and deploy? → Yes
# 3. Which scope? → Your account
# 4. Project name? → medihealth
# 5. Detected framework → Vite
# 6. Confirm build settings? → Yes
```

---

### **Step 3: Verify Deployment**

After deployment completes:

1. **Visit Your Live URL**
   - Example: `https://medihealth.vercel.app`
   - You should see the MediHealth login page

2. **Test the Application**
   ```bash
   # Login with test credentials
   Email: admin@medihealth.com
   Password: Admin@123
   ```

3. **Check Browser Console**
   - Open DevTools (F12)
   - Check Console for any errors
   - API calls should go to `https://medi-health-backend.onrender.com`

4. **Test API Connection**
   - Click on "Appointments" or "Departments"
   - Verify data loads from backend
   - If data loads, deployment is successful! ✅

---

## 🔧 Environment Variables Explanation

### **For Production (Vercel)**
```
VITE_API_BASE_URL=https://medi-health-backend.onrender.com
```

### **For Local Development**
- Uses fallback: `http://localhost:5000` (from config.js)

### **Why Two Different URLs?**
- **Local**: Backend runs on `localhost:5000`
- **Production**: Backend runs on Render at `https://medi-health-backend.onrender.com`

---

## 🔐 CORS Configuration (Important!)

Your Render backend needs to accept requests from Vercel:

**Check backend `.env`:**
```env
FRONTEND_URL=https://medihealth.vercel.app
```

If this needs updating:
1. Go to Render dashboard
2. Find your backend service
3. Edit environment variables
4. Update `FRONTEND_URL` to your Vercel URL
5. Deploy backend changes

**Or run these commands on Render:**
```bash
# This sets CORS to accept your Vercel domain
```

---

## 📊 Production Build Process

Vercel automatically:

1. **Installs dependencies**
   ```bash
   npm install
   ```

2. **Builds the project**
   ```bash
   npm run build
   ```
   This creates optimized `dist/` folder

3. **Serves the built files**
   - Static files are cached globally on CDN
   - Lightning-fast loading from anywhere

4. **Handles routing**
   - `vercel.json` rewrites handle React Router
   - All routes point to `index.html`

---

## 🚨 Troubleshooting

### **Issue: "Cannot connect to backend"**
**Solution:**
- Check `VITE_API_BASE_URL` in Vercel dashboard
- Verify Render backend is running
- Check CORS settings on backend

### **Issue: "Build failed"**
**Solution:**
- Check build logs in Vercel dashboard
- Run locally: `npm run build` in frontend folder
- Fix any errors, then redeploy

### **Issue: "Blank page or 404"**
**Solution:**
- Verify `vercel.json` exists and has rewrite rules
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+Shift+R)

### **Issue: "API endpoints return 404"**
**Solution:**
- Check backend is still running on Render
- Render free tier falls asleep after 15 min of inactivity
- Backend wakes up when accessed
- Wait 30 seconds and try again

---

## 🔄 Automatic Deployments

Once connected to GitHub:

**Every time you push to `main` branch:**
1. Vercel detects the change
2. Automatically builds and deploys
3. You get a new URL
4. Previous deployments stay available

**To trigger manual deployment:**
```bash
git add .
git commit -m "Deploy to Vercel"
git push origin main
```

---

## 📱 Access Your Deployed App

| Link | Purpose |
|------|---------|
| `https://medihealth.vercel.app` | Main frontend URL |
| `https://medihealth.vercel.app/login` | Login page |
| `https://medi-health-backend.onrender.com` | Backend API |
| `https://medi-health-backend.onrender.com/api/departments` | Example API endpoint |

---

## ✅ Deployment Checklist

- [ ] Frontend code pushed to GitHub
- [ ] `.env.production` has correct backend URL
- [ ] `vercel.json` exists with rewrite rules
- [ ] Vercel account created
- [ ] Project imported to Vercel
- [ ] Environment variables set in Vercel dashboard
- [ ] Build completes successfully
- [ ] Frontend loads at Vercel URL
- [ ] Can login with test credentials
- [ ] API calls work (data loads from backend)
- [ ] Backend CORS accepts Vercel domain

---

## 🎯 Next Steps After Deployment

### **1. Update Backend CORS**
```
Email backend admin or contact Render
Add FRONTEND_URL: https://your-vercel-url.vercel.app
```

### **2. Custom Domain (Optional)**
- Go to Vercel Project Settings
- Add your custom domain
- Follows simple steps to configure DNS

### **3. Monitor Deployments**
- Vercel dashboard shows all deployments
- Click on any to see logs, stats, etc.

### **4. Team Sharing**
- Invite team members to Vercel project
- Everyone can see deployments
- Collaborate easily

---

## 📞 Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Vite Build**: https://vitejs.dev/guide/build.html
- **React Router**: https://reactrouter.com/
- **Environment Variables**: https://vercel.com/docs/concepts/projects/environment-variables

---

## 🎉 Success Indicators

Your deployment is successful when:

✅ Vercel shows "Ready" status  
✅ You can access the live URL  
✅ Login page loads  
✅ Dashboard displays data  
✅ Sidebar navigation works  
✅ API calls complete (network tab shows 200 status)  
✅ No 404 errors on page refresh  

---

**You're ready to deploy!** 🚀
