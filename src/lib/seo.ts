import { Metadata } from "next";

const baseUrl = "https://wyattlain.com";

interface SEOMetadataProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  image?: string;
  ogType?: string;
  authors?: Array<{ name: string; url?: string }>;
}

export function generateSEOMetadata(props: SEOMetadataProps): Metadata {
  const {
    title,
    description,
    keywords,
    canonical = baseUrl,
    image = `${baseUrl}/og-image.png`,
    ogType = "website",
    authors,
  } = props;

  return {
    title,
    description,
    keywords,
    authors,
    openGraph: {
      title,
      description,
      url: canonical,
      type: ogType as any,
      siteName: "Wyatt Lain - Web Developer",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@wyattlain",
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical,
    },
  };
}

// Schema.org markup generators
export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Wyatt Lain",
    jobTitle: "Web Developer & Founder",
    url: baseUrl,
    image: `${baseUrl}/og-image.png`,
    sameAs: [
      "https://www.linkedin.com/in/wyattlain/",
      "https://twitter.com/wyattlain",
    ],
    worksFor: {
      "@type": "Organization",
      name: "TUCN Media",
    },
    alumniOf: "Mount Royal University",
    knowsAbout: [
      "Web Development",
      "React",
      "Next.js",
      "TypeScript",
      "Digital Strategy",
      "Branding",
    ],
  };
}

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Wyatt Lain - Web Development",
    description:
      "React and modern web development services in Calgary, AB, Canada",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Calgary",
      addressRegion: "AB",
      addressCountry: "CA",
      postalCode: "T2P 2G8",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "51.0447",
      longitude: "-114.0719",
    },
    url: baseUrl,
    email: "contact@wyattlain.com",
    areaServed: {
      "@type": "City",
      name: "Calgary",
    },
    priceRange: "$$",
    serviceType: ["Web Development", "Web Design", "React Development"],
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TUCN Media",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description:
      "Digital solutions and modern web development for growing businesses",
    founder: {
      "@type": "Person",
      name: "Wyatt Lain",
    },
    sameAs: [
      "https://www.linkedin.com/company/tucn-media/",
      "https://twitter.com/tucnmedia",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Calgary",
      addressRegion: "AB",
      addressCountry: "CA",
    },
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };
}

export function generateProjectSchema(project: {
  name: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.description,
    url: project.url,
    image: project.image,
    datePublished: project.datePublished,
    dateModified: project.dateModified || project.datePublished,
    author: {
      "@type": "Person",
      name: "Wyatt Lain",
      url: baseUrl,
    },
  };
}

export function generateBlogPostSchema(post: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: post.url,
    image: post.image,
    datePublished: post.datePublished,
    dateModified: post.dateModified || post.datePublished,
    author: {
      "@type": "Person",
      name: "Wyatt Lain",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Wyatt Lain",
      url: baseUrl,
    },
  };
}
