import { NextResponse } from "next/server";

export const dynamic = "force-static";

// Define your site routes here
const routes = [
  {
    path: "/",
    priority: 1.0,
    changefreq: "weekly",
  },
  {
    path: "/services",
    priority: 0.9,
    changefreq: "monthly",
  },
  {
    path: "/portfolio",
    priority: 0.9,
    changefreq: "bi-weekly",
  },
  {
    path: "/about",
    priority: 0.7,
    changefreq: "monthly",
  },
  {
    path: "/contact",
    priority: 0.8,
    changefreq: "monthly",
  },
  {
    path: "/blog",
    priority: 0.8,
    changefreq: "weekly",
  },
];

// Add dynamic routes (projects, blog posts, etc.)
// Example:
// const projects = await fetch("your-api").then(r => r.json());
// projects.forEach(project => {
//   routes.push({
//     path: `/portfolio/${project.slug}`,
//     priority: 0.7,
//     changefreq: "monthly",
//   });
// });

function generateSitemapXml(
  routes: Array<{ path: string; priority: number; changefreq: string }>
): string {
  const baseUrl = "https://wyattlain.com";
  const today = new Date().toISOString().split("T")[0];

  const urls = routes
    .map(
      (route) => `
  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>
    `
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`;
}

export async function GET() {
  const sitemap = generateSitemapXml(routes);

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
