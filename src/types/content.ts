import { 
  CheckCircle2 as CheckCircle, 
  Sparkles, 
  Play, 
  Zap, 
  Cpu, 
  Palette, 
  Briefcase, 
  MessageSquare, 
  Layout, 
  ShieldCheck,
  User,
  Scale,
  Award,
  Home,
  Key,
  Calculator,
  Paintbrush,
  FileText,
  TrendingUp,
  Camera,
  Clock,
  LucideIcon
} from "lucide-react";

export const Icons: Record<string, LucideIcon> = {
  CheckCircle,
  Sparkles,
  Play,
  Zap,
  Cpu,
  Palette,
  Briefcase,
  MessageSquare,
  Layout,
  ShieldCheck,
  User,
  Scale,
  Award,
  Home,
  Key,
  Calculator,
  Paintbrush,
  FileText,
  TrendingUp,
  Camera,
  Clock
};

export type IconName = keyof typeof Icons;

export interface SiteSettings {
  title: string;
  ownerName: string;
  email: string;
  location: string;
  inquireLabel: string;
  seo: {
    description: string;
    keywords: string[];
    ogImage: string;
  };
}

export interface NavItem {
  id: string;
  label: string;
  visible: boolean;
  order: number;
}

export interface HeroContent {
  backgroundImage: string;
  eyebrow: string;
  title: string;
  description: string;
  ctaPrimary: {
    label: string;
    href: string;
  };
  ctaSecondary: {
    label: string;
    href: string;
  };
  trustBadges: {
    label: string;
    icon: IconName;
  }[];
  availabilityLabel: string;
  scrollLabel: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  order: number;
}

export interface CollaborationStep {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  order: number;
}

export interface ContactContent {
  title: string;
  subtitle: string;
  highlight: string;
  description: string;
  cta: string;
  status: string;
  email: string;
  directLabel: string;
  socialLabel: string;
  socials: {
    name: string;
    url: string;
    icon?: IconName;
  }[];
}

export interface AboutContent {
  title: string;
  description: string;
  image: string;
  values: {
    title: string;
    icon: IconName;
  }[];
}

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  highlighted?: boolean;
}

export interface SiteContent {
  settings: SiteSettings;
  footer: {
    privacyLabel: string;
    termsLabel: string;
    cookiePolicyLabel: string;
    rightsReservedLabel: string;
  };
  error: {
    title: string;
    description: string;
    retryLabel: string;
    invalidFormatLabel: string;
    missingAssetLabel: string;
  };
  navigation: NavItem[];
  hero: HeroContent;
  services: {
    eyebrow: string;
    title: string;
    description: string;
    items: ServiceItem[];
  };
  collaboration: {
    eyebrow: string;
    title: string;
    description: string;
    stepLabel: string;
    steps: CollaborationStep[];
  };
  benefits: {
    eyebrow: string;
    title: string;
    description: string;
    items: BenefitItem[];
  };
  contact: ContactContent;
  about: AboutContent;
}
