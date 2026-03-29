import { motion, useReducedMotion } from "motion/react";
import { useSiteContent } from "../hooks/useSiteContent";
import { FADE_UP_VARIANTS, DEFAULT_TRANSITION } from "../constants/motion";
import { SectionWrapper } from "./ui/SectionWrapper";
import { Icons } from "../types/content";
import { CardShell } from "./ui/CardShell";

export const About = () => {
  const shouldReduceMotion = useReducedMotion();
  const { content } = useSiteContent();
  const { about } = content;

  return (
    <SectionWrapper id="about" className="bg-bg-primary" containerClassName="max-w-[1200px]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        {/* Left: Photo */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={DEFAULT_TRANSITION}
          className="lg:col-span-5 relative"
        >
          <div className="aspect-[3/4] rounded-[32px] overflow-hidden shadow-2xl border border-border-primary">
            <img 
              src={about.image} 
              alt={about.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Decorative element */}
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent/10 rounded-full blur-3xl -z-10" />
        </motion.div>

        {/* Right: Text & Values */}
        <motion.div
          variants={FADE_UP_VARIANTS}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={DEFAULT_TRANSITION}
          className="lg:col-span-7 space-y-10"
        >
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-text-primary">
              {about.title}
            </h2>
            <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
              {about.description}
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-border-primary">
            {about.values.map((value, index) => {
              const Icon = Icons[value.icon];
              return (
                <div key={index}>
                  <CardShell className="flex items-center gap-4 p-6 bg-white/50 backdrop-blur-sm border-border-primary/50">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                      {Icon && <Icon className="w-5 h-5" />}
                    </div>
                    <span className="font-medium text-text-primary">{value.title}</span>
                  </CardShell>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};
