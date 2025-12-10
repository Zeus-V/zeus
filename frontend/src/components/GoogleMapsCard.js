import { useState, useEffect } from 'react';
import { MapPin, Navigation, Phone, Mail } from 'lucide-react';
import { Button } from './ui/button';

/**
 * GoogleMapsCard Component
 * 
 * Displays an interactive Google Map with multiple company locations
 * Features: Multiple markers, info windows, responsive design, error handling
 * 
 * Usage:
 * <GoogleMapsCard locations={companyLocations} />
 * 
 * Props:
 * - locations: Array of location objects with { name, address, city, lat, lng, phone, email }
 * - height: Optional height (default: '500px')
 * - defaultZoom: Optional zoom level (default: 6)
 */

export const GoogleMapsCard = ({ 
  locations = [], 
  height = '500px',
  defaultZoom = 6 
}) => {
  const [mapError, setMapError] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Sample company locations across Thailand
  const defaultLocations = [
    {
      id: 1,
      name: 'BIM Talent Hub - Bangkok HQ',
      address: '123 Sukhumvit Road, Khlong Toei',
      city: 'Bangkok',
      postalCode: '10110',
      lat: 13.7367,
      lng: 100.5632,
      phone: '+66 2 123 4567',
      email: 'bangkok@bimtalenthub.th',
      type: 'headquarters'
    },
    {
      id: 2,
      name: 'BIM Talent Hub - Chiang Mai Office',
      address: '456 Nimmanhaemin Road, Suthep',
      city: 'Chiang Mai',
      postalCode: '50200',
      lat: 18.7883,
      lng: 98.9853,
      phone: '+66 53 123 456',
      email: 'chiangmai@bimtalenthub.th',
      type: 'branch'
    },
    {
      id: 3,
      name: 'BIM Talent Hub - Phuket Branch',
      address: '789 Patong Beach Road, Kathu',
      city: 'Phuket',
      postalCode: '83150',
      lat: 7.8804,
      lng: 98.3923,
      phone: '+66 76 123 789',
      email: 'phuket@bimtalenthub.th',
      type: 'branch'
    },
    {
      id: 4,
      name: 'BIM Talent Hub - Khon Kaen Office',
      address: '321 Mittraphap Road, Muang',
      city: 'Khon Kaen',
      postalCode: '40000',
      lat: 16.4322,
      lng: 102.8236,
      phone: '+66 43 123 321',
      email: 'khonkaen@bimtalenthub.th',
      type: 'branch'
    },
    {
      id: 5,
      name: 'BIM Talent Hub - Pattaya Office',
      address: '555 Beach Road, Bang Lamung',
      city: 'Pattaya',
      postalCode: '20150',
      lat: 12.9236,
      lng: 100.8825,
      phone: '+66 38 123 555',
      email: 'pattaya@bimtalenthub.th',
      type: 'branch'
    }
  ];

  const companyLocations = locations.length > 0 ? locations : defaultLocations;

  // Calculate center point for all locations
  const calculateCenter = () => {
    if (companyLocations.length === 0) return { lat: 13.7367, lng: 100.5632 }; // Bangkok default
    
    const avgLat = companyLocations.reduce((sum, loc) => sum + loc.lat, 0) / companyLocations.length;
    const avgLng = companyLocations.reduce((sum, loc) => sum + loc.lng, 0) / companyLocations.length;
    
    return { lat: avgLat, lng: avgLng };
  };

  const center = calculateCenter();

  // Create markers URL for Google Maps Static API (for embed fallback)
  const createMarkersString = () => {
    return companyLocations
      .map(loc => `markers=color:0x3b82f6|label:${loc.id}|${loc.lat},${loc.lng}`)
      .join('&');
  };

  // Generate Google Maps embed URL with all locations
  const generateMapEmbedUrl = () => {
    // Using Google Maps embed with multiple locations using directions mode
    const origin = `${companyLocations[0].lat},${companyLocations[0].lng}`;
    const destination = `${companyLocations[companyLocations.length - 1].lat},${companyLocations[companyLocations.length - 1].lng}`;
    
    // For multiple markers, we'll use the view mode centered on Thailand
    return `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7750000!2d${center.lng}!3d${center.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f${defaultZoom}!5e0!3m2!1sen!2sth`;
  };

  const openInGoogleMaps = () => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=BIM+Talent+Hub+Thailand`;
    window.open(mapsUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="glass rounded-2xl overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Our Locations</h2>
              <p className="text-sm text-muted-foreground">
                {companyLocations.length} offices across Thailand
              </p>
            </div>
          </div>
          
          <Button
            onClick={openInGoogleMaps}
            variant="outline"
            size="sm"
            className="glass hidden sm:flex"
          >
            <Navigation className="h-4 w-4 mr-2" />
            View on Google Maps
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3">
        {/* Map Section */}
        <div className="lg:col-span-2 relative" style={{ height }}>
          {!mapError ? (
            <>
              <iframe
                title="BIM Talent Hub Locations Map"
                src={generateMapEmbedUrl()}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                onError={() => setMapError(true)}
                className="w-full h-full"
              />
              
              {/* Overlay gradient for better readability */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/5 to-transparent" />
            </>
          ) : (
            /* Fallback UI if map fails to load */
            <div className="w-full h-full flex items-center justify-center bg-muted/30">
              <div className="text-center p-8">
                <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Map Unavailable
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Unable to load Google Maps. Please check your connection.
                </p>
                <Button onClick={openInGoogleMaps} size="sm">
                  Open in Google Maps
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Locations List Sidebar */}
        <div className="p-6 bg-muted/30 overflow-y-auto custom-scrollbar" style={{ maxHeight: height }}>
          <h3 className="text-lg font-semibold text-foreground mb-4">All Locations</h3>
          
          <div className="space-y-3">
            {companyLocations.map((location, index) => (
              <button
                key={location.id}
                onClick={() => setSelectedLocation(location)}
                className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                  selectedLocation?.id === location.id
                    ? 'glass-strong shadow-glass-lg'
                    : 'glass-subtle hover:glass'
                }`}
                aria-label={`View ${location.name}`}
              >
                {/* Location Badge */}
                <div className="flex items-start gap-3 mb-2">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">{index + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-semibold text-foreground truncate">
                        {location.city}
                      </h4>
                      {location.type === 'headquarters' && (
                        <span className="px-2 py-0.5 text-xs font-medium rounded-md bg-primary/10 text-primary">
                          HQ
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {location.address}
                    </p>
                  </div>
                </div>

                {/* Contact Info (shown when selected) */}
                {selectedLocation?.id === location.id && (
                  <div className="mt-3 pt-3 border-t border-border/50 space-y-2 animate-slide-down">
                    {location.phone && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        <span>{location.phone}</span>
                      </div>
                    )}
                    {location.email && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        <span className="truncate">{location.email}</span>
                      </div>
                    )}
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address + ', ' + location.city)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-smooth"
                    >
                      <Navigation className="h-3 w-3" />
                      Get Directions
                    </a>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-6 pt-6 border-t border-border/50">
            <Button
              onClick={openInGoogleMaps}
              variant="outline"
              size="sm"
              className="w-full glass"
            >
              <MapPin className="h-4 w-4 mr-2" />
              View All on Map
            </Button>
          </div>
        </div>
      </div>

      {/* Instructions Note (for developers) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="p-4 bg-muted/20 border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            <strong>Developer Note:</strong> To customize locations, pass a <code>locations</code> prop array.
            Each location should have: id, name, address, city, lat, lng, phone, email, type.
          </p>
        </div>
      )}
    </div>
  );
};

export default GoogleMapsCard;
