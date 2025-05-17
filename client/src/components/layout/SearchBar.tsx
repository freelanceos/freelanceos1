import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onClose: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [, navigate] = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      onClose();
    }
  };

  return (
    <div className="border-t border-neutral-200 py-4">
      <div className="container mx-auto px-4">
        <form onSubmit={handleSearch} className="flex">
          <Input
            type="text"
            placeholder="ابحث عن منتجات، كتب، قوالب..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow bg-neutral-100 border-0 px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none rounded-r-md"
          />
          <Button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-l-md hover:bg-primary-dark focus:outline-none"
          >
            <i className="fas fa-search"></i>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
