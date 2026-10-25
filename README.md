# 🔐 Aswini Traders — Headless CMS & Admin Portal

A decoupled, white-label **E-Commerce Admin Portal & Headless CMS** built with **React**, **Vite**, **Tailwind CSS**, and **Supabase**. Engineered to manage products, categories, inventory status, hero slideshows, promotional banners, and WhatsApp order routing in real time—with **automated cloud storage garbage collection** to maximize free-tier cloud storage limits.

---

## ✨ Key Engineering Highlights

- **Decoupled Architecture:** Runs independently from the customer storefront for enhanced security and a lightweight customer bundle.
- **Automated Cloud Storage Garbage Collection:** Deleting a product or category automatically triggers `cleanUpStorageBeforeDelete()`, permanently purging associated image files from the Supabase `product-images` bucket so orphaned files never waste storage quota.
- **Smart Auto-Incrementing SKU Engine:** Automatically scans existing inventory to generate sequential, collision-free Product IDs (`AT-SAR-001`, `AT-SAR-002`, etc.) without overwriting deleted slots.
- **Zero-Code Storefront Customization:** Full control over brand name, logo initials, top announcement bars, multi-slide hero carousels, promotional banners, About Us story, and social media links.
- **WhatsApp Number Normalization:** Automatically formats and syncs customer-facing display phone numbers with `https://wa.me/` checkout deep links.
- **White-Label Multi-Client Ready:** Easily clone and deploy for any new retail business in under 5 minutes using environment variables and the 1-Click Master SQL Script below.

---

## 🗄️ 1-Click Master Supabase SQL Setup (For New Business Clients)

