import { useState, memo, useCallback, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Project } from "../../types/content";
import { DEFAULT_TRANSITION } from "../../constants/motion";
import { useProjectPreviewLoop } from "../../hooks/useProjectPreviewLoop";
import { ProjectMediaFrame } from "./ProjectMediaFrame";
import { ProjectInteractionPreview } from "./ProjectInteractionPreview";
import { ProjectTimelineOverlay } from "./ProjectTimelineOverlay";
import { ProjectMetaOverlay } from "./ProjectMetaOverlay";
import { VideoIndicator } from "./ProjectPlaceholders";
import { WorkCategoryIcon } from "./WorkCategoryIcon";
import { usePreview } from "../../context/PreviewContext";

interface ProjectCardProps {
  item: Project;
  index: number;
  onSelect: (project: Project) => void;
}

export const ProjectCard = memo(({ item, index, onSelect }: ProjectCardProps) => {
  const shouldReduceMotion = useReducedMotion();
  const { activePreviewId, requestPreview, clearPreview } = usePreview();
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef<HTMLElement>(null);

  // Derive isActive from the centralized context
  const isActive = activePreviewId === item.id;

  useEffect(() => {
    if (!cardRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: "100px", threshold: 0.01 }
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  // 1. Centralized Preview State
  const {
    activeSegmentIndex,
    activeSegmentProgress,
    isVideoPlaying,
    videoDuration,
    videoRef,
    handleLoadedMetadata,
    handleVideoError,
    handleVideoEnded,
    isVideoActive,
    isImageSequenceActive,
    isIdle,
    previewImages,
    previewVideo,
    hasVideo: hookHasVideo,
    isHoverSupported,
    previewState
  } = useProjectPreviewLoop(item, isInView, isActive);

  // Check if hover is supported (desktop vs mobile)
  const [isHoverDevice, setIsHoverDevice] = useState(false);
  useEffect(() => {
    setIsHoverDevice(window.matchMedia("(hover: hover)").matches);
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (isHoverDevice) {
      requestPreview(item.id);
    }
  }, [isHoverDevice, item.id, requestPreview]);

  const handleMouseLeave = useCallback(() => {
    if (isHoverDevice) {
      clearPreview(item.id);
    }
  }, [isHoverDevice, item.id, clearPreview]);

  const handleClick = useCallback(() => {
    // Always open detail immediately on all devices for better UX
    onSelect(item);
  }, [item, onSelect]);

  return (
    <motion.article 
      ref={cardRef as any}
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ ...DEFAULT_TRANSITION, delay: shouldReduceMotion ? 0 : index * 0.05 }}
      className="group relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className="relative aspect-[4/5] card-base group-hover:border-white/20 group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)] cursor-pointer">
        
        {/* Layer 1: Media Frame (Static Poster) */}
        <ProjectMediaFrame 
          poster={`/assets/work/${item.folder}/${item.poster}`} 
          webpPoster={item.webpPoster ? `/assets/work/${item.folder}/${item.webpPoster}` : undefined}
          title={item.title} 
          isIdle={isIdle} 
          isActive={isActive} 
        />

        {/* Category Icon (Top Left Corner) */}
        <div className="absolute top-6 left-6 z-30 p-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-white/40 pointer-events-none opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-500">
          <WorkCategoryIcon category={item.category} />
        </div>

        {/* Layer 2: Interaction Preview Layer (Images/Videos) - Only mounted when in view */}
        {isInView && (
          <ProjectInteractionPreview 
            item={item}
            isActive={isActive}
            previewState={previewState}
            isImageSequenceActive={isImageSequenceActive}
            isVideoActive={isVideoActive}
            isVideoPlaying={isVideoPlaying}
            activeSegmentIndex={activeSegmentIndex}
            shouldReduceMotion={shouldReduceMotion ?? false}
            videoRef={videoRef}
            handleLoadedMetadata={handleLoadedMetadata}
            handleVideoError={handleVideoError}
            handleVideoEnded={handleVideoEnded}
            isHoverSupported={isHoverSupported}
            hasVideo={hookHasVideo}
            previewImages={previewImages}
            previewVideo={previewVideo}
          />
        )}

        {/* Layer 3: Timeline Overlay Layer (Progress) */}
        <ProjectTimelineOverlay 
          isImageSequenceActive={isImageSequenceActive}
          isVideoActive={isVideoActive}
          previewImages={previewImages}
          activeSegmentIndex={activeSegmentIndex}
          activeSegmentProgress={activeSegmentProgress}
          videoDuration={videoDuration}
          isHoverSupported={isHoverSupported}
        />

        {/* Video Indicator (Signals interactivity) - Only on hover devices */}
        {hookHasVideo && isHoverSupported && (
          <VideoIndicator isVisible={isIdle} />
        )}

        {/* Layer 4: Visual Effects Layer (Gradient & Sweep) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 z-20 pointer-events-none" />
        
        <motion.div
          key={isActive ? "active" : "inactive"}
          initial={{ x: "-150%", skewX: -20 }}
          animate={isActive ? { x: "150%" } : { x: "-150%" }}
          transition={isActive ? { 
            duration: 0.8, 
            ease: [0.43, 0.13, 0.23, 0.96] 
          } : { duration: 0 }}
          className="absolute inset-0 z-25 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"
        />

        {/* Layer 5: Text/Meta Overlay Layer */}
        <ProjectMetaOverlay
          item={item}
          onSelect={() => onSelect(item)}
        />
      </div>
    </motion.article>
  );
});

ProjectCard.displayName = "ProjectCard";
