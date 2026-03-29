import { motion } from "motion/react";
import { useSiteContent } from "../hooks/useSiteContent";
import { FADE_UP_VARIANTS, DEFAULT_TRANSITION } from "../constants/motion";
import { Icon } from "./ui/Icon";
import { SectionHeader } from "./ui/SectionHeader";
import { SectionWrapper } from "./ui/SectionWrapper";
import { CardShell } from "./ui/CardShell";
import { cn } from "../lib/utils";

export const Benefits = () => {
  const { content } = useSiteContent();
  const { benefits } = content;

  return (
    <SectionWrapper className="bg-bg-primary">
      <motion.div
        variants={FADE_UP_VARIANTS}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={DEFAULT_TRANSITION}
      >
        <SectionHeader 
          eyebrow={benefits.eyebrow}
          title={benefits.title}
          description={benefits.description}
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-16">
          {benefits.items.map((benefit, i) => (
            <motion.div
              key={benefit.id}
              variants={FADE_UP_VARIANTS}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ 
                ...DEFAULT_TRANSITION,
                delay: i * 0.1 
              }}
            >
              <CardShell 
                className={cn(
                  "group h-full flex flex-col p-8 md:p-10 transition-all duration-500",
                  benefit.highlighted 
                    ? "border-accent/40 shadow-lg shadow-accent/5 bg-white" 
                    : "bg-white/50 border-border-base hover:bg-white hover:shadow-xl"
                )}
              >
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500",
                  benefit.highlighted 
                    ? "bg-accent text-white" 
                    : "bg-bg-primary text-text-primary group-hover:bg-accent group-hover:text-white"
                )}>
                  <Icon name={benefit.icon} className="w-7 h-7 stroke-[1.5]" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-text-primary">
                  {benefit.title}
                </h3>
                <p className="text-base text-text-secondary leading-relaxed">
                  {benefit.description}
                </p>
              </CardShell>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
};
