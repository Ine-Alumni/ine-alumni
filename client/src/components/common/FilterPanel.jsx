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
import { filterService } from "@/services/filterService";

export function FilterPanel({ onFilterChange, onApplyFilters, className }) {
  const [options, setOptions] = useState({});
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    filterService
      .getFilterOptions()
      .then(setOptions)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const updateFilter = (key, value) => {
    const updated = { ...filters };
    if (value && value !== "all") {
      updated[key] = value;
    } else {
      delete updated[key];
    }
    setFilters(updated);
    onFilterChange?.(updated);
  };

  const clearAll = () => {
    setFilters({});
    onFilterChange?.({});
    onApplyFilters?.({});
  };

  const removeFilter = (key) => {
    const updated = { ...filters };
    delete updated[key];
    setFilters(updated);
    onApplyFilters?.(updated);
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

  const FilterSelect = ({ label, filterKey, items, valueKey, labelKey }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <Select
        value={filters[filterKey] || "all"}
        onValueChange={(v) => updateFilter(filterKey, v)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Tous" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous</SelectItem>
          {items.map((item) => {
            const value = valueKey ? String(item[valueKey]) : item;
            const displayLabel = labelKey
              ? typeof labelKey === "function"
                ? labelKey(item)
                : item[labelKey]
              : item;
            return (
              <SelectItem key={value} value={value}>
                {displayLabel}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <div className={cn("space-y-6", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <FilterSelect
          label="Promotion"
          filterKey="promotion"
          items={options.graduationYears || []}
        />
        <FilterSelect
          label="Poste"
          filterKey="poste"
          items={options.positions || []}
        />
        <FilterSelect
          label="Filière"
          filterKey="filiere"
          items={options.majors || []}
        />
        <FilterSelect
          label="Entreprise"
          filterKey="entreprise"
          items={options.companies || []}
          valueKey="id"
          labelKey="name"
        />
        <FilterSelect
          label="Localisation"
          filterKey="localisation"
          items={options.cities || []}
        />
        <FilterSelect
          label="Domaine"
          filterKey="domaine"
          items={options.domains || []}
          labelKey={(domain) => domain.replace(/_/g, " ")}
        />
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
            {Object.entries(filters).map(([key, value]) => (
              <Badge
                key={key}
                variant="secondary"
                className="flex items-center gap-1 cursor-pointer hover:bg-gray-300 transition-colors"
                onClick={() => removeFilter(key)}
              >
                <span className="text-xs">
                  {filterService.getFilterLabel(key, value, options.companies)}
                </span>
                <X className="w-3 h-3" />
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
