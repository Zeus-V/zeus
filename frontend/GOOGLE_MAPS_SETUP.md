# Google Maps Integration Documentation

## Overview
This document explains how to set up and customize the Google Maps integration for the BIM Talent Hub platform.

## Component Location
- **File:** `/app/frontend/src/components/GoogleMapsCard.js`
- **Usage:** Homepage (Home.js) and Company Detail pages

## Features
✅ Interactive Google Maps embed  
✅ Multiple location markers across Thailand  
✅ Clickable location cards with contact details  
✅ Responsive design (desktop & mobile)  
✅ Error handling and fallback UI  
✅ Glassmorphism styling  
✅ Accessibility support  

---

## Setup Instructions

### 1. Obtaining Google Maps API Key

**Free Tier (No Credit Card Required):**
1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable **Maps Embed API** (FREE - no credit card needed)
4. Go to "Credentials" → "Create Credentials" → "API Key"
5. Copy your API key (format: `AIzaSy...`)

**API Restrictions (Recommended):**
- Under "API Restrictions" → Select "Restrict key"
- Choose "Maps Embed API" only
- Under "Application restrictions" → Add your website domain

### 2. Current Implementation

**Current Status:** Using Google Maps Embed API (FREE tier)
- No API key required for basic embed
- Works with static iframe embed
- Displays multiple locations centered on Thailand

**Embed URL Structure:**
```javascript
https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d[scale]!2d[lng]!3d[lat]...
```

### 3. Upgrading to JavaScript API (Optional)

For advanced features (custom markers, info windows, clustering):

**Install Google Maps React:**
```bash
cd /app/frontend
yarn add @googlemaps/react-wrapper
```

**Add API Key to .env:**
```env
REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key_here
```

**Load in public/index.html:**
```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"></script>
```

---

## Adding/Updating Locations

### Location Object Structure
```javascript
{
  id: 1,                              // Unique identifier
  name: 'BIM Talent Hub - Bangkok HQ', // Office name
  address: '123 Sukhumvit Road',      // Street address
  city: 'Bangkok',                     // City name
  postalCode: '10110',                 // Postal code
  lat: 13.7367,                        // Latitude coordinate
  lng: 100.5632,                       // Longitude coordinate
  phone: '+66 2 123 4567',            // Contact phone
  email: 'bangkok@bimtalenthub.th',   // Contact email
  type: 'headquarters'                 // 'headquarters' or 'branch'
}
```

### Method 1: Edit Component Directly
Edit `/app/frontend/src/components/GoogleMapsCard.js`:

```javascript
const defaultLocations = [
  {
    id: 1,
    name: 'Your Office Name',
    address: 'Your Street Address',
    city: 'Your City',
    postalCode: 'Postal Code',
    lat: 13.7367,  // Get from Google Maps
    lng: 100.5632, // Get from Google Maps
    phone: '+66 X XXXX XXXX',
    email: 'email@yourcompany.com',
    type: 'headquarters'
  },
  // Add more locations...
];
```

### Method 2: Pass as Props (Recommended)
In your page component:

```javascript
import { GoogleMapsCard } from '../components/GoogleMapsCard';

const myLocations = [
  { id: 1, name: '...', address: '...', ... },
  { id: 2, name: '...', address: '...', ... },
];

<GoogleMapsCard 
  locations={myLocations}
  height="600px"
  defaultZoom={7}
/>
```

### Finding Coordinates (Lat/Lng)

**Option 1: Google Maps Website**
1. Go to [Google Maps](https://www.google.com/maps)
2. Right-click on your location
3. Click coordinates to copy (e.g., `13.7367, 100.5632`)

**Option 2: Google Geocoding API**
```bash
https://maps.googleapis.com/maps/api/geocode/json?address=YOUR_ADDRESS&key=YOUR_API_KEY
```

---

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `locations` | Array | [] | Array of location objects |
| `height` | String | '500px' | Map container height |
| `defaultZoom` | Number | 6 | Initial zoom level (1-20) |

---

## Customization Options

### Styling
Edit glassmorphism effects in component:
```jsx
className="glass rounded-2xl"  // Change to your design
```

### Map Type
Change embed parameters in `generateMapEmbedUrl()`:
- `roadmap` - Street view (default)
- `satellite` - Satellite imagery
- `terrain` - Terrain with elevation
- `hybrid` - Satellite + labels

### Zoom Levels
- `1-3` - World view
- `4-6` - Country view (current: 6)
- `7-10` - Region/state view
- `11-14` - City view
- `15-18` - Street view
- `19-21` - Building view

---

## Current Implementation Details

### Default Locations (5 offices in Thailand)
1. **Bangkok HQ** - Sukhumvit Road (Headquarters)
2. **Chiang Mai Office** - Nimmanhaemin Road
3. **Phuket Branch** - Patong Beach Road
4. **Khon Kaen Office** - Mittraphap Road
5. **Pattaya Office** - Beach Road

### Features Implemented
- ✅ Responsive 2-column layout (map + location list)
- ✅ Clickable location cards with expand/collapse
- ✅ Selected location highlighting
- ✅ Contact info display (phone, email)
- ✅ "Get Directions" links for each location
- ✅ "View All on Map" button
- ✅ Error fallback UI
- ✅ Mobile-responsive design
- ✅ Custom scrollbar styling
- ✅ Glassmorphism design system

---

## Browser Compatibility

✅ Chrome/Edge (Chromium) - Full support  
✅ Firefox - Full support  
✅ Safari - Full support  
✅ Mobile browsers - Full support  

---

## Performance Optimization

**Current Optimizations:**
- `loading="lazy"` - Deferred iframe loading
- `referrerPolicy="no-referrer-when-downgrade"` - Security
- Custom scrollbar for location list
- Efficient re-rendering with React hooks

**Best Practices:**
- Embed API loads faster than JavaScript API
- No external API calls needed
- Minimal JavaScript overhead
- Cached by browser

---

## Troubleshooting

### Map not loading?
1. Check internet connection
2. Verify embed URL is correct
3. Check browser console for errors
4. Try the fallback "Open in Google Maps" button

### Wrong location displayed?
1. Verify lat/lng coordinates are correct
2. Check coordinates format (lat first, lng second)
3. Ensure decimal precision (minimum 4 decimal places)

### Markers not showing?
- Embed API doesn't support custom markers
- Upgrade to JavaScript API for custom markers
- Alternative: Use static map with marker parameters

---

## API Costs (as of 2024)

### Maps Embed API (Currently Used)
- **Cost:** FREE unlimited
- **Features:** Basic map embed
- **Limits:** No rate limits
- **API Key:** Optional (not required)

### Maps JavaScript API (Upgrade Option)
- **Cost:** $7 per 1,000 loads
- **Free Tier:** $200 credit/month (~28,000 loads)
- **Features:** Custom markers, info windows, clustering
- **API Key:** Required

---

## Support

For questions or issues:
- Email: support@bimtalenthub.th
- Documentation: Google Maps Platform Docs
- Component File: `/app/frontend/src/components/GoogleMapsCard.js`

---

## Version History

**v1.0** (Current)
- Initial implementation with Maps Embed API
- 5 default Thailand locations
- Responsive design with sidebar
- Error handling and fallback UI
- Glassmorphism styling

---

**Last Updated:** December 2024
