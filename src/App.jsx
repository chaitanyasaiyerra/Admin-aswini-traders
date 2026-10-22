import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Search,
  User,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Truck,
  ShieldCheck,
  Sparkles,
  Headphones,
  Phone,
  Mail,
  MapPin,
  Share2,
  Copy,
  Check,
  Menu,
  X,
  Plus,
  Edit3,
  Trash2,
  LayoutDashboard,
  Package,
  FolderPlus,
  Tags,
  Settings,
  LogOut,
  Eye,
  EyeOff,
  Upload,
  Filter,
  SlidersHorizontal,
  ExternalLink,
  MessageCircle,
  Award,
  Users,
  Feather,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Lock
} from 'lucide-react';
import { supabase } from './supabaseClient';

// Custom SVG Brand Icons
const Instagram = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Facebook = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Youtube = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3v6Z" />
  </svg>
);

const DEFAULT_HERO_SLIDES = [
  {
    id: 1,
    eyebrow: 'TRADITION • ELEGANCE • EVERYDAY YOU',
    title: 'ASWINI TRADERS',
    subtitle: 'Premium Fashion for Every You',
    ctaText: 'Explore Collection',
    targetCategory: 'All',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1400&q=85'
  },
  {
    id: 2,
    eyebrow: 'GRACE IN EVERY DRAPE',
    title: 'HANDPICKED SAREES',
    subtitle: 'Pure Cotton, Fancy & Festive Weaves Crafted with Love',
    ctaText: 'Shop Sarees',
    targetCategory: 'Sarees',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1400&q=85'
  },
  {
    id: 3,
    eyebrow: 'EFFORTLESS EVERYDAY STYLE',
    title: 'KURTIS & CO-ORD SETS',
    subtitle: 'Breathable Fabrics & Contemporary Silhouettes for Every Occasion',
    ctaText: 'Explore Kurtis & Sets',
    targetCategory: 'Kurtis',
    image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=1400&q=85'
  }
];

const INITIAL_BUSINESS_SETTINGS = {
  brandName: 'ASWINI',
  brandSubtitle: 'TRADERS',
  brandInitial: 'A',
  footerBio: "At ASWINI TRADERS, we bring you a curated collection of sarees, kurtis, co-ord sets, and women's fashion wear crafted with love.",
  aboutDescription: '',
  tagline: 'Chaitu-Traders – Premium Fashion for Everyone',
  subTagline: 'Tradition Woven with Elegance',
  whatsapp: '919182433043',
  whatsappDisplay: '+91 9182433043',
  phone: '+91 6304526779',
  phoneHours: 'Mon - Sat, 9AM - 8PM',
  email: 'aswinitraders@gmail.com',
  location: 'Visakhapatnam, Andhra Pradesh, India',
  announcementLeft: 'Free Shipping on Orders Above ₹999 (Within India)',
  announcementCenter: 'Chaitu-Traders – Premium Fashion for Everyone',

  promoBanners: [
    {
      eyebrow: 'Grace in Every Drape',
      title: 'COTTON SAREES',
      subtitle: 'Soft • Breathable • Elegant',
      buttonText: 'Shop Now',
      targetCategory: 'Cotton Sarees',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=700&q=80'
    },
    {
      eyebrow: 'Trendy & Comfortable',
      title: 'KURTIS & CO-ORD SETS',
      subtitle: 'Everyday Fashion, Elevated',
      buttonText: 'Explore Now',
      targetCategory: 'Kurtis',
      image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=700&q=80'
    }
  ],

  whatsappUrl: 'https://wa.me/919182433043',
  instagramUrl: 'https://instagram.com',
  youtubeUrl: 'https://youtube.com',
  instagram: 'https://instagram.com',
  facebook: 'https://facebook.com',
  youtube: 'https://youtube.com',
  heroSlides: DEFAULT_HERO_SLIDES,
  bannerImages: [
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1600&q=85'
  ],
  aboutImage: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=85'
};

