# 🚀 Quick Start Guide - Merit Advisory Website

## Prerequisites

Before you begin, make sure you have:
- ✅ Node.js (version 18 or higher)
- ✅ npm or pnpm package manager

## Installation Steps

### Option 1: Using pnpm (Recommended)

```bash
# 1. Install pnpm globally (if not already installed)
npm install -g pnpm

# 2. Navigate to project directory
cd C:\Users\Muraadso\Desktop\merit-advisory-website

# 3. Install dependencies
pnpm install

# 4. Start development server
pnpm dev
```

### Option 2: Using npm

```bash
# 1. Navigate to project directory
cd C:\Users\Muraadso\Desktop\merit-advisory-website

# 2. Install dependencies (with legacy peer deps flag)
npm install --legacy-peer-deps

# 3. Start development server
npm run dev
```

## Viewing the Website

Once the development server is running, you'll see:

```
✓ Ready in 2.5s
○ Local:   http://localhost:3000
○ Network: http://192.168.x.x:3000
```

Open your browser and navigate to: **http://localhost:3000**

## What to Explore

### 1. Homepage Sections (Scroll down to see all)
- ✅ Hero
- ✅ Logo Carousel
- ✅ About
- ✅ Awards
- ✅ **Services** ← Click any service card
- ✅ **Differentiators** ← NEW! Scroll here to see what makes you unique
- ✅ Industries
- ✅ Process
- ✅ Solutions
- ✅ Benefits
- ✅ Hire Team
- ✅ Case Studies
- ✅ Testimonials
- ✅ CTA Section
- ✅ Blog
- ✅ FAQ
- ✅ Contact

### 2. Service Detail Pages

Click on any service card or navigate directly to:

```
http://localhost:3000/services/erp-implementation
http://localhost:3000/services/accounting-modernization
http://localhost:3000/services/digital-transformation
http://localhost:3000/services/business-automation
http://localhost:3000/services/odoo-solutions
http://localhost:3000/services/advisory-consulting
http://localhost:3000/services/audit-assurance
http://localhost:3000/services/accounting-taxation
http://localhost:3000/services/training-hub
```

Each page includes:
- Animated hero with orbiting benefit icons
- Key statistics
- Benefits grid
- Step-by-step approach timeline
- Technologies used
- CTA section
- Related services

## Troubleshooting

### Issue: "pnpm: command not found"
**Solution**: Install pnpm globally first:
```bash
npm install -g pnpm
```

### Issue: "npm ERR! ERESOLVE unable to resolve dependency tree"
**Solution**: Use the legacy peer deps flag:
```bash
npm install --legacy-peer-deps
```

### Issue: Port 3000 already in use
**Solution**: Either:
1. Stop the process using port 3000
2. Or use a different port:
```bash
npm run dev -- -p 3001
# or
pnpm dev -- -p 3001
```

### Issue: Changes not reflecting
**Solution**: 
1. Stop the dev server (Ctrl+C)
2. Clear Next.js cache:
```bash
rm -rf .next
# or on Windows
rmdir /s .next
```
3. Restart the dev server

## Building for Production

When ready to deploy:

```bash
# Build the production version
npm run build
# or
pnpm build

# Start production server
npm start
# or
pnpm start
```

## Project Structure

```
merit-advisory-website/
├── app/
│   ├── page.tsx                    ← Homepage
│   ├── layout.tsx                  ← Root layout
│   └── services/
│       └── [slug]/
│           ├── page.tsx            ← Service page routing
│           └── service-detail-client.tsx  ← NEW! Service detail component
├── components/
│   ├── differentiators.tsx         ← NEW! Differentiators section
│   ├── services.tsx                ← Services grid
│   ├── navbar.tsx
│   ├── hero.tsx
│   └── ... (other components)
├── lib/
│   └── services-data.ts            ← All service content
├── public/
│   └── ... (images, fonts, etc.)
└── styles/
    └── globals.css
```

## Key Files to Customize

### Service Content
**File**: `lib/services-data.ts`
- Edit service descriptions
- Update statistics
- Modify benefits and approach steps
- Change technologies

### Differentiators
**File**: `components/differentiators.tsx`
- Edit differentiator titles and descriptions
- Change colors
- Add/remove differentiators

### Homepage Order
**File**: `app/page.tsx`
- Rearrange section order
- Add/remove sections

## Next Steps

1. ✅ **Review the implementation**
   - Check all service pages
   - Review the differentiators section
   - Test on different screen sizes

2. 📝 **Customize content**
   - Update service descriptions if needed
   - Add real client logos
   - Update statistics with actual numbers

3. 🎨 **Add images**
   - Replace placeholder icons with real images
   - Add service-specific photos
   - Update team photos

4. 🚀 **Deploy**
   - Choose hosting (Vercel, Netlify, etc.)
   - Set up domain
   - Configure environment variables

## Documentation Files

- **IMPLEMENTATION_SUMMARY.md** - Visual overview of all features
- **SERVICE_PAGES_README.md** - Detailed feature documentation
- **DESIGN_SYSTEM.md** - Design tokens and specifications
- **README.md** - This file

## Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review the documentation files
3. Check the browser console for errors
4. Verify all dependencies are installed

---

**You're all set! 🎉**

Start the dev server and explore your enhanced Merit Advisory website with beautiful service pages and differentiators section!
