import { motion, useReducedMotion } from "motion/react";
import { SectionHeader } from "./ui/SectionHeader";
import { CardShell } from "./ui/CardShell";
import { SectionWrapper } from "./ui/SectionWrapper";
import { useSiteContent } from "../hooks/useSiteContent";
import { Icon } from "./ui/Icon";
import { FADE_UP_VARIANTS, DEFAULT_TRANSITION } from "../constants/motion";

export const Collaboration = () => {
  const shouldReduceMotion = useReducedMotion();
  const { content } = useSiteContent();
  const { collaboration } = content;

  return (
    <SectionWrapper className="bg-bg-secondary overflow-hidden">
      <motion.div
        variants={FADE_UP_VARIANTS}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={DEFAULT_TRANSITION}
      >
        <SectionHeader 
          eyebrow={collaboration.eyebrow}
          title={collaboration.title}
          description={collaboration.description}
          centered
        />

        <div className="relative mt-20">
          {/* Desktop Line Connector */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-px bg-border-base" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative">
            {collaboration.steps.sort((a, b) => a.order - b.order).map((step, i) => (
              <motion.div 
                key={step.id}
                variants={FADE_UP_VARIANTS}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ 
                  ...DEFAULT_TRANSITION,
                  delay: shouldReduceMotion ? 0 : i * 0.1 
                }}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Mobile/Tablet Line Connector */}
                {i < collaboration.steps.length - 1 && (
                  <div className="lg:hidden absolute top-24 left-1/2 -translate-x-1/2 w-px h-12 bg-border-base" />
                )}

                {/* Step Number & Icon Circle */}
                <div className="relative z-10 w-24 h-24 rounded-full bg-white border border-border-base flex items-center justify-center mb-8 shadow-sm group-hover:border-accent group-hover:shadow-md transition-all duration-500">
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center shadow-lg">
                    0{i + 1}
                  </div>
                  <Icon name={step.icon} className="w-8 h-8 text-text-primary group-hover:text-accent transition-colors duration-500" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-text-primary group-hover:text-accent transition-colors">
                  {step.title}
                </h3>
                <p className="text-base text-text-secondary leading-relaxed max-w-[240px]">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
};
