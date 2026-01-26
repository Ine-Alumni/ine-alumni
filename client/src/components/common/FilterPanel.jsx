import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function FilterPanel({
  filtersConfig = [],
  filterService, // Optional service for dynamic data & labels
  onApplyFilters,
  className,
}) {
  const [options, setOptions] = useState({});
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(!!filterService);

  // Fetch dynamic options if service is provided
  useEffect(() => {
    if (filterService?.getFilterOptions) {
      filterService
        .getFilterOptions()
        .then(setOptions)
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const updateFilter = (key, value) => {
    setFilters((prev) => {
      const updated = { ...prev };
      if (
        (typeof value === "boolean" && value) ||
        (typeof value === "string" && value && value !== "all") ||
        (typeof value === "number" && !isNaN(value))
      ) {
        updated[key] = value;
      } else {
        delete updated[key];
      }
      return updated;
    });
  };

  const clearAll = () => {
    setFilters({});
    onApplyFilters?.({});
  };

  const removeFilter = (key) => {
    setFilters((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
    onApplyFilters?.({ ...filters, [key]: undefined });
  };

  const hasFilters = Object.keys(filters).length > 0;

  if (loading) {
    return (
      <div className={cn("space-y-6", className)}>
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-main-blue"></div>
        </div>
      </div>
    );
  }

  const renderFilter = (filter) => {
    const { key, label, type, options: staticOptions, optionKey } = filter;

    if (type === "select") {
      // Use static options if provided, otherwise fall back to dynamic ones
      const items = staticOptions || (optionKey ? options[optionKey] || [] : []);

      return (
        <div key={key} className="space-y-2">
          <label className="text-sm font-medium text-gray-700">{label}</label>
          <Select
            value={filters[key] || "all"}
            onValueChange={(value) => updateFilter(key, value === "all" ? null : value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Tous" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              {items.map((item) => {
                const value = typeof item === 'object' ? (item.value ?? item.id) : item;
                const displayLabel = typeof item === 'object' 
                  ? (item.label ?? item.name ?? String(item)) 
                  : item;
                return (
                  <SelectItem key={value} value={String(value)}>
                    {displayLabel}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      );
    }

    if (type === "checkbox") {
      return (
        <div key={key} className="flex items-center gap-2">
          <input
            type="checkbox"
            id={key}
            checked={!!filters[key]}
            onChange={(e) => updateFilter(key, e.target.checked)}
            className="h-4 w-4 text-main-blue rounded border-gray-300 focus:ring-main-blue"
          />
          <label htmlFor={key} className="text-sm text-gray-700">
            {label}
          </label>
        </div>
      );
    }

    if (type === "number") {
      const { min, max, placeholder } = filter;
      return (
        <div key={key} className="space-y-2">
          <label className="text-sm font-medium text-gray-700">{label}</label>
          <input
            type="number"
            min={min}
            max={max}
            placeholder={placeholder}
            value={filters[key] ?? ""}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "") {
                updateFilter(key, null);
              } else {
                const num = parseInt(val, 10);
                if (!isNaN(num)) {
                  updateFilter(key, num);
                }
              }
            }}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      );
    }

    return null;
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtersConfig.map(renderFilter)}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-gray-700">Filtres actifs:</h4>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAll}
              disabled={!hasFilters}
            >
              Effacer tout
            </Button>
            <Button
              size="sm"
              onClick={() => onApplyFilters?.(filters)}
              disabled={!hasFilters}
              className="bg-main-blue hover:bg-secondary-blue text-white"
            >
              <Search className="w-4 h-4 mr-1" />
              Rechercher
            </Button>
          </div>
        </div>

        {hasFilters && (
          <div className="flex flex-wrap gap-2">
            {Object.entries(filters).map(([key, value]) => {
              const filterDef = filtersConfig.find((f) => f.key === key);
              if (!filterDef) return null;

              let label = "";

              if (filterDef.type === "select") {
                // Try static options first
                if (filterDef.options) {
                  const opt = filterDef.options.find(o => o.value === value);
                  label = opt?.label || String(value);
                } 
                // Fall back to service label generator
                else if (filterService?.getFilterLabel) {
                  label = filterService.getFilterLabel(key, value, options.companies);
                } else {
                  label = String(value);
                }
              } else if (filterDef.type === "checkbox" && value) {
                label = filterDef.label;
              } else if (filterDef.type === "number") {
                label = `${filterDef.label}: ${value}`;
              } else {
                label = String(value);
              }

              return (
                <Badge
                  key={key}
                  variant="secondary"
                  className="flex items-center gap-1 cursor-pointer hover:bg-gray-300 transition-colors"
                  onClick={() => removeFilter(key)}
                >
                  <span className="text-xs">{label}</span>
                  <X className="w-3 h-3" />
                </Badge>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}