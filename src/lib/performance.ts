// Web Vitals monitoring utilities

export interface WebVitals {
  name: string;
  value: number;
  rating: "good" | "needs improvement" | "poor";
}

// Thresholds based on Google Web Vitals
const VITALS_THRESHOLDS = {
  LCP: {
    good: 2500, // 2.5 seconds
    needsImprovement: 4000, // 4 seconds
  },
  FID: {
    good: 100, // 100 milliseconds
    needsImprovement: 300, // 300 milliseconds
  },
  CLS: {
    good: 0.1,
    needsImprovement: 0.25,
  },
  TTFB: {
    good: 800, // 800 milliseconds
    needsImprovement: 1800, // 1.8 seconds
  },
};

export function getRating(
  metric: string,
  value: number
): "good" | "needs improvement" | "poor" {
  const thresholds = VITALS_THRESHOLDS[metric as keyof typeof VITALS_THRESHOLDS];

  if (!thresholds) return "needs improvement";

  if (value <= thresholds.good) return "good";
  if (value <= thresholds.needsImprovement) return "needs improvement";
  return "poor";
}

// Report Web Vitals to Google Analytics
export function reportWebVitals(metric: WebVitals) {
  // Send to Google Analytics
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", metric.name, {
      value: Math.round(metric.value),
      event_category: "web_vitals",
      event_label: metric.rating,
      non_interaction: true,
    });
  }

  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log(`${metric.name}: ${metric.value.toFixed(2)}ms (${metric.rating})`);
  }
}

// Hook for monitoring Core Web Vitals
export function useWebVitals() {
  if (typeof window === "undefined") return;

  // Observe LCP (Largest Contentful Paint)
  if ("PerformanceObserver" in window) {
    const lcpObserver = new PerformanceObserver((entryList) => {
      const lastEntry = entryList.getEntries().pop();
      if (lastEntry) {
        const metric: WebVitals = {
          name: "LCP",
          value: lastEntry.renderTime || lastEntry.loadTime,
          rating: getRating("LCP", lastEntry.renderTime || lastEntry.loadTime),
        };
        reportWebVitals(metric);
      }
    });

    try {
      lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
    } catch (e) {
      // LCP not supported
    }

    // Observe CLS (Cumulative Layout Shift)
    const clsObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          const metric: WebVitals = {
            name: "CLS",
            value: (entry as any).value * 1000, // Convert to milliseconds
            rating: getRating("CLS", (entry as any).value),
          };
          reportWebVitals(metric);
        }
      }
    });

    try {
      clsObserver.observe({ type: "layout-shift", buffered: true });
    } catch (e) {
      // CLS not supported
    }
  }

  // Navigation Timing
  window.addEventListener("load", () => {
    const perfData = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
    if (perfData) {
      const ttfb = perfData.responseStart - perfData.fetchStart;
      const metric: WebVitals = {
        name: "TTFB",
        value: ttfb,
        rating: getRating("TTFB", ttfb),
      };
      reportWebVitals(metric);
    }
  });
}

// Performance metrics logger
export function logPerformanceMetrics() {
  if (typeof window === "undefined") return;

  window.addEventListener("load", () => {
    const perfData = performance.getEntriesByType(
      "navigation"
    )[0] as PerformanceNavigationTiming;

    if (perfData) {
      const metrics = {
        "DNS Lookup": perfData.domainLookupEnd - perfData.domainLookupStart,
        "TCP Connection": perfData.connectEnd - perfData.connectStart,
        "Time to First Byte": perfData.responseStart - perfData.fetchStart,
        "Content Download": perfData.responseEnd - perfData.responseStart,
        "DOM Interactive": perfData.domInteractive - perfData.fetchStart,
        "DOM Complete": perfData.domComplete - perfData.fetchStart,
        "Page Load": perfData.loadEventEnd - perfData.fetchStart,
      };

      if (process.env.NODE_ENV === "development") {
        console.table(metrics);
      }
    }
  });
}

// Memory usage monitoring (development only)
export function monitorMemory() {
  if (
    typeof window === "undefined" ||
    typeof (performance as any).memory === "undefined"
  ) {
    return;
  }

  if (process.env.NODE_ENV === "development") {
    setInterval(() => {
      const memory = (performance as any).memory;
      console.log(
        `Memory: ${(memory.usedJSHeapSize / 1048576).toFixed(2)} MB / ${(memory.jsHeapSizeLimit / 1048576).toFixed(2)} MB`
      );
    }, 5000);
  }
}
