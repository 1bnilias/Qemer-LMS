'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { Search, Filter, X } from 'lucide-react';
import { SearchFilters } from '@/types';
import { mockCategories } from '@/lib/data';

interface CatalogFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function CatalogFilters({
  filters,
  onFiltersChange,
  searchQuery,
  onSearchChange
}: CatalogFiltersProps) {
  const [priceRange, setPriceRange] = useState([
    filters.priceRange?.min || 0,
    filters.priceRange?.max || 200
  ]);

  const handleFilterChange = (key: keyof SearchFilters, value: SearchFilters[keyof SearchFilters]) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange(values);
    handleFilterChange('priceRange', {
      min: values[0],
      max: values[1]
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
    setPriceRange([0, 200]);
  };

  const activeFiltersCount = Object.values(filters).filter(value =>
    value !== undefined && value !== null &&
    (typeof value !== 'object' || (value.min !== 0 || value.max !== 200))
  ).length;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Quick Filters Row */}
      <div className="flex flex-wrap gap-2">
        <Select
          value={filters.category || 'all-categories'}
          onValueChange={(value) => handleFilterChange('category', value === 'all-categories' ? undefined : value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-categories">All Categories</SelectItem>
            {mockCategories.map((category) => (
              <SelectItem key={category.id} value={category.name}>
                {category.icon} {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.level || 'all-levels'}
          onValueChange={(value) => handleFilterChange('level', value === 'all-levels' ? undefined : value)}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All Levels" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-levels">All Levels</SelectItem>
            <SelectItem value="Beginner">Beginner</SelectItem>
            <SelectItem value="Intermediate">Intermediate</SelectItem>
            <SelectItem value="Advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>

        {/* Advanced Filters Sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="relative">
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter Courses</SheetTitle>
              <SheetDescription>
                Refine your search with additional filters
              </SheetDescription>
            </SheetHeader>

            <div className="space-y-6 mt-6">
              {/* Price Range */}
              <div>
                <label className="text-sm font-medium mb-3 block">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <Slider
                  value={priceRange}
                  onValueChange={handlePriceRangeChange}
                  max={200}
                  min={0}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>$0</span>
                  <span>$200+</span>
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="text-sm font-medium mb-3 block">Minimum Rating</label>
                <Select
                  value={filters.rating?.toString() || 'any-rating'}
                  onValueChange={(value) => handleFilterChange('rating', value === 'any-rating' ? undefined : parseFloat(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any-rating">Any Rating</SelectItem>
                    <SelectItem value="4.5">4.5+ Stars</SelectItem>
                    <SelectItem value="4.0">4.0+ Stars</SelectItem>
                    <SelectItem value="3.5">3.5+ Stars</SelectItem>
                    <SelectItem value="3.0">3.0+ Stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Duration Filter */}
              <div>
                <label className="text-sm font-medium mb-3 block">Duration (hours)</label>
                <Select
                  value={filters.duration ? `${filters.duration.min}-${filters.duration.max}` : 'any-duration'}
                  onValueChange={(value) => {
                    if (value === 'any-duration') {
                      handleFilterChange('duration', undefined);
                    } else {
                      const [min, max] = value.split('-').map(Number);
                      handleFilterChange('duration', { min, max });
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any Duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any-duration">Any Duration</SelectItem>
                    <SelectItem value="0-10">0-10 hours</SelectItem>
                    <SelectItem value="10-25">10-25 hours</SelectItem>
                    <SelectItem value="25-50">25-50 hours</SelectItem>
                    <SelectItem value="50-100">50+ hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Clear Filters */}
              <Button
                variant="outline"
                onClick={clearFilters}
                className="w-full"
              >
                <X className="w-4 h-4 mr-2" />
                Clear All Filters
              </Button>
            </div>
          </SheetContent>
        </Sheet>

        {/* Clear Filters Button */}
        {activeFiltersCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearFilters} aria-label="Clear all filters">
                <X className="w-4 h-4 mr-1" />
                Clear
              </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.category && (
            <Badge variant="secondary">
              Category: {filters.category}
              <button
                onClick={() => handleFilterChange('category', undefined)}
                className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                aria-label={`Remove category filter: ${filters.category}`}
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {filters.level && (
            <Badge variant="secondary">
              Level: {filters.level}
              <button
                onClick={() => handleFilterChange('level', undefined)}
                className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                aria-label={`Remove level filter: ${filters.level}`}
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {filters.rating && (
            <Badge variant="secondary">
              Rating: {filters.rating}+ stars
              <button
                onClick={() => handleFilterChange('rating', undefined)}
                className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                aria-label={`Remove rating filter: ${filters.rating}+ stars`}
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
