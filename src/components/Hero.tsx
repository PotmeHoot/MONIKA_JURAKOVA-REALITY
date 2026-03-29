import { motion, useReducedMotion } from "motion/react";
import { useSiteContent } from "../hooks/useSiteContent";
import { FADE_UP_VARIANTS, DEFAULT_TRANSITION } from "../constants/motion";
import { Button } from "./ui/Button";
import { PillLabel } from "./ui/PillLabel";
import { Icons } from "../types/content";

export const Hero = () => {
  const shouldReduceMotion = useReducedMotion();
  const { content } = useSiteContent();
  const { hero } = content;

  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden bg-bg-primary">
      <div className="container-custom max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            variants={FADE_UP_VARIANTS}
            initial="hidden"
            animate="visible"
            transition={DEFAULT_TRANSITION}
            className="text-left"
          >
            <PillLabel className="mb-6">
              <div className="w-2 h-2 rounded-full bg-accent" />
              {hero.availabilityLabel}
            </PillLabel>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-[1.1] mb-6 text-text-primary">
              {hero.title}
            </h1>
            
            <p className="text-lg md:text-xl text-text-secondary mb-10 max-w-xl leading-relaxed">
              {hero.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                href={hero.ctaPrimary.href} 
                variant="primary" 
                className="w-full sm:w-auto px-10 py-4 text-lg"
              >
                {hero.ctaPrimary.label}
              </Button>
              <Button 
                href={hero.ctaSecondary.href} 
                variant="secondary" 
                className="w-full sm:w-auto px-10 py-4 text-lg"
              >
                {hero.ctaSecondary.label}
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 pt-8 border-t border-border-primary">
              {hero.trustBadges.map((badge, index) => {
                const Icon = Icons[badge.icon];
                return (
                  <div key={index} className="flex items-center gap-2 text-sm font-medium text-text-secondary">
                    {Icon && <Icon className="w-5 h-5 text-accent" />}
                    <span>{badge.label}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...DEFAULT_TRANSITION, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden shadow-2xl shadow-accent/10 border border-border-primary">
              <img 
                src={hero.backgroundImage} 
                alt="Real Estate Lifestyle" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {/* Subtle overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 to-transparent pointer-events-none" />
            </div>
            
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary-accent/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-accent/10 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>

      {/* Background accents */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-accent/5 blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-secondary-accent/5 blur-[100px] -z-10 pointer-events-none" />
    </section>
  );
};
