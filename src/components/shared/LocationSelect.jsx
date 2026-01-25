import { useState, useEffect, useMemo } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '../ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

/**
 * LocationSelect - Reusable location dropdown component
 * 
 * Features:
 * - Fetches locations from backend API (/api/v1/locations/strings)
 * - Searchable dropdown with live filtering
 * - Supports "Remote" and "Hybrid" options
 * - Returns "City, Country" format (e.g., "Casablanca, Morocco")
 * - Caches data to avoid repeated API calls
 * 
 * Usage:
 * <LocationSelect
 *   value={formData.location}
 *   onChange={(value) => setFormData({...formData, location: value})}
 *   placeholder="Select location..."
 *   required={true}
 * />
 * 
 * @param {string} value - Currently selected location
 * @param {function} onChange - Callback when selection changes
 * @param {string} placeholder - Placeholder text (default: "Select location...")
 * @param {boolean} required - Whether field is required
 * @param {boolean} disabled - Whether dropdown is disabled
 * @param {string} className - Additional CSS classes
 */
export function LocationSelect({ 
  value, 
  onChange, 
  placeholder = "Select location...", 
  required = false,
  disabled = false,
  className = "" 
}) {
  const [open, setOpen] = useState(false);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  /**
   * Fetch locations from API on component mount
   * Uses caching to avoid repeated API calls
   */
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        // Check if data is already cached in sessionStorage
        const cached = sessionStorage.getItem('locations_cache');
        if (cached) {
          setLocations(JSON.parse(cached));
          setLoading(false);
          return;
        }

        // Fetch from API
        const response = await fetch(`${API_BASE}/locations/strings`);
        if (!response.ok) throw new Error('Failed to fetch locations');
        
        const data = await response.json();
        const locationList = data.response || [];
        
        // Cache for 1 hour
        sessionStorage.setItem('locations_cache', JSON.stringify(locationList));
        setLocations(locationList);
      } catch (error) {
        console.error('Error fetching locations:', error);
        // Fallback to basic locations if API fails
        setLocations(['Remote', 'Hybrid', 'Casablanca, Morocco', 'Rabat, Morocco', 'Paris, France']);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  /**
   * Filter locations based on search query
   * Case-insensitive partial matching
   */
  const filteredLocations = useMemo(() => {
    if (!searchQuery) return locations;
    
    const query = searchQuery.toLowerCase();
    return locations.filter(location => 
      location.toLowerCase().includes(query)
    );
  }, [locations, searchQuery]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-required={required}
          disabled={disabled || loading}
          className={cn(
            "w-full justify-between border-[#3A7FC2] focus:border-[#0C5F95] focus:ring-[#E2F2FF] bg-white",
            !value && "text-muted-foreground",
            className
          )}
          style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '14px' }}
        >
          {loading ? (
            "Loading locations..."
          ) : value ? (
            value
          ) : (
            placeholder
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start" style={{ width: 'var(--radix-popover-trigger-width)' }}>
        <Command>
          <CommandInput 
            placeholder="Search location..." 
            value={searchQuery}
            onValueChange={setSearchQuery}
            className="border-none focus:ring-0"
          />
          <CommandEmpty>No location found.</CommandEmpty>
          <CommandGroup className="max-h-64 overflow-auto">
            {filteredLocations.map((location) => (
              <CommandItem
                key={location}
                value={location}
                onSelect={(currentValue) => {
                  onChange(currentValue === value ? "" : currentValue);
                  setOpen(false);
                  setSearchQuery("");
                }}
                className="cursor-pointer"
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === location ? "opacity-100" : "opacity-0"
                  )}
                />
                {location}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

/**
 * Simpler version without ShadCN Command component
 * Use this if you don't have Command/Popover components
 */
export function LocationSelectSimple({ 
  value, 
  onChange, 
  placeholder = "Select location...",
  required = false,
  disabled = false,
  className = ""
}) {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Fetch locations on mount
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const cached = sessionStorage.getItem('locations_cache');
        if (cached) {
          setLocations(JSON.parse(cached));
          setLoading(false);
          return;
        }

        const response = await fetch(`${API_BASE}/locations/strings`);
        const data = await response.json();
        const locationList = data.response || [];
        
        sessionStorage.setItem('locations_cache', JSON.stringify(locationList));
        setLocations(locationList);
      } catch (error) {
        console.error('Error:', error);
        setLocations(['Remote', 'Hybrid']);
      } finally {
        setLoading(false);
      }
    };
    fetchLocations();
  }, []);

  // Filter locations by search
  const filteredLocations = locations.filter(loc =>
    loc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-2">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-3 py-2 border border-[#3A7FC2] rounded-md focus:border-[#0C5F95] focus:ring-[#E2F2FF] bg-white"
        style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '14px' }}
      />
      
      {/* Location Dropdown */}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={loading || disabled}
        required={required}
        className={cn(
          "w-full px-3 py-2 border border-[#3A7FC2] rounded-md focus:border-[#0C5F95] focus:ring-[#E2F2FF] bg-white",
          className
        )}
        style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '14px' }}
      >
        <option value="">{loading ? "Loading..." : placeholder}</option>
        {filteredLocations.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>
    </div>
  );
}