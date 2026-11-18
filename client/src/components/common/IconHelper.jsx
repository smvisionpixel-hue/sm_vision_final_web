import React from 'react';
import {
  Share2,
  Palette,
  Video,
  Mic,
  Search,
  Globe,
  Sparkles,
  FileText,
  CreditCard,
  Clapperboard,
  Camera,
  Film,
  Smartphone,
  Layers
} from 'lucide-react';

const iconMap = {
  Share2,
  Palette,
  Video,
  Mic,
  Search,
  Globe,
  Sparkles,
  FileText,
  CreditCard,
  Clapperboard,
  Camera,
  Film,
  Smartphone,
};

export const ServiceIcon = ({ name, className = 'w-6 h-6' }) => {
  const IconComponent = iconMap[name] || Layers;
  return <IconComponent className={className} />;
};

export default ServiceIcon;
