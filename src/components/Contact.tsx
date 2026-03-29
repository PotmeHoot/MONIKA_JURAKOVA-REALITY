import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { FADE_UP_VARIANTS, DEFAULT_TRANSITION } from "../constants/motion";
import { Button } from "./ui/Button";
import { PillLabel } from "./ui/PillLabel";
import { useSiteContent } from "../hooks/useSiteContent";

import { SectionWrapper } from "./ui/SectionWrapper";

export const Contact = () => {
  const shouldReduceMotion = useReducedMotion();
  const { content } = useSiteContent();
  const { contact, settings } = content;

  return (
    <SectionWrapper containerClassName="max-w-4xl text-center">
      <motion.div
        variants={FADE_UP_VARIANTS}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={DEFAULT_TRANSITION}
      >
        <PillLabel className="mb-8 mx-auto">
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          {contact.status}
        </PillLabel>

        <h2 className="text-4xl md:text-6xl font-display font-medium mb-8 text-text-primary leading-[1.1]">
          {contact.title}
        </h2>
        
        <p className="text-xl md:text-2xl text-text-secondary mb-12 max-w-2xl mx-auto leading-relaxed">
          {contact.description}
        </p>

        <div className="flex flex-col items-center">
          <Button 
            href={`mailto:${settings.email}`} 
            variant="primary"
            className="!text-xl md:!text-2xl !px-12 !py-6 !rounded-2xl shadow-2xl shadow-accent/20 hover:scale-[1.02] active:scale-[0.98]"
          >
            {contact.cta} <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </motion.div>
    </SectionWrapper>
  );
};