const INITIAL_CATEGORIES = [
  { id: 'cat-sarees', name: 'Sarees', slug: 'Sarees', subtitle: 'Graceful drapes for every occasion', description: 'Explore our signature collection of traditional, festive, and everyday sarees.', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85', featuredOnHome: true },
  { id: 'cat-cotton-sarees', name: 'Cotton Sarees', slug: 'Cotton Sarees', subtitle: 'Soft • Breathable', description: 'Pure handloom and printed cotton sarees.', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=85', featuredOnHome: true },
  { id: 'cat-fancy-sarees', name: 'Fancy Sarees', slug: 'Fancy Sarees', subtitle: 'Contemporary shimmer', description: 'Lightweight organza and georgette designer sarees.', image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=85', featuredOnHome: true },
  { id: 'cat-kurtis', name: 'Kurtis', slug: 'Kurtis', subtitle: 'Comfortable everyday ethnic wear', description: 'Embroidered festive kurtis and flared tops.', image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=900&q=85', featuredOnHome: true },
  { id: 'cat-coord-sets', name: 'Co-ord Sets', slug: 'Co-ord Sets', subtitle: 'Trendy matching sets', description: 'Coordinated ethnic and fusion two-piece sets.', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85', featuredOnHome: true },
  { id: 'cat-nightwear', name: "Women's Nightwear", slug: "Women's Nightwear", subtitle: 'Comfort for relaxed moments', description: 'Ultra-soft cotton night suits and lounge sets.', image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=85', featuredOnHome: true }
];

const INITIAL_PRODUCTS = [];

// ============================================================================
// BOTANICAL MOTIFS, LOGO & RESPONSIVE SELECT DROPDOWN
// ============================================================================
const LotusIcon = ({ className = 'w-6 h-6', color = '#C5A15B' }) => (
  <svg viewBox="0 0 40 28" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M20 2C17.5 8 15 13 20 22C25 13 22.5 8 20 2Z" fill={color} fillOpacity="0.85" />
    <path d="M8 25H32" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const BrandLogo = ({ onClick, size = 'default', light = false, brandName = 'ASWINI', brandSubtitle = 'TRADERS', brandInitial = 'A' }) => {
  const isCompact = size === 'compact';
  return (
    <button type="button" onClick={onClick} className="group flex items-center gap-2.5 sm:gap-3 text-left focus:outline-none min-w-0 cursor-pointer">
      <div className={`relative flex items-center justify-center rounded-full border-2 border-[#C5A15B] shrink-0 ${light ? 'bg-[#4E081B]/90' : 'bg-gradient-to-br from-[#FAF6F0] to-[#EFE5D8]'} shadow-sm ${isCompact ? 'w-9 h-9 sm:w-10 sm:h-10' : 'w-11 h-11 sm:w-14 sm:h-14'}`}>
        <span className={`font-serif font-bold tracking-tight ${light ? 'text-[#E6D3A7]' : 'text-[#650D24]'} ${isCompact ? 'text-lg sm:text-xl' : 'text-xl sm:text-3xl'}`} style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{brandInitial}</span>
      </div>
      <div className="flex flex-col items-center min-w-0">
        <span className={`font-serif font-bold tracking-[0.1em] sm:tracking-[0.12em] leading-none truncate max-w-[140px] xs:max-w-[180px] sm:max-w-none ${light ? 'text-[#FAF6F0]' : 'text-[#650D24]'} ${isCompact ? 'text-base sm:text-lg' : 'text-lg sm:text-2xl'}`} style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{brandName}</span>
        <div className="flex items-center gap-1 sm:gap-1.5 mt-1">
          <span className="h-[1px] w-2.5 sm:w-4 bg-[#C5A15B] shrink-0" />
          <span className={`text-[9px] sm:text-[11px] font-medium tracking-[0.2em] sm:tracking-[0.26em] uppercase truncate ${light ? 'text-[#E6D3A7]' : 'text-[#7A122D]'}`}>{brandSubtitle}</span>
          <span className="h-[1px] w-2.5 sm:w-4 bg-[#C5A15B] shrink-0" />
        </div>
      </div>
    </button>
  );
};

// Custom Responsive Select that never overflows outside mobile screens
const ResponsiveSelect = ({ value, onChange, children, className = '' }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const options = useMemo(() => {
    return React.Children.toArray(children)
      .filter((child) => React.isValidElement(child))
      .map((child) => ({
        value: child.props.value,
        label: child.props.children,
      }));
  }, [children]);

  const selectedOption =
    options.find((opt) => String(opt.value) === String(value)) || options[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-w-0">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`${className} flex items-center justify-between gap-2 text-left cursor-pointer`}
      >
        <span className="truncate">{selectedOption?.label || value}</span>
        <ChevronDown
          className={`w-4 h-4 text-[#650D24] shrink-0 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full mt-1 z-50 w-full max-w-full bg-white rounded-xl border border-[#DECBB4] shadow-xl max-h-60 overflow-y-auto py-1">
          {options.map((opt, idx) => {
            const isSelected = String(opt.value) === String(value);
            return (
              <button
                key={`${opt.value}-${idx}`}
                type="button"
                onClick={() => {
                  onChange({ target: { value: opt.value } });
                  setOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2 text-xs sm:text-sm truncate flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#650D24] text-white font-semibold'
                    : 'text-[#2D181C] hover:bg-[#F6EFE5]'
                }`}
              >
                <span className="truncate">{opt.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// MAIN APPLICATION COMPONENT (ADMIN ONLY)
// ============================================================================
export default function App() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [businessSettings, setBusinessSettings] = useState(() => {
    try {
      const cached = localStorage.getItem('store_live_settings');
      return cached ? { ...INITIAL_BUSINESS_SETTINGS, ...JSON.parse(cached) } : INITIAL_BUSINESS_SETTINGS;
    } catch {
      return INITIAL_BUSINESS_SETTINGS;
    }
  });
  const [inquiries, setInquiries] = useState([]);
  const [toast, setToast] = useState(null);

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminTab, setAdminTab] = useState('dashboard');
  const [editingProduct, setEditingProduct] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap';
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    const storeTitle = [businessSettings.brandName, businessSettings.brandSubtitle].filter(Boolean).join(' ') || 'ASWINI TRADERS';
    document.title = `${storeTitle} — Admin Portal`;
  }, [businessSettings.brandName, businessSettings.brandSubtitle]);

  useEffect(() => {
    if (!supabase) return;

    const loadSupabaseData = async () => {
      try {
        // 1. Load Products
        const { data: prodData, error: prodErr } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (!prodErr && prodData) {
          setProducts(
            prodData.map((row) => ({
              id: row.id,
              sku: row.id,
              name: row.name,
              category: row.category,
              parentCategory: row.sub_category || 'Sarees',
              price: Number(row.price),
              originalPrice: Number(row.original_price || 0),
              inStock: row.in_stock,
              badge: row.badge || '',
              isNewArrival: row.is_new_arrival,
              images: row.gallery?.length ? row.gallery : [row.image],
              description: row.description,
              specs: {
                fabric: row.fabric,
                length: row.length,
                blouse: row.blouse,
                work: row.work,
                care: row.care,
                occasion: row.occasion,
              },
              createdAt: row.created_at,
            }))
          );
        }

        // 2. Load Categories from Supabase
        const { data: catData, error: catErr } = await supabase
          .from('categories')
          .select('*');

        if (!catErr && catData && catData.length > 0) {
          setCategories(
            catData.map((c) => ({
              id: c.id,
              name: c.name,
              slug: c.name,
              subtitle: c.subtitle || '',
              description: c.description || '',
              image: c.image || '',
              featuredOnHome: true,
            }))
          );
        }

        // 3. Load Business Settings (Includes about_description, tagline, announcement, and social URLs!)
        const { data: setRow } = await supabase
          .from('business_settings')
          .select('*')
          .eq('id', 1)
          .single();

        if (setRow) {
          setBusinessSettings((prev) => {
            const resolvedWhatsapp = setRow.whatsapp ?? prev.whatsapp ?? '';
            const resolvedWhatsappUrl =
              setRow.whatsapp_url ||
              (resolvedWhatsapp
                ? resolvedWhatsapp.startsWith('http')
                  ? resolvedWhatsapp
                  : `https://wa.me/${String(resolvedWhatsapp).replace(/[^0-9]/g, '')}`
                : prev.whatsappUrl || '');
            const resolvedInstagramUrl =
              setRow.instagram_url ?? setRow.instagram ?? prev.instagramUrl ?? prev.instagram ?? '';
            const resolvedYoutubeUrl =
              setRow.youtube_url ?? setRow.youtube ?? prev.youtubeUrl ?? prev.youtube ?? '';
            const resolvedTagline =
              setRow.tagline ?? prev.tagline ?? 'Chaitu-Traders – Premium Fashion for Everyone';
            const resolvedAnnouncement =
              setRow.announcement ?? prev.announcementLeft ?? 'Free Shipping on Orders Above ₹999 (Within India)';

            const updatedSettings = {
              ...prev,
              brandName: setRow.store_name ?? prev.brandName,
              brandSubtitle: setRow.brand_subtitle ?? prev.brandSubtitle,
              brandInitial: setRow.brand_initial ?? prev.brandInitial,
              footerBio: setRow.footer_bio ?? prev.footerBio,
              aboutDescription: setRow.about_description ?? prev.aboutDescription ?? '',
              tagline: resolvedTagline,
              announcementCenter: resolvedTagline,
              announcementLeft: resolvedAnnouncement,
              whatsapp: resolvedWhatsapp,
              whatsappDisplay: setRow.phone_display ?? prev.whatsappDisplay,
              phone: setRow.secondary_phone ?? prev.phone,
              email: setRow.email ?? prev.email,
              location: setRow.address ?? prev.location,
              whatsappUrl: resolvedWhatsappUrl,
              instagramUrl: resolvedInstagramUrl,
              youtubeUrl: resolvedYoutubeUrl,
              instagram: resolvedInstagramUrl,
              youtube: resolvedYoutubeUrl,
              heroSlides:
                Array.isArray(setRow.hero_slides) && setRow.hero_slides.length > 0
                  ? setRow.hero_slides
                  : prev.heroSlides || DEFAULT_HERO_SLIDES,
              bannerImages:
                Array.isArray(setRow.banner_images) && setRow.banner_images.length > 0
                  ? setRow.banner_images
                  : prev.bannerImages,
              aboutImage: setRow.about_image || prev.aboutImage,
            };

            localStorage.setItem('store_live_settings', JSON.stringify(updatedSettings));
            return updatedSettings;
          });
        }
      } catch (err) {
        console.error('Supabase load error:', err);
      }
    };

    loadSupabaseData();
  }, []);

  const handleSaveProduct = async (productData) => {
    const cleanId = productData.sku?.trim() || productData.id || `AT-PRD-${Date.now()}`;
    const finalProduct = {
      ...productData,
      id: cleanId,
      sku: cleanId,
      price: Number(productData.price) || 699,
      originalPrice: productData.originalPrice ? Number(productData.originalPrice) : null,
      updatedAt: new Date().toISOString()
    };

    setProducts((prev) => {
      const exists = prev.some((p) => p.id === cleanId);
      if (exists) return prev.map((p) => (p.id === cleanId ? finalProduct : p));
      return [finalProduct, ...prev];
    });

    if (supabase) {
      await supabase.from('products').upsert({
        id: finalProduct.id,
        name: finalProduct.name,
        category: finalProduct.category,
        sub_category: finalProduct.parentCategory || '',
        price: finalProduct.price,
        original_price: finalProduct.originalPrice || 0,
        in_stock: finalProduct.inStock,
        badge: finalProduct.badge || '',
        is_new_arrival: finalProduct.isNewArrival ?? true,
        image: finalProduct.images?.[0] || '',
        gallery: finalProduct.images || [],
        description: finalProduct.description || '',
        fabric: finalProduct.specs?.fabric || '',
        length: finalProduct.specs?.length || '',
        blouse: finalProduct.specs?.blouse || '',
        work: finalProduct.specs?.work || '',
        care: finalProduct.specs?.care || '',
        occasion: finalProduct.specs?.occasion || '',
      });
    }

    showToast(`Product "${finalProduct.name}" (${cleanId}) saved successfully!`);
    setEditingProduct(null);
    setAdminTab('products');
  };

  const handleDeleteProduct = async (productId) => {
    const target = products.find((p) => p.id === productId);
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    if (supabase) {
      await supabase.from('products').delete().eq('id', productId);
    }
    showToast(`Deleted "${target?.name || productId}" from inventory`, 'info');
  };

  const handleDeleteCategory = async (cat) => {
    // 1. Remove category and its products from Admin UI immediately
    setCategories((prev) => prev.filter((c) => c.id !== cat.id));
    setProducts((prev) =>
      prev.filter((p) => p.category !== cat.name && p.parentCategory !== cat.name)
    );

    if (supabase) {
      // 2. Delete all products in this category from Supabase (checks both category & sub_category)
      const { error: prodErr } = await supabase
        .from('products')
        .delete()
        .or(`category.eq."${cat.name}",sub_category.eq."${cat.name}"`);

      if (prodErr) {
        console.error('Error deleting products in category:', prodErr);
      }

      // 3. Delete the category itself from Supabase
      const { error: catErr } = await supabase
        .from('categories')
        .delete()
        .eq('id', cat.id);

      if (catErr) {
        console.error('Delete category error:', catErr);
        showToast(`Failed to delete from DB: ${catErr.message}`, 'error');
        return;
      }
    }

    showToast(`Category "${cat.name}" and all its products deleted!`, 'info');
  };

  const handleToggleStock = async (productId) => {
    const target = products.find((p) => p.id === productId);
    if (!target) return;
    const updated = { ...target, inStock: !target.inStock };
    setProducts((prev) => prev.map((p) => (p.id === productId ? updated : p)));
    if (supabase) {
      await supabase.from('products').update({ in_stock: updated.inStock }).eq('id', productId);
    }
    showToast(`${updated.name} marked as ${updated.inStock ? 'In Stock' : 'Out of Stock'}`);
  };

  const handleSaveBusinessSettings = async (newSettings) => {
    // Keep digits consistent between WhatsApp Order Number and Display WhatsApp Number
    const cleanOrderDigits = String(newSettings.whatsapp || newSettings.whatsappDisplay || '').replace(/[^0-9]/g, '');
    const displayDigits = String(newSettings.whatsappDisplay || '').replace(/[^0-9]/g, '');

    // If Display WhatsApp Number has different digits than Order Number, format it from Order Number;
    // otherwise preserve the admin's custom display formatting (e.g., "+91 93460 18273")
    const syncedDisplayNumber =
      displayDigits === cleanOrderDigits && newSettings.whatsappDisplay?.trim()
        ? newSettings.whatsappDisplay.trim()
        : cleanOrderDigits.length === 12 && cleanOrderDigits.startsWith('91')
        ? `+91 ${cleanOrderDigits.slice(2, 7)} ${cleanOrderDigits.slice(7)}`
        : cleanOrderDigits
        ? `+${cleanOrderDigits}`
        : '';

    const syncedWhatsappUrl = cleanOrderDigits ? `https://wa.me/${cleanOrderDigits}` : '';

    const normalizedSettings = {
      ...newSettings,
      whatsapp: cleanOrderDigits,
      whatsappDisplay: syncedDisplayNumber,
      whatsappUrl: syncedWhatsappUrl,
      tagline: newSettings.tagline ?? newSettings.announcementCenter ?? '',
      announcementCenter: newSettings.tagline ?? newSettings.announcementCenter ?? '',
      instagramUrl: newSettings.instagramUrl ?? newSettings.instagram ?? '',
      youtubeUrl: newSettings.youtubeUrl ?? newSettings.youtube ?? '',
      instagram: newSettings.instagramUrl ?? newSettings.instagram ?? '',
      youtube: newSettings.youtubeUrl ?? newSettings.youtube ?? '',
    };

    // 1. Update React state
    setBusinessSettings(normalizedSettings);

    // 2. Update local storage cache
    localStorage.setItem('store_live_settings', JSON.stringify(normalizedSettings));

    // 3. Send to Supabase
    if (supabase) {
      const { error } = await supabase.from('business_settings').upsert({
        id: 1,
        store_name: normalizedSettings.brandName,
        brand_subtitle: normalizedSettings.brandSubtitle,
        brand_initial: normalizedSettings.brandInitial,
        footer_bio: normalizedSettings.footerBio,
        about_description: normalizedSettings.aboutDescription ?? '',
        tagline: normalizedSettings.tagline ?? '',
        announcement: normalizedSettings.announcementLeft ?? '',
        whatsapp: normalizedSettings.whatsapp,
        phone_display: normalizedSettings.whatsappDisplay,
        secondary_phone: normalizedSettings.phone,
        email: normalizedSettings.email,
        address: normalizedSettings.location,
        whatsapp_url: normalizedSettings.whatsappUrl,
        instagram_url: normalizedSettings.instagramUrl ?? '',
        youtube_url: normalizedSettings.youtubeUrl ?? '',
        hero_slides: normalizedSettings.heroSlides,
        banner_images: normalizedSettings.bannerImages,
        about_image: normalizedSettings.aboutImage,
        promo_banners: normalizedSettings.promoBanners,
      });

      if (error) {
        console.error('Supabase Save Error:', error.message);
        showToast(`Failed to save: ${error.message}`, 'error');
        return;
      }
    }
    showToast('Business settings saved and synced across the website!');
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F6EFE5] text-[#2D181C]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {!isAdminAuthenticated ? (
        <AdminLoginPageView
          businessSettings={businessSettings}
          onSuccess={() => {
            setIsAdminAuthenticated(true);
            showToast('Welcome to Admin Dashboard!');
          }}
          onBack={() => window.open('http://localhost:5173', '_blank')}
        />
      ) : (
        <AdminDashboardView
          products={products}
          categories={categories}
          setCategories={setCategories}
          onDeleteCategory={handleDeleteCategory}
          businessSettings={businessSettings}
          onSaveSettings={handleSaveBusinessSettings}
          adminTab={adminTab}
          setAdminTab={setAdminTab}
          editingProduct={editingProduct}
          setEditingProduct={setEditingProduct}
          onSaveProduct={handleSaveProduct}
          onDeleteProduct={handleDeleteProduct}
          onToggleStock={handleToggleStock}
          inquiries={inquiries}
          onViewStore={() => window.open('http://localhost:5173', '_blank')}
          onLogout={() => {
            setIsAdminAuthenticated(false);
            showToast('Logged out of Admin Portal', 'info');
          }}
          showToast={showToast}
        />
      )}

      {toast && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-5 sm:bottom-5 z-50 max-w-md flex items-center gap-2.5 bg-[#4E081B] text-[#FAF6F0] border border-[#C5A15B] px-4 py-3 rounded-xl shadow-xl">
          <CheckCircle2 className="w-4 h-4 text-[#C5A15B] shrink-0" />
          <span className="text-xs sm:text-sm font-medium break-words">{toast.message}</span>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// ADMIN LOGIN VIEW
// ============================================================================
function AdminLoginPageView({ businessSettings, onSuccess, onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Reads from Vercel/Netlify Environment Variables for each client
  const EXPECTED_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'admin@aswinitraders.com';
  const EXPECTED_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'Aswini@2026';
  const STOREFRONT_URL = import.meta.env.VITE_STOREFRONT_URL || 'http://localhost:5173';

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      email.trim().toLowerCase() !== EXPECTED_EMAIL.toLowerCase() ||
      password !== EXPECTED_PASSWORD
    ) {
      setError('Invalid administrator email or password.');
      return;
    }
    setError('');
    onSuccess();
  };

  const brandName = businessSettings?.brandName || 'ASWINI';
  const brandSubtitle = businessSettings?.brandSubtitle || 'TRADERS';
  const brandInitial = businessSettings?.brandInitial || 'A';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 sm:py-12 relative overflow-hidden bg-[#F6EFE5]">
      <div className="mb-5 sm:mb-6 flex flex-col items-center text-center relative z-10 max-w-full px-2">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-[#C5A15B] bg-[#FAF6F0] flex items-center justify-center shadow-sm mb-2 shrink-0">
          <span className="font-serif text-2xl sm:text-3xl font-bold text-[#650D24]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{brandInitial}</span>
        </div>
        <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#650D24] tracking-[0.12em] sm:tracking-[0.14em] break-words" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{brandName} {brandSubtitle}</h1>
      </div>

      <div className="w-full max-w-md bg-[#FAF6F0] rounded-2xl border border-[#DECBB4] p-5 sm:p-8 shadow-lg relative z-10">
        <div className="text-center mb-5 sm:mb-6">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#650D24]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Admin Portal Login</h2>
          <p className="text-xs sm:text-sm text-[#6E5A4F] mt-1">Private Management Portal</p>
        </div>

        {error && <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs break-words">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#2D181C] mb-1.5">Email *</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3.5 sm:px-4 py-2.5 rounded-xl border border-[#DECBB4] bg-white text-sm focus:outline-none focus:border-[#650D24]" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#2D181C] mb-1.5">Password *</label>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3.5 sm:px-4 py-2.5 pr-10 rounded-xl border border-[#DECBB4] bg-white text-sm focus:outline-none focus:border-[#650D24]" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A685B] p-1 cursor-pointer">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <button type="submit" className="w-full py-3 rounded-xl bg-[#650D24] hover:bg-[#4E081B] text-white font-semibold text-sm shadow-md transition-colors cursor-pointer">Login to Dashboard</button>
        </form>

        <div className="mt-5 pt-4 border-t border-[#E5D9C8] flex flex-wrap items-center justify-between gap-2 text-xs text-[#7A685B]">
          <span>Secure Portal</span>
          <button type="button" onClick={onBack} className="text-[#650D24] font-semibold hover:underline cursor-pointer">Open Storefront ↗</button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// ADMIN DASHBOARD VIEW (All Images Set to object-contain for Full Visibility)
// ============================================================================
function AdminDashboardView({ products, categories, setCategories, onDeleteCategory, businessSettings, onSaveSettings, adminTab, setAdminTab, editingProduct, setEditingProduct, onSaveProduct, onDeleteProduct, onToggleStock, onViewStore, onLogout, showToast }) {
  const [adminSearch, setAdminSearch] = useState('');
  const [adminCatFilter, setAdminCatFilter] = useState('All');

  const emptyForm = {
    name: '',
    sku: `AT-SAR-${String(products.length + 1).padStart(3, '0')}`,
    category: 'Cotton Sarees',
    parentCategory: 'Sarees',
    price: '',
    originalPrice: '',
    inStock: true,
    badge: 'New',
    isNewArrival: true,
    description: '',
    images: [],
    specs: { fabric: 'Pure Cotton', length: '6.3 Meters', blouse: 'Included', work: 'Printed', care: 'Dry Clean', occasion: 'Daily Wear' }
  };

  const [productForm, setProductForm] = useState(emptyForm);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategorySubtitle, setNewCategorySubtitle] = useState('');
  const [newCategoryImage, setNewCategoryImage] = useState('');

  const [settingsForm, setSettingsForm] = useState({
    brandName: businessSettings?.brandName || '',
    brandSubtitle: businessSettings?.brandSubtitle || '',
    brandInitial: businessSettings?.brandInitial || '',
    footerBio: businessSettings?.footerBio || '',
    aboutDescription: businessSettings?.aboutDescription || '',
    announcementLeft: businessSettings?.announcementLeft || 'Free Shipping on Orders Above ₹999 (Within India)',
    tagline: businessSettings?.tagline || 'Chaitu-Traders – Premium Fashion for Everyone',
    whatsappUrl: businessSettings?.whatsappUrl || '',
    instagramUrl: businessSettings?.instagramUrl || businessSettings?.instagram || '',
    youtubeUrl: businessSettings?.youtubeUrl || businessSettings?.youtube || '',
    whatsapp: businessSettings?.whatsapp || '',
    whatsappDisplay: businessSettings?.whatsappDisplay || '',
    phone: businessSettings?.phone || '',
    email: businessSettings?.email || '',
    location: businessSettings?.location || '',
    heroSlides: businessSettings?.heroSlides || DEFAULT_HERO_SLIDES,
    promoBanners: businessSettings?.promoBanners || [
      {
        eyebrow: 'Grace in Every Drape',
        title: 'COTTON SAREES',
        subtitle: 'Soft • Breathable • Elegant',
        buttonText: 'Shop Now',
        targetCategory: 'Cotton Sarees',
        image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=700&q=80'
      },
      {
        eyebrow: 'Trendy & Comfortable',
        title: 'KURTIS & CO-ORD SETS',
        subtitle: 'Everyday Fashion, Elevated',
        buttonText: 'Explore Now',
        targetCategory: 'Kurtis',
        image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=700&q=80'
      }
    ],
    bannerImages: businessSettings?.bannerImages || [],
    aboutImage: businessSettings?.aboutImage || '',
  });

  useEffect(() => {
    if (businessSettings) {
      setSettingsForm((prev) => ({
        ...prev,
        ...businessSettings,
        aboutDescription: businessSettings.aboutDescription ?? prev.aboutDescription ?? '',
        announcementLeft: businessSettings.announcementLeft || 'Free Shipping on Orders Above ₹999 (Within India)',
        tagline: businessSettings.tagline || businessSettings.announcementCenter || 'Chaitu-Traders – Premium Fashion for Everyone',
        whatsappUrl: businessSettings.whatsappUrl || '',
        instagramUrl: businessSettings.instagramUrl || businessSettings?.instagram || '',
        youtubeUrl: businessSettings.youtubeUrl || businessSettings?.youtube || '',
        promoBanners: businessSettings.promoBanners || prev.promoBanners,
      }));
    }
  }, [businessSettings]);

  useEffect(() => {
    if (editingProduct) {
      setProductForm({
        ...emptyForm,
        ...editingProduct,
        specs: { ...emptyForm.specs, ...(editingProduct.specs || {}) }
      });
    } else {
      setProductForm({ ...emptyForm, sku: `AT-SAR-${String(products.length + 1).padStart(3, '0')}` });
    }
  }, [editingProduct, products.length]);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!supabase) {
      showToast('Supabase client not connected. Check .env', 'error');
      return;
    }

    try {
      showToast('Uploading image to Supabase cloud...');
      const fileExt = file.name.split('.').pop();
      const fileName = `aswini-${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(fileName, file, { cacheControl: '3600', upsert: false });

      if (uploadError) {
        console.error('Supabase Storage Upload Error:', uploadError.message);
        showToast(`Upload failed: ${uploadError.message}`, 'error');
        return;
      }

      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName);

      const publicUrl = data.publicUrl;
      setProductForm((prev) => ({
        ...prev,
        images: [...(prev.images || []), publicUrl]
      }));

      showToast('Image successfully uploaded & added to gallery!');
    } catch (err) {
      console.error('Unexpected error during file upload:', err);
      showToast('Error uploading image file.', 'error');
    }
  };

  const handleAddImageUrl = () => {
    if (!imageUrlInput.trim()) return;
    setProductForm((prev) => ({ ...prev, images: [...(prev.images || []), imageUrlInput.trim()] }));
    setImageUrlInput('');
  };

  const filteredAdminProducts = useMemo(() => {
    return products.filter((p) => {
      if (adminCatFilter !== 'All' && p.category !== adminCatFilter) return false;
      if (adminSearch.trim()) {
        const q = adminSearch.toLowerCase();
        return p.name?.toLowerCase().includes(q) || (p.sku || p.id)?.toLowerCase().includes(q);
      }
      return true;
    });
  }, [products, adminCatFilter, adminSearch]);

  const totalProducts = products.length;
  const availableCount = products.filter((p) => p.inStock).length;
  const outOfStockCount = products.filter((p) => !p.inStock).length;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row w-full">
      {/* RESPONSIVE SIDEBAR (Compact Top Nav + Scrollable Tabs on Mobile/Tablet, Full Sidebar on Desktop) */}
      <aside className="w-full lg:w-64 lg:min-h-screen lg:sticky lg:top-0 bg-gradient-to-b from-[#4E081B] to-[#380512] text-[#FAF6F0] flex flex-col justify-between shrink-0 border-b lg:border-b-0 lg:border-r border-[#C5A15B]/30 z-30">
        <div>
          <div className="px-4 py-3.5 sm:p-5 border-b border-[#C5A15B]/25 flex items-center justify-between gap-2">
            <BrandLogo
              onClick={onViewStore}
              size="compact"
              light
              brandName={businessSettings?.brandName}
              brandSubtitle={businessSettings?.brandSubtitle}
              brandInitial={businessSettings?.brandInitial}
            />

            {/* Quick Storefront & Logout buttons visible on Mobile/Tablet header */}
            <div className="flex lg:hidden items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={onViewStore}
                title="View Live Storefront"
                className="px-2.5 py-2 rounded-lg text-xs font-semibold bg-[#FAF6F0]/10 hover:bg-[#FAF6F0]/20 text-[#E6D3A7] inline-flex items-center gap-1.5 cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">Storefront</span>
              </button>
              <button
                type="button"
                onClick={onLogout}
                title="Logout"
                className="px-2.5 py-2 rounded-lg text-xs font-medium text-red-200 bg-red-950/30 hover:bg-red-950/60 inline-flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>

          <nav className="p-2 sm:p-3 flex lg:flex-col gap-1.5 overflow-x-auto">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'products', label: 'Products', icon: Package },
              { id: 'add-product', label: editingProduct ? 'Edit Product' : 'Add Product', icon: FolderPlus },
              { id: 'categories', label: 'Categories', icon: Tags },
              { id: 'settings', label: 'Business Settings', icon: Settings }
            ].map((item) => {
              const active = adminTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    if (item.id === 'add-product' && adminTab !== 'add-product') setEditingProduct(null);
                    setAdminTab(item.id);
                  }}
                  className={`flex items-center gap-2 sm:gap-3 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 lg:w-full transition-all cursor-pointer ${
                    active ? 'bg-[#7A122D] text-white border border-[#C5A15B]/60 shadow-sm' : 'text-[#FAF6F0]/80 hover:bg-[#650D24]/60 hover:text-white'
                  }`}
                >
                  <item.icon className="w-4 h-4 text-[#E6D3A7] shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Desktop Sidebar Footer Buttons */}
        <div className="hidden lg:block p-3 border-t border-[#C5A15B]/25 space-y-2">
          <button type="button" onClick={onViewStore} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#FAF6F0]/10 hover:bg-[#FAF6F0]/20 text-[#E6D3A7] cursor-pointer">
            <ExternalLink className="w-4 h-4 shrink-0" /><span>View Live Storefront</span>
          </button>
          <button type="button" onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium text-red-200 hover:bg-red-950/50 cursor-pointer">
            <LogOut className="w-4 h-4 shrink-0" /><span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-[#FAF6F0] border-b border-[#E5D9C8] px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between">
          <h1 className="font-serif text-lg sm:text-2xl font-bold text-[#650D24] break-words" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            {adminTab === 'dashboard' && 'Dashboard'}
            {adminTab === 'products' && 'Product Management'}
            {adminTab === 'add-product' && (editingProduct ? `Edit Product (${editingProduct.sku})` : 'Add New Product')}
            {adminTab === 'categories' && 'Category Management'}
            {adminTab === 'settings' && 'Business Contact & Store Settings'}
          </h1>
        </header>

        <div className="p-3.5 sm:p-6 max-w-6xl w-full mx-auto space-y-5 sm:space-y-6">
          {adminTab === 'dashboard' && (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-[#FAF6F0] rounded-2xl border border-[#E5D9C8] p-3.5 sm:p-5 shadow-2xs">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-xs font-semibold text-[#6E5A4F]"><Package className="w-4 h-4 text-[#650D24] shrink-0" /><span className="truncate">Total Products</span></div>
                  <p className="mt-1.5 sm:mt-2 font-serif text-2xl sm:text-3xl font-bold text-[#2D181C]">{totalProducts}</p>
                </div>
                <div className="bg-[#FAF6F0] rounded-2xl border border-[#E5D9C8] p-3.5 sm:p-5 shadow-2xs">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-xs font-semibold text-[#1E7E34]"><CheckCircle2 className="w-4 h-4 text-[#1E7E34] shrink-0" /><span className="truncate">Available</span></div>
                  <p className="mt-1.5 sm:mt-2 font-serif text-2xl sm:text-3xl font-bold text-[#2D181C]">{availableCount}</p>
                </div>
                <div className="bg-[#FAF6F0] rounded-2xl border border-[#E5D9C8] p-3.5 sm:p-5 shadow-2xs">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-xs font-semibold text-red-700"><AlertCircle className="w-4 h-4 text-red-600 shrink-0" /><span className="truncate">Out of Stock</span></div>
                  <p className="mt-1.5 sm:mt-2 font-serif text-2xl sm:text-3xl font-bold text-[#2D181C]">{outOfStockCount}</p>
                </div>
                <div className="bg-[#FAF6F0] rounded-2xl border border-[#E5D9C8] p-3.5 sm:p-5 shadow-2xs">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-xs font-semibold text-[#6E5A4F]"><Tags className="w-4 h-4 text-[#C5A15B] shrink-0" /><span className="truncate">Categories</span></div>
                  <p className="mt-1.5 sm:mt-2 font-serif text-2xl sm:text-3xl font-bold text-[#2D181C]">{categories.length}</p>
                </div>
              </div>

              <div className="bg-[#FAF6F0] rounded-2xl border border-[#E5D9C8] p-4 sm:p-5 space-y-4 shadow-2xs">
                <div className="flex flex-wrap items-center justify-between gap-2.5">
                  <h2 className="font-serif text-base sm:text-lg font-bold text-[#2D181C]">Recent Products</h2>
                  <button type="button" onClick={() => { setEditingProduct(null); setAdminTab('add-product'); }} className="px-3.5 sm:px-4 py-2 rounded-xl bg-[#650D24] hover:bg-[#4E081B] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer">
                    <Plus className="w-4 h-4 shrink-0" /><span>Add New Product</span>
                  </button>
                </div>

                {/* Mobile Card List (< 640px) */}
                <div className="sm:hidden divide-y divide-[#E5D9C8]">
                  {products.slice(0, 8).map((prod) => (
                    <div key={prod.id} className="py-3 flex items-start gap-3">
                      <img src={prod.images?.[0]} alt={prod.name} className="w-14 h-16 rounded-lg object-contain bg-[#F6EFE5] border border-[#DECBB4] shrink-0" />
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <span className="font-semibold text-sm text-[#2D181C] block truncate">{prod.name}</span>
                            <span className="text-[11px] text-[#8C7A6B] block">{prod.sku} • {prod.category}</span>
                          </div>
                          <span className="font-bold text-sm text-[#650D24] shrink-0">₹{Number(prod.price).toLocaleString('en-IN')}</span>
                        </div>
                        <div className="pt-1.5 flex items-center justify-between gap-2">
                          <button type="button" onClick={() => onToggleStock(prod.id)} className={`px-2.5 py-1 rounded-md text-[11px] font-semibold inline-flex items-center gap-1 cursor-pointer ${prod.inStock ? 'bg-[#E6F4EA] text-[#1E7E34] border border-[#B7E1CD]' : 'bg-red-100 text-red-700 border border-red-200'}`}>
                            <Check className="w-3 h-3" /><span>{prod.inStock ? 'In Stock' : 'Out of Stock'}</span>
                          </button>
                          <div className="inline-flex items-center gap-1.5">
                            <button type="button" onClick={() => { setEditingProduct(prod); setAdminTab('add-product'); }} className="p-2 rounded-lg bg-[#EFE5D8] text-[#650D24] cursor-pointer" title="Edit"><Edit3 className="w-3.5 h-3.5" /></button>
                            <button type="button" onClick={() => onDeleteProduct(prod.id)} className="p-2 rounded-lg bg-red-50 text-red-600 cursor-pointer" title="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tablet & Desktop Table (>= 640px) */}
                <div className="hidden sm:block overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-[#E5D9C8] text-[#6E5A4F] font-semibold">
                        <th className="py-3 px-2">Image</th>
                        <th className="py-3 px-2">Product Name</th>
                        <th className="py-3 px-2">Category</th>
                        <th className="py-3 px-2">Price</th>
                        <th className="py-3 px-2">Status</th>
                        <th className="py-3 px-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5D9C8]">
                      {products.slice(0, 8).map((prod) => (
                        <tr key={prod.id} className="hover:bg-[#F6EFE5]/70">
                          <td className="py-2.5 px-2"><img src={prod.images?.[0]} alt={prod.name} className="w-12 h-14 rounded-lg object-contain bg-[#F6EFE5] border border-[#DECBB4]" /></td>
                          <td className="py-2.5 px-2"><span className="font-semibold text-[#2D181C] block">{prod.name}</span><span className="text-[11px] text-[#8C7A6B]">{prod.sku}</span></td>
                          <td className="py-2.5 px-2">{prod.category}</td>
                          <td className="py-2.5 px-2 font-bold text-[#650D24] whitespace-nowrap">₹{Number(prod.price).toLocaleString('en-IN')}</td>
                          <td className="py-2.5 px-2">
                            <button type="button" onClick={() => onToggleStock(prod.id)} className={`px-2.5 py-1 rounded-md text-xs font-semibold inline-flex items-center gap-1 whitespace-nowrap cursor-pointer ${prod.inStock ? 'bg-[#E6F4EA] text-[#1E7E34] border border-[#B7E1CD]' : 'bg-red-100 text-red-700 border border-red-200'}`}>
                              <Check className="w-3 h-3" /><span>{prod.inStock ? 'In Stock' : 'Out of Stock'}</span>
                            </button>
                          </td>
                          <td className="py-2.5 px-2 text-right">
                            <div className="inline-flex items-center gap-2">
                              <button type="button" onClick={() => { setEditingProduct(prod); setAdminTab('add-product'); }} className="p-1.5 rounded-lg bg-[#EFE5D8] text-[#650D24] cursor-pointer"><Edit3 className="w-3.5 h-3.5" /></button>
                              <button type="button" onClick={() => onDeleteProduct(prod.id)} className="p-1.5 rounded-lg bg-red-50 text-red-600 cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {adminTab === 'products' && (
            <div className="bg-[#FAF6F0] rounded-2xl border border-[#E5D9C8] p-4 sm:p-5 space-y-4 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-between gap-3">
                <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
                  <div className="relative flex-1 sm:max-w-xs min-w-0">
                    <input type="text" value={adminSearch} onChange={(e) => setAdminSearch(e.target.value)} placeholder="Search inventory..." className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#DECBB4] bg-white text-xs sm:text-sm focus:outline-none focus:border-[#650D24]" />
                    <Search className="w-4 h-4 text-[#8C7A6B] absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                  <div className="w-full xs:w-48 sm:w-52 min-w-0">
                    <ResponsiveSelect
                      value={adminCatFilter}
                      onChange={(e) => setAdminCatFilter(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#DECBB4] bg-white text-xs sm:text-sm focus:outline-none focus:border-[#650D24]"
                    >
                      <option value="All">All Categories</option>
                      {categories.map((c) => (<option key={c.id} value={c.name}>{c.name}</option>))}
                    </ResponsiveSelect>
                  </div>
                </div>
                <button type="button" onClick={() => { setEditingProduct(null); setAdminTab('add-product'); }} className="px-4 py-2.5 rounded-xl bg-[#650D24] hover:bg-[#4E081B] text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer">
                  <Plus className="w-4 h-4 shrink-0" /><span>Add New Product</span>
                </button>
              </div>

              {/* Mobile Card List (< 640px) */}
              <div className="sm:hidden divide-y divide-[#E5D9C8]">
                {filteredAdminProducts.map((prod) => (
                  <div key={prod.id} className="py-3 flex items-start gap-3">
                    <img src={prod.images?.[0]} alt={prod.name} className="w-14 h-16 rounded-lg object-contain bg-[#F6EFE5] border border-[#DECBB4] shrink-0" />
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <span className="font-semibold text-sm text-[#2D181C] block truncate">{prod.name}</span>
                          <span className="text-[11px] text-[#8C7A6B] block">{prod.sku} • {prod.category}</span>
                        </div>
                        <span className="font-bold text-sm text-[#650D24] shrink-0">₹{Number(prod.price).toLocaleString('en-IN')}</span>
                      </div>
                      <div className="pt-1.5 flex items-center justify-between gap-2">
                        <button type="button" onClick={() => onToggleStock(prod.id)} className={`px-2.5 py-1 rounded-md text-[11px] font-semibold cursor-pointer ${prod.inStock ? 'bg-[#E6F4EA] text-[#1E7E34] border border-[#B7E1CD]' : 'bg-red-100 text-red-700 border border-red-200'}`}>
                          {prod.inStock ? 'In Stock' : 'Out of Stock'}
                        </button>
                        <div className="inline-flex items-center gap-1.5">
                          <button type="button" onClick={() => { setEditingProduct(prod); setAdminTab('add-product'); }} className="p-2 rounded-lg bg-[#EFE5D8] text-[#650D24] cursor-pointer" title="Edit"><Edit3 className="w-4 h-4" /></button>
                          <button type="button" onClick={() => onDeleteProduct(prod.id)} className="p-2 rounded-lg bg-red-50 text-red-600 cursor-pointer" title="Delete"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tablet & Desktop Table (>= 640px) */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-[#E5D9C8] text-[#6E5A4F] font-semibold">
                      <th className="py-3 px-2">Image</th>
                      <th className="py-3 px-2">Product Name &amp; ID</th>
                      <th className="py-3 px-2">Category</th>
                      <th className="py-3 px-2">Price</th>
                      <th className="py-3 px-2">Availability</th>
                      <th className="py-3 px-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5D9C8]">
                    {filteredAdminProducts.map((prod) => (
                      <tr key={prod.id} className="hover:bg-[#F6EFE5]/70">
                        <td className="py-2.5 px-2"><img src={prod.images?.[0]} alt={prod.name} className="w-12 h-14 rounded-lg object-contain bg-[#F6EFE5] border border-[#DECBB4]" /></td>
                        <td className="py-2.5 px-2"><span className="font-semibold text-[#2D181C] block">{prod.name}</span><span className="text-[11px] text-[#8C7A6B]">{prod.sku}</span></td>
                        <td className="py-2.5 px-2">{prod.category}</td>
                        <td className="py-2.5 px-2 font-bold text-[#650D24] whitespace-nowrap">₹{Number(prod.price).toLocaleString('en-IN')}</td>
                        <td className="py-2.5 px-2">
                          <button type="button" onClick={() => onToggleStock(prod.id)} className={`px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap cursor-pointer ${prod.inStock ? 'bg-[#E6F4EA] text-[#1E7E34] border border-[#B7E1CD]' : 'bg-red-100 text-red-700 border border-red-200'}`}>
                            {prod.inStock ? 'In Stock' : 'Out of Stock'}
                          </button>
                        </td>
                        <td className="py-2.5 px-2 text-right">
                          <div className="inline-flex items-center gap-2">
                            <button type="button" onClick={() => { setEditingProduct(prod); setAdminTab('add-product'); }} className="p-1.5 rounded-lg bg-[#EFE5D8] text-[#650D24] cursor-pointer"><Edit3 className="w-4 h-4" /></button>
                            <button type="button" onClick={() => onDeleteProduct(prod.id)} className="p-1.5 rounded-lg bg-red-50 text-red-600 cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {adminTab === 'add-product' && (
            <form onSubmit={(e) => { e.preventDefault(); onSaveProduct(productForm); }} className="bg-[#FAF6F0] rounded-2xl border border-[#E5D9C8] p-4 sm:p-6 shadow-2xs">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                <div className="lg:col-span-7 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-[#2D181C] mb-1">Product Name *</label>
                      <input type="text" required value={productForm.name} onChange={(e) => setProductForm({ ...productForm, name: e.target.value })} placeholder="e.g., Premium Cotton Saree" className="w-full px-3.5 py-2.5 rounded-xl border border-[#DECBB4] bg-white text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#2D181C] mb-1">Product ID / SKU</label>
                      <input type="text" value={productForm.sku} onChange={(e) => setProductForm({ ...productForm, sku: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl border border-[#DECBB4] bg-white text-sm" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="min-w-0">
                      <label className="block text-xs font-semibold text-[#2D181C] mb-1">Category *</label>
                      <ResponsiveSelect
                        value={productForm.category}
                        onChange={(e) => setProductForm({ ...productForm, category: e.target.value, parentCategory: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#DECBB4] bg-white text-sm"
                      >
                        {categories.map((c) => (<option key={c.id} value={c.name}>{c.name}</option>))}
                      </ResponsiveSelect>
                    </div>
                    <div className="min-w-0">
                      <label className="block text-xs font-semibold text-[#2D181C] mb-1">Highlight Badge</label>
                      <ResponsiveSelect
                        value={productForm.badge || ''}
                        onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#DECBB4] bg-white text-sm"
                      >
                        <option value="">None</option>
                        <option value="New">New</option>
                        <option value="Trending">Trending</option>
                        <option value="Bestseller">Bestseller</option>
                      </ResponsiveSelect>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#2D181C] mb-1">Price (₹) *</label>
                      <input type="number" required value={productForm.price} onChange={(e) => setProductForm({ ...productForm, price: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl border border-[#DECBB4] bg-white text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#2D181C] mb-1">Original Price (₹)</label>
                      <input type="number" value={productForm.originalPrice || ''} onChange={(e) => setProductForm({ ...productForm, originalPrice: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl border border-[#DECBB4] bg-white text-sm" />
                    </div>
                    <div className="min-w-0">
                      <label className="block text-xs font-semibold text-[#2D181C] mb-1">Availability</label>
                      <ResponsiveSelect
                        value={productForm.inStock ? 'in' : 'out'}
                        onChange={(e) => setProductForm({ ...productForm, inStock: e.target.value === 'in' })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#DECBB4] bg-white text-sm"
                      >
                        <option value="in">In Stock</option>
                        <option value="out">Out of Stock</option>
                      </ResponsiveSelect>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2D181C] mb-1.5">Product Images *</label>
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#C5A15B] rounded-2xl bg-[#F6EFE5]/70 hover:bg-[#EFE5D8]/60 p-4 sm:p-5 cursor-pointer text-center">
                      <Upload className="w-6 h-6 sm:w-7 sm:h-7 text-[#650D24] mb-1.5" />
                      <span className="text-xs sm:text-sm font-semibold text-[#650D24]">Click to upload product image</span>
                      <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                    </label>

                    <div className="mt-2.5 flex flex-col xs:flex-row gap-2">
                      <input type="url" value={imageUrlInput} onChange={(e) => setImageUrlInput(e.target.value)} placeholder="Or paste direct image URL (https://...)" className="flex-1 px-3 py-2 rounded-xl border border-[#DECBB4] bg-white text-xs min-w-0" />
                      <button type="button" onClick={handleAddImageUrl} className="px-4 py-2 rounded-xl bg-[#EFE5D8] hover:bg-[#DECBB4] text-[#650D24] text-xs font-semibold shrink-0 cursor-pointer">Add URL</button>
                    </div>

                    {productForm.images && productForm.images.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2.5">
                        {productForm.images.map((img, i) => (
                          <div key={i} className="relative w-20 h-24 rounded-xl overflow-hidden border border-[#DECBB4] bg-[#F6EFE5] flex items-center justify-center">
                            <img src={img} alt="Preview" className="w-full h-full object-contain" />
                            <button type="button" onClick={() => setProductForm((prev) => ({ ...prev, images: prev.images.filter((_, idx) => idx !== i) }))} className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px] cursor-pointer">×</button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-4">
                  <div className="bg-[#F6EFE5] rounded-2xl border border-[#E5D9C8] p-4 space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#650D24]">Additional Details</h3>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#4A353B] mb-1">Fabric</label>
                      <input type="text" value={productForm.specs.fabric} onChange={(e) => setProductForm({ ...productForm, specs: { ...productForm.specs, fabric: e.target.value } })} className="w-full px-3 py-2 rounded-lg border border-[#DECBB4] bg-white text-xs" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#4A353B] mb-1">Length</label>
                      <input type="text" value={productForm.specs.length} onChange={(e) => setProductForm({ ...productForm, specs: { ...productForm.specs, length: e.target.value } })} className="w-full px-3 py-2 rounded-lg border border-[#DECBB4] bg-white text-xs" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#4A353B] mb-1">Work</label>
                      <input type="text" value={productForm.specs.work} onChange={(e) => setProductForm({ ...productForm, specs: { ...productForm.specs, work: e.target.value } })} className="w-full px-3 py-2 rounded-lg border border-[#DECBB4] bg-white text-xs" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#4A353B] mb-1">Description</label>
                      <textarea rows={4} value={productForm.description} onChange={(e) => setProductForm({ ...productForm, description: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-[#DECBB4] bg-white text-xs" />
                    </div>
                  </div>

                  <div className="flex flex-col-reverse xs:flex-row items-stretch xs:items-center justify-end gap-2.5 sm:gap-3 pt-2">
                    <button type="button" onClick={() => { setEditingProduct(null); setAdminTab('products'); }} className="px-5 py-2.5 rounded-xl border border-[#DECBB4] bg-white text-xs font-semibold text-[#4A353B] cursor-pointer">Cancel</button>
                    <button type="submit" className="px-6 py-2.5 rounded-xl bg-[#650D24] hover:bg-[#4E081B] text-white text-xs font-semibold shadow-sm cursor-pointer">Save Product</button>
                  </div>
                </div>
              </div>
            </form>
          )}

          {adminTab === 'categories' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
              <div className="lg:col-span-7 bg-[#FAF6F0] rounded-2xl border border-[#E5D9C8] p-4 sm:p-5 space-y-3">
                <h2 className="font-serif text-base sm:text-lg font-bold text-[#2D181C]">Active Categories ({categories.length})</h2>
                <div className="divide-y divide-[#E5D9C8]">
                  {categories.map((cat) => (
                    <div key={cat.id} className="py-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={cat.image || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'}
                          alt={cat.name}
                          className="w-12 h-14 sm:w-14 sm:h-16 rounded-xl object-contain bg-[#F6EFE5] border border-[#DECBB4] shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className="text-xs sm:text-sm font-bold text-[#2D181C] truncate">{cat.name}</h4>
                          <p className="text-[11px] sm:text-xs text-[#6E5A4F] line-clamp-1">{cat.subtitle}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            setNewCategoryName(cat.name);
                            setNewCategorySubtitle(cat.subtitle || '');
                            setNewCategoryImage(cat.image || '');
                            showToast(`Editing "${cat.name}". Update details on the right and click Save.`, 'info');
                          }}
                          className="p-2 rounded-lg bg-[#EFE5D8] hover:bg-[#DECBB4] text-[#650D24] transition-colors cursor-pointer"
                          title="Edit Category"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={async () => {
                            await onDeleteCategory(cat);
                            if (adminCatFilter === cat.name) {
                              setAdminCatFilter('All');
                            }
                          }}
                          className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                          title="Delete Category & Its Products"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#FAF6F0] rounded-2xl border border-[#E5D9C8] p-4 sm:p-5 space-y-4 h-fit">
                <h2 className="font-serif text-base sm:text-lg font-bold text-[#650D24]">Add / Edit Category</h2>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!newCategoryName.trim()) return;

                    const existingCat = categories.find(
                      (c) => c.name.toLowerCase() === newCategoryName.trim().toLowerCase()
                    );

                    const catId = existingCat
                      ? existingCat.id
                      : `cat-${newCategoryName.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

                    const dbRow = {
                      id: catId,
                      name: newCategoryName.trim(),
                      subtitle: newCategorySubtitle.trim() || 'Curated collection',
                      description: existingCat?.description || 'Explore our handpicked collection.',
                      image:
                        newCategoryImage.trim() ||
                        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
                    };

                    if (supabase) {
                      const { error } = await supabase.from('categories').upsert(dbRow);
                      if (error) {
                        console.error('Supabase category save error:', error);
                        showToast(`Database error: ${error.message}`, 'error');
                        return;
                      }
                    }

                    const uiCategory = { ...dbRow, slug: dbRow.name, featuredOnHome: true };

                    setCategories((prev) => {
                      const exists = prev.some((c) => c.id === catId);
                      if (exists) return prev.map((c) => (c.id === catId ? uiCategory : c));
                      return [...prev, uiCategory];
                    });

                    setNewCategoryName('');
                    setNewCategorySubtitle('');
                    setNewCategoryImage('');
                    showToast(`Category "${dbRow.name}" saved & synced to website!`);
                  }}
                  className="space-y-3"
                >
                  <div>
                    <label className="block text-xs font-semibold mb-1">Category Name *</label>
                    <input
                      type="text"
                      required
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      placeholder="e.g. Sarees, Shirts"
                      className="w-full px-3.5 py-2 rounded-xl border border-[#DECBB4] bg-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Subtitle</label>
                    <input
                      type="text"
                      value={newCategorySubtitle}
                      onChange={(e) => setNewCategorySubtitle(e.target.value)}
                      placeholder="Graceful drapes"
                      className="w-full px-3.5 py-2 rounded-xl border border-[#DECBB4] bg-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Category Cover Image</label>
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#C5A15B] rounded-xl bg-white hover:bg-[#F6EFE5] p-3 cursor-pointer text-center mb-2">
                      <Upload className="w-5 h-5 text-[#650D24] mb-1" />
                      <span className="text-[11px] font-semibold text-[#650D24]">Upload image from device</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (event) => {
                          const file = event.target.files?.[0];
                          if (!file || !supabase) return;
                          showToast('Uploading category cover image...');
                          const fileExt = file.name.split('.').pop();
                          const fileName = `cat-${Date.now()}.${fileExt}`;
                          const { error } = await supabase.storage.from('product-images').upload(fileName, file);
                          if (!error) {
                            const { data } = supabase.storage.from('product-images').getPublicUrl(fileName);
                            setNewCategoryImage(data.publicUrl);
                            showToast('Cover image uploaded! Click Save Category.');
                          } else {
                            showToast(`Upload failed: ${error.message}`, 'error');
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                    <input
                      type="url"
                      value={newCategoryImage}
                      onChange={(e) => setNewCategoryImage(e.target.value)}
                      placeholder="Or paste image URL"
                      className="w-full px-3.5 py-2 rounded-xl border border-[#DECBB4] bg-white text-xs"
                    />
                    {newCategoryImage && (
                      <div className="w-24 h-28 mt-2 rounded-xl overflow-hidden border border-[#DECBB4] bg-[#F6EFE5] flex items-center justify-center">
                        <img src={newCategoryImage} alt="Preview" className="w-full h-full object-contain" />
                      </div>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#650D24] hover:bg-[#4E081B] text-white text-xs font-semibold cursor-pointer"
                  >
                    Save Category
                  </button>
                </form>
              </div>
            </div>
          )}

          {adminTab === 'settings' && (
            <div className="space-y-6 sm:space-y-8 max-w-4xl">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#650D24]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Storefront &amp; WhatsApp Ordering Configuration</h2>

              {/* SECTION 1: Top Information Bar & Social Media Icons */}
              <div className="bg-[#FAF6F0] rounded-2xl border border-[#E5D9C8] p-4 sm:p-6 space-y-4">
                <h3 className="font-serif text-base font-bold text-[#650D24]">
                  1. Top Information Bar &amp; Social Media Icons
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Free Shipping Text (Top Bar Left)</label>
                    <input
                      type="text"
                      value={settingsForm.announcementLeft || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, announcementLeft: e.target.value })}
                      placeholder="Free Shipping on Orders Above ₹999 (Within India)"
                      className="w-full px-3.5 py-2 rounded-xl border border-[#DECBB4] bg-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Brand Tagline Announcement (Top Bar Center)</label>
                    <input
                      type="text"
                      value={settingsForm.tagline || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value, announcementCenter: e.target.value })}
                      placeholder="Chaitu-Traders – Premium Fashion for Everyone"
                      className="w-full px-3.5 py-2 rounded-xl border border-[#DECBB4] bg-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Top Bar WhatsApp Icon Link (URL)</label>
                    <input
                      type="url"
                      value={settingsForm.whatsappUrl || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, whatsappUrl: e.target.value })}
                      placeholder="https://wa.me/919346018273"
                      className="w-full px-3.5 py-2 rounded-xl border border-[#DECBB4] bg-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Top Bar Instagram Icon Link (URL)</label>
                    <input
                      type="url"
                      value={settingsForm.instagramUrl || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, instagramUrl: e.target.value, instagram: e.target.value })}
                      placeholder="https://instagram.com/yourpage"
                      className="w-full px-3.5 py-2 rounded-xl border border-[#DECBB4] bg-white text-sm"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold mb-1">Top Bar YouTube Icon Link (URL)</label>
                    <input
                      type="url"
                      value={settingsForm.youtubeUrl || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, youtubeUrl: e.target.value, youtube: e.target.value })}
                      placeholder="https://youtube.com/@yourchannel"
                      className="w-full px-3.5 py-2 rounded-xl border border-[#DECBB4] bg-white text-sm"
                    />
                  </div>
                </div>
                <div className="pt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={() => onSaveSettings(settingsForm)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#650D24] hover:bg-[#4E081B] text-white text-xs font-semibold shadow-sm cursor-pointer"
                  >
                    Save Top Bar &amp; Social Icons
                  </button>
                </div>
              </div>

              {/* SECTION 2: Global Brand Identity Settings */}
              <div className="bg-[#FAF6F0] rounded-2xl border border-[#E5D9C8] p-4 sm:p-6 space-y-4">
                <h3 className="font-serif text-base font-bold text-[#650D24]">
                  2. Global Brand Identity Settings
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Main Brand Name (e.g. ASWINI)</label>
                    <input
                      type="text"
                      value={settingsForm.brandName || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, brandName: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#DECBB4] bg-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Brand Subtitle (e.g. TRADERS)</label>
                    <input
                      type="text"
                      value={settingsForm.brandSubtitle || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, brandSubtitle: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#DECBB4] bg-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Circle Logo Initial Letter (e.g. A)</label>
                    <input
                      type="text"
                      maxLength={2}
                      value={settingsForm.brandInitial || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, brandInitial: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#DECBB4] bg-white text-sm"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold mb-1">Footer Description Bio</label>
                    <textarea
                      rows={3}
                      value={settingsForm.footerBio || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, footerBio: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#DECBB4] bg-white text-sm"
                    />
                  </div>
                </div>
                <div className="pt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={() => onSaveSettings(settingsForm)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#650D24] hover:bg-[#4E081B] text-white text-xs font-semibold shadow-sm cursor-pointer"
                  >
                    Save Brand Identity
                  </button>
                </div>
              </div>

              {/* SECTION 3: Contact & Ordering Details */}
              <div className="bg-[#FAF6F0] rounded-2xl border border-[#E5D9C8] p-4 sm:p-6 space-y-4">
                <h3 className="font-serif text-base font-bold text-[#650D24]">
                  3. Contact &amp; Ordering Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      WhatsApp Order Number (Used for Links &amp; Chat)
                    </label>
                    <input
                      type="text"
                      value={settingsForm.whatsapp || ''}
                      onChange={(e) => {
                        const digits = e.target.value.replace(/[^0-9]/g, '');
                        const formattedDisplay =
                          digits.length === 12 && digits.startsWith('91')
                            ? `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`
                            : digits
                            ? `+${digits}`
                            : '';
                        setSettingsForm({
                          ...settingsForm,
                          whatsapp: digits,
                          whatsappDisplay: formattedDisplay,
                          whatsappUrl: digits ? `https://wa.me/${digits}` : '',
                        });
                      }}
                      placeholder="e.g. 919346018273"
                      className="w-full px-3.5 py-2 rounded-xl border border-[#DECBB4] bg-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      Display WhatsApp Number (Shown to Customers)
                    </label>
                    <input
                      type="text"
                      value={settingsForm.whatsappDisplay || ''}
                      onChange={(e) => {
                        const displayVal = e.target.value;
                        const extractedDigits = displayVal.replace(/[^0-9]/g, '');
                        setSettingsForm({
                          ...settingsForm,
                          whatsappDisplay: displayVal,
                          whatsapp: extractedDigits,
                          whatsappUrl: extractedDigits ? `https://wa.me/${extractedDigits}` : '',
                        });
                      }}
                      placeholder="e.g. +91 93460 18273"
                      className="w-full px-3.5 py-2 rounded-xl border border-[#DECBB4] bg-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Support Phone Number</label>
                    <input
                      type="text"
                      value={settingsForm.phone || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#DECBB4] bg-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Business Email</label>
                    <input
                      type="email"
                      value={settingsForm.email || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#DECBB4] bg-white text-sm"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold mb-1">Showroom Address / Location</label>
                    <input
                      type="text"
                      value={settingsForm.location || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, location: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#DECBB4] bg-white text-sm"
                    />
                  </div>
                </div>
                <div className="pt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={() => onSaveSettings(settingsForm)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#650D24] hover:bg-[#4E081B] text-white text-xs font-semibold shadow-sm cursor-pointer"
                  >
                    Save Contact Details
                  </button>
                </div>
              </div>

              {/* SECTION 4: Homepage Hero Slideshow */}
              <div className="bg-[#FAF6F0] rounded-2xl border border-[#E5D9C8] p-4 sm:p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-serif text-base font-bold text-[#650D24]">
                    4. Homepage Hero Slideshow ({(settingsForm.heroSlides || []).length} Slides)
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      const newSlide = {
                        id: Date.now(),
                        eyebrow: 'NEW COLLECTION • ASWINI TRADERS',
                        title: 'FESTIVE ELEGANCE',
                        subtitle: 'Handpicked Drapes & Silhouettes Crafted for You',
                        ctaText: 'Explore Collection',
                        targetCategory: 'All',
                        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1400&q=85'
                      };
                      setSettingsForm((prev) => ({
                        ...prev,
                        heroSlides: [...(prev.heroSlides || []), newSlide]
                      }));
                      showToast('New slide added! Customize and click Save Slideshow below.');
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-[#650D24] hover:bg-[#4E081B] text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add Slide</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {(settingsForm.heroSlides || []).map((slide, idx) => {
                    const updateSlide = (field, value) => {
                      const updated = [...(settingsForm.heroSlides || [])];
                      updated[idx] = { ...updated[idx], [field]: value };
                      setSettingsForm((prev) => ({ ...prev, heroSlides: updated }));
                    };

                    return (
                      <div key={slide.id || idx} className="p-3.5 sm:p-4 rounded-xl bg-[#F6EFE5] border border-[#DECBB4] space-y-3">
                        <div className="flex items-center justify-between gap-2 border-b border-[#DECBB4]/70 pb-2">
                          <span className="font-bold text-xs text-[#650D24] truncate">Slide #{idx + 1} — {slide.title || 'Untitled'}</span>
                          {(settingsForm.heroSlides || []).length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                const updated = (settingsForm.heroSlides || []).filter((_, i) => i !== idx);
                                setSettingsForm((prev) => ({ ...prev, heroSlides: updated }));
                                showToast(`Slide #${idx + 1} removed`, 'info');
                              }}
                              className="px-2 py-0.5 rounded bg-red-100 text-red-700 text-[11px] font-semibold flex items-center gap-1 shrink-0 cursor-pointer"
                            >
                              <Trash2 className="w-3 h-3" /><span>Delete</span>
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start">
                          <div className="md:col-span-4 space-y-2">
                            <div className="aspect-[16/10] w-full rounded-lg overflow-hidden border border-[#DECBB4] bg-[#EFE5D8] flex items-center justify-center">
                              {slide.image ? (
                                <img src={slide.image} alt="Slide" className="w-full h-full object-contain" />
                              ) : (
                                <div className="flex items-center justify-center h-full text-xs">No Image</div>
                              )}
                            </div>
                            <label className="flex items-center justify-center border border-[#C5A15B] rounded-lg bg-white hover:bg-[#FAF6F0] py-1.5 px-2 cursor-pointer text-center">
                              <span className="text-[11px] font-semibold text-[#650D24]">📁 Upload Photo</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={async (event) => {
                                  const file = event.target.files?.[0];
                                  if (!file || !supabase) return;
                                  showToast(`Uploading Slide #${idx + 1}...`);
                                  const fileExt = file.name.split('.').pop();
                                  const fileName = `slide-${idx + 1}-${Date.now()}.${fileExt}`;
                                  const { error } = await supabase.storage.from('product-images').upload(fileName, file);
                                  if (!error) {
                                    const { data } = supabase.storage.from('product-images').getPublicUrl(fileName);
                                    updateSlide('image', data.publicUrl);
                                    showToast(`Slide #${idx + 1} uploaded!`);
                                  }
                                }}
                                className="hidden"
                              />
                            </label>
                            <input type="url" value={slide.image || ''} onChange={(e) => updateSlide('image', e.target.value)} placeholder="Or paste image URL" className="w-full px-2.5 py-1.5 rounded border bg-white text-xs" />
                          </div>

                          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            <div className="sm:col-span-2">
                              <label className="block text-[11px] font-semibold mb-1">Eyebrow Tagline</label>
                              <input type="text" value={slide.eyebrow || ''} onChange={(e) => updateSlide('eyebrow', e.target.value)} className="w-full px-2.5 py-1.5 rounded border bg-white text-xs font-semibold" />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-[11px] font-semibold mb-1">Main Title</label>
                              <input type="text" value={slide.title || ''} onChange={(e) => updateSlide('title', e.target.value)} className="w-full px-2.5 py-1.5 rounded border bg-white text-sm font-bold text-[#650D24]" />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-[11px] font-semibold mb-1">Subtitle</label>
                              <input type="text" value={slide.subtitle || ''} onChange={(e) => updateSlide('subtitle', e.target.value)} className="w-full px-2.5 py-1.5 rounded border bg-white text-xs" />
                            </div>
                            <div>
                              <label className="block text-[11px] font-semibold mb-1">Button Text</label>
                              <input type="text" value={slide.ctaText || ''} onChange={(e) => updateSlide('ctaText', e.target.value)} className="w-full px-2.5 py-1.5 rounded border bg-white text-xs" />
                            </div>
                            <div className="min-w-0">
                              <label className="block text-[11px] font-semibold mb-1">Destination Category</label>
                              <ResponsiveSelect
                                value={slide.targetCategory || 'All'}
                                onChange={(e) => updateSlide('targetCategory', e.target.value)}
                                className="w-full px-2.5 py-1.5 rounded border border-[#DECBB4] bg-white text-xs"
                              >
                                <option value="All">All Products</option>
                                {categories.map((c) => (<option key={c.id} value={c.name}>{c.name}</option>))}
                              </ResponsiveSelect>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={() => onSaveSettings(settingsForm)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#650D24] hover:bg-[#4E081B] text-white text-xs font-semibold shadow-sm cursor-pointer"
                  >
                    Save Hero Slideshow
                  </button>
                </div>
              </div>

              {/* SECTION 5: About Us Page Showroom Image & Description */}
              <div className="bg-[#FAF6F0] rounded-2xl border border-[#E5D9C8] p-4 sm:p-6 space-y-4">
                <h3 className="font-serif text-base font-bold text-[#650D24]">
                  5. About Us Page Showroom Image &amp; Story
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold mb-1">About Us Page Description</label>
                    <textarea
                      rows={4}
                      value={settingsForm.aboutDescription || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, aboutDescription: e.target.value })}
                      placeholder="Write your store's background story here..."
                      className="w-full px-3.5 py-2 rounded-xl border border-[#DECBB4] bg-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1">About Us Showroom Image</label>
                    <div className="flex items-center gap-2 mb-2">
                      <label className="flex-1 flex items-center justify-center border border-[#C5A15B] rounded-xl bg-white hover:bg-[#FAF6F0] py-2 px-3 cursor-pointer text-center">
                        <span className="text-xs font-semibold text-[#650D24]">📁 Upload from Device</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={async (event) => {
                            const file = event.target.files?.[0];
                            if (!file || !supabase) return;
                            showToast('Uploading About image...');
                            const fileExt = file.name.split('.').pop();
                            const fileName = `about-${Date.now()}.${fileExt}`;
                            const { error } = await supabase.storage.from('product-images').upload(fileName, file);
                            if (!error) {
                              const { data } = supabase.storage.from('product-images').getPublicUrl(fileName);
                              setSettingsForm((prev) => ({ ...prev, aboutImage: data.publicUrl }));
                              showToast('About image uploaded successfully!');
                            }
                          }}
                          className="hidden"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => setSettingsForm((prev) => ({ ...prev, aboutImage: '' }))}
                        className="px-3 py-2 rounded-xl bg-red-50 text-red-600 text-xs font-semibold cursor-pointer"
                      >
                        Clear
                      </button>
                    </div>
                    <input
                      type="url"
                      value={settingsForm.aboutImage || ''}
                      onChange={(e) => setSettingsForm((prev) => ({ ...prev, aboutImage: e.target.value }))}
                      placeholder="Or paste image URL"
                      className="w-full px-3.5 py-1.5 rounded-xl border border-[#DECBB4] bg-white text-xs"
                    />
                    {settingsForm.aboutImage && (
                      <div className="w-32 h-28 rounded-xl overflow-hidden border border-[#DECBB4] bg-[#F6EFE5] flex items-center justify-center mt-2">
                        <img src={settingsForm.aboutImage} alt="About Preview" className="w-full h-full object-contain" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={() => onSaveSettings(settingsForm)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#650D24] hover:bg-[#4E081B] text-white text-xs font-semibold shadow-sm cursor-pointer"
                  >
                    Save About Us Settings
                  </button>
                </div>
              </div>

              {/* SECTION 6: Homepage Promotional Banners (Above Footer) */}
              <div className="bg-[#FAF6F0] rounded-2xl border border-[#E5D9C8] p-4 sm:p-6 space-y-4">
                <h3 className="font-serif text-base font-bold text-[#650D24]">
                  6. Homepage Promotional Banners (Above Footer)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(settingsForm.promoBanners || []).map((banner, idx) => {
                    const updateBanner = (field, val) => {
                      const updated = [...settingsForm.promoBanners];
                      updated[idx] = { ...updated[idx], [field]: val };
                      setSettingsForm({ ...settingsForm, promoBanners: updated });
                    };

                    return (
                      <div key={idx} className="p-3.5 sm:p-4 rounded-xl bg-[#F6EFE5] border border-[#DECBB4] space-y-3">
                        <span className="font-bold text-xs text-[#650D24]">Banner #{idx + 1}</span>
                        <div>
                          <label className="block text-[11px] font-semibold mb-1">Eyebrow Tagline</label>
                          <input type="text" value={banner.eyebrow || ''} onChange={(e) => updateBanner('eyebrow', e.target.value)} className="w-full px-3 py-1.5 rounded-lg border bg-white text-xs" />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold mb-1">Main Title</label>
                          <input type="text" value={banner.title || ''} onChange={(e) => updateBanner('title', e.target.value)} className="w-full px-3 py-1.5 rounded-lg border bg-white text-xs font-bold" />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold mb-1">Subtitle</label>
                          <input type="text" value={banner.subtitle || ''} onChange={(e) => updateBanner('subtitle', e.target.value)} className="w-full px-3 py-1.5 rounded-lg border bg-white text-xs" />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold mb-1">Button Text</label>
                          <input type="text" value={banner.buttonText || 'Shop Now'} onChange={(e) => updateBanner('buttonText', e.target.value)} className="w-full px-3.5 py-1.5 rounded-lg border bg-white text-xs" />
                        </div>
                        <div className="min-w-0">
                          <label className="block text-[11px] font-semibold mb-1">Target Category (Redirect Destination)</label>
                          <ResponsiveSelect
                            value={banner.targetCategory || 'All'}
                            onChange={(e) => updateBanner('targetCategory', e.target.value)}
                            className="w-full px-3.5 py-1.5 rounded-lg border border-[#DECBB4] bg-white text-xs font-medium text-[#2D181C]"
                          >
                            <option value="All">All Products Catalogue</option>
                            {categories.map((c) => (<option key={c.id} value={c.name}>{c.name}</option>))}
                          </ResponsiveSelect>
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold mb-1">Banner Image</label>
                          <label className="flex items-center justify-center border border-[#C5A15B] rounded-xl bg-white hover:bg-[#FAF6F0] py-1.5 px-3 cursor-pointer text-center mb-1.5">
                            <span className="text-xs font-semibold text-[#650D24]">📁 Upload Photo from Device</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={async (event) => {
                                const file = event.target.files?.[0];
                                if (!file || !supabase) return;
                                showToast(`Uploading Banner #${idx + 1}...`);
                                const fileExt = file.name.split('.').pop();
                                const fileName = `promo-banner-${idx + 1}-${Date.now()}.${fileExt}`;
                                const { error } = await supabase.storage.from('product-images').upload(fileName, file);
                                if (!error) {
                                  const { data } = supabase.storage.from('product-images').getPublicUrl(fileName);
                                  updateBanner('image', data.publicUrl);
                                  showToast(`Banner #${idx + 1} uploaded!`);
                                }
                              }}
                              className="hidden"
                            />
                          </label>
                          <input type="url" value={banner.image || ''} onChange={(e) => updateBanner('image', e.target.value)} placeholder="Or paste image URL" className="w-full px-3.5 py-1.5 rounded-lg border bg-white text-xs" />
                          {banner.image && (
                            <div className="w-28 h-24 rounded-xl overflow-hidden border border-[#DECBB4] bg-[#EFE5D8] flex items-center justify-center mt-2">
                              <img src={banner.image} alt="Preview" className="w-full h-full object-contain" />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="pt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={() => onSaveSettings(settingsForm)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#650D24] hover:bg-[#4E081B] text-white text-xs font-semibold shadow-sm cursor-pointer"
                  >
                    Save Promotional Banners
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}