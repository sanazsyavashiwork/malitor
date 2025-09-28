"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function useLoading() {
  const [isLoading, setIsLoading] = useState(true);
  const [isStylesLoaded, setIsStylesLoaded] = useState(false);
  const [isPageReady, setIsPageReady] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsNavigating(true);
    setIsLoading(true);
    setIsStylesLoaded(false);
    setIsPageReady(false);

    const timer = setTimeout(() => {
      setIsNavigating(false);
      checkPageReady();
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  const checkPageReady = () => {
    const checkStyles = () => {
      try {
        const styleSheets = Array.from(document.styleSheets);
        let allStylesLoaded = true;

        for (const sheet of styleSheets) {
          try {
            if (sheet.href && !sheet.href.startsWith(window.location.origin)) {
              continue;
            }

            if (!sheet.cssRules && !sheet.rules) {
              allStylesLoaded = false;
              break;
            }
          } catch (e) {
            continue;
          }
        }

        return allStylesLoaded;
      } catch (e) {
        return true;
      }
    };

    const checkImages = () => {
      try {
        const images = Array.from(document.images);
        return images.length === 0 || images.every((img) => img.complete);
      } catch (e) {
        return true;
      }
    };

    const checkFonts = async () => {
      try {
        if (document.fonts) {
          await document.fonts.ready;
        }
        return true;
      } catch (e) {
        return true;
      }
    };

    const runAllChecks = async () => {
      try {
        const stylesReady = checkStyles();
        const imagesReady = checkImages();
        const fontsReady = await checkFonts();

        if (stylesReady && imagesReady && fontsReady) {
          setIsStylesLoaded(true);
          setIsPageReady(true);
          setIsLoading(false);
        } else {
          setTimeout(runAllChecks, 100);
        }
      } catch (e) {
        setIsStylesLoaded(true);
        setIsPageReady(true);
        setIsLoading(false);
      }
    };

    runAllChecks();
  };

  useEffect(() => {
    if (document.readyState === "complete") {
      checkPageReady();
    } else {
      const handleLoad = () => checkPageReady();
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  return {
    isLoading,
    isStylesLoaded,
    isPageReady,
    isNavigating,
    showLoading: isLoading || !isStylesLoaded || !isPageReady || isNavigating,
  };
}