When setting up this system for a **new business client**, create a new project on **[Supabase](https://supabase.com)**, open the **SQL Editor**, paste this **entire Master SQL Script**, and click **Run**. 

It automatically creates all required tables (`products`, `categories`, `business_settings`), creates the public `product-images` storage bucket, and configures all Row-Level Security (RLS) policies including storage `DELETE` permissions:

```sql
-- ============================================================================
-- MASTER SUPABASE SETUP SCRIPT (TABLES + STORAGE BUCKET + RLS POLICIES)
-- White-Label E-Commerce Storefront & Admin CMS
-- ============================================================================

-- 1. CREATE PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT DEFAULT 'Sarees',
  sub_category TEXT DEFAULT '',
  price NUMERIC DEFAULT 0,
  original_price NUMERIC DEFAULT 0,
  in_stock BOOLEAN DEFAULT true,
  badge TEXT DEFAULT '',
  is_new_arrival BOOLEAN DEFAULT true,
  image TEXT DEFAULT '',
  gallery JSONB DEFAULT '[]'::jsonb,
  description TEXT DEFAULT '',
  fabric TEXT DEFAULT '',
  length TEXT DEFAULT '',
  blouse TEXT DEFAULT '',
  work TEXT DEFAULT '',
  care TEXT DEFAULT '',
  occasion TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. CREATE CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  subtitle TEXT DEFAULT '',
  description TEXT DEFAULT '',
  image TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CREATE BUSINESS SETTINGS TABLE (SINGLETON ROW ID = 1)
CREATE TABLE IF NOT EXISTS public.business_settings (
  id INT PRIMARY KEY DEFAULT 1,
  store_name TEXT DEFAULT 'ASWINI',
  brand_subtitle TEXT DEFAULT 'TRADERS',
  brand_initial TEXT DEFAULT 'A',
  footer_bio TEXT DEFAULT 'Curated fashion collection crafted with love.',
  about_description TEXT DEFAULT '',
  tagline TEXT DEFAULT 'Premium Fashion for Everyone',
  announcement TEXT DEFAULT 'Free Shipping on Orders Above ₹999 (Within India)',
  whatsapp TEXT DEFAULT '919182433043',
  phone_display TEXT DEFAULT '+91 91824 33043',
  secondary_phone TEXT DEFAULT '',
  email TEXT DEFAULT 'store@example.com',
  address TEXT DEFAULT 'Visakhapatnam, Andhra Pradesh, India',
  whatsapp_url TEXT DEFAULT '[https://wa.me/919182433043](https://wa.me/919182433043)',
  instagram_url TEXT DEFAULT '[https://instagram.com](https://instagram.com)',
  youtube_url TEXT DEFAULT '[https://youtube.com](https://youtube.com)',
  hero_slides JSONB DEFAULT '[]'::jsonb,
  banner_images JSONB DEFAULT '[]'::jsonb,
  about_image TEXT DEFAULT '',
  promo_banners JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default settings row if not present
INSERT INTO public.business_settings (id)
VALUES (1)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 4. ENABLE ROW LEVEL SECURITY (RLS) & TABLE POLICIES
-- ============================================================================
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_settings ENABLE ROW LEVEL SECURITY;

-- Products Policies (Public Read + Admin Anon Key CRUD)
DROP POLICY IF EXISTS "Allow full access to products" ON public.products;
CREATE POLICY "Allow full access to products"
ON public.products FOR ALL
USING (true)
WITH CHECK (true);

-- Categories Policies (Public Read + Admin Anon Key CRUD)
DROP POLICY IF EXISTS "Allow full access to categories" ON public.categories;
CREATE POLICY "Allow full access to categories"
ON public.categories FOR ALL
USING (true)
WITH CHECK (true);

-- Business Settings Policies (Public Read + Admin Anon Key CRUD)
DROP POLICY IF EXISTS "Allow full access to business_settings" ON public.business_settings;
CREATE POLICY "Allow full access to business_settings"
ON public.business_settings FOR ALL
USING (true)
WITH CHECK (true);

-- ============================================================================
-- 5. CREATE STORAGE BUCKET ('product-images') & STORAGE RLS POLICIES
-- ============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Allow Public Viewing of Images (SELECT)
DROP POLICY IF EXISTS "Allow public view on product-images" ON storage.objects;
CREATE POLICY "Allow public view on product-images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

-- Allow Image Uploads from Admin Portal (INSERT)
DROP POLICY IF EXISTS "Allow public upload on product-images" ON storage.objects;
CREATE POLICY "Allow public upload on product-images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'product-images');

-- Allow Image Updates from Admin Portal (UPDATE)
DROP POLICY IF EXISTS "Allow public update on product-images" ON storage.objects;
CREATE POLICY "Allow public update on product-images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'product-images');

-- Allow Automatic Storage Cleanup on Product/Category Deletion (DELETE)
DROP POLICY IF EXISTS "Allow public delete on product-images" ON storage.objects;
CREATE POLICY "Allow public delete on product-images"
ON storage.objects FOR DELETE
USING (bucket_id = 'product-images');
```

---

## ⚙️ Environment Variables (`.env`)

Create a **`.env`** file in the root of `aswini-traders-admin` (and add these same variables in **Vercel → Settings → Environment Variables**):

```env
# Supabase Connection
VITE_SUPABASE_URL=[https://your-project-id.supabase.co](https://your-project-id.supabase.co)
VITE_SUPABASE_ANON_KEY=your-supabase-anon-public-key

# Admin Portal Login Credentials (Customizable per client)
VITE_ADMIN_EMAIL=admin@clientstore.com
VITE_ADMIN_PASSWORD=ClientPassword@2026

# Live Storefront Link (Used by "View Live Storefront" button)
VITE_STOREFRONT_URL=[https://client-storefront.vercel.app](https://client-storefront.vercel.app)
```

---

## 🚀 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start local server
npm run dev
```

---

## 💼 5-Minute White-Label Client Onboarding Checklist (Selling to New Businesses)

Whenever you sell this e-commerce package to a new business owner, follow these 5 steps:

1. **Create a Free Supabase Project:** Log in to Supabase, create a new project for the client, open the **SQL Editor**, and run the **Master SQL Script** above.
2. **Deploy the Storefront on Vercel:** Import the Storefront repo into Vercel, add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`, and deploy. Copy the live Storefront URL.
3. **Deploy the Admin Portal on Vercel:** Import the Admin repo into Vercel and set:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_ADMIN_EMAIL` (Client's admin email)
   - `VITE_ADMIN_PASSWORD` (Client's admin password)
   - `VITE_STOREFRONT_URL` (The live Storefront URL from Step 2)
4. **Customize Brand Identity:** Log in to the client's new Admin Portal → go to **Business Settings** → update their Brand Name, Logo Initial, WhatsApp Number, Hero Slides, and Address, then click **Save**.
5. **Hand Over Credentials:** Share the live Storefront link and Admin Portal login with your client!