import React, { createContext, useContext, useState, useEffect } from "react";
import { SiteContent } from "../types/content";

interface ContentContextType {
  content: SiteContent | null;
  isLoading: boolean;
  error: Error | null;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true);
        const configRes = await fetch("/data/config.json");

        if (!configRes.ok) {
          throw new Error(`Failed to fetch site config: ${configRes.statusText}`);
        }

        const configData = await configRes.json();

        // Use configData as the SiteContent object
        setContent(configData);
      } catch (err) {
        console.error("Error loading site content:", err);
        setError(err instanceof Error ? err : new Error("Unknown error loading content"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []);

  return (
    <ContentContext.Provider value={{ content, isLoading, error }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
};
