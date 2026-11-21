import React from 'react';
import { 
  LayoutGrid, 
  Sparkles, 
  Palette, 
  Moon, 
  Crown, 
  Shirt, 
  Layers, 
  Smile, 
  Baby, 
  ShoppingBag
} from 'lucide-react';

interface CategoryIconProps {
  slug?: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function CategoryIcon({ slug = '', size = 18, className, style }: CategoryIconProps) {
  const s = slug.toLowerCase().trim();

  switch (s) {
    case 'all':
    case 'all-products':
      return <LayoutGrid size={size} className={className} style={style} />;
    case 'sarees':
      return <Sparkles size={size} className={className} style={style} />;
    case 'chudithar':
      return <Palette size={size} className={className} style={style} />;
    case 'women-s-nighties':
    case 'nighties':
      return <Moon size={size} className={className} style={style} />;
    case 'women-s-wear':
      return <Crown size={size} className={className} style={style} />;
    case 'men-s-wear':
      return <Shirt size={size} className={className} style={style} />;
    case 'dhoti-collection':
    case 'dhoti':
      return <Layers size={size} className={className} style={style} />;
    case 'kids-wear':
      return <Smile size={size} className={className} style={style} />;
    case 'born-baby-dress':
    case 'newborn-baby-dress':
      return <Baby size={size} className={className} style={style} />;
    default:
      return <ShoppingBag size={size} className={className} style={style} />;
  }
}
