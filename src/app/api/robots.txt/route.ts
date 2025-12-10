import { NextResponse } from "next/server";

export async function GET() {
  const robots = `# Robots.txt for wyattlain.com
User-agent: *
Allow: /
Disallow: /admin
Disallow: /private
Disallow: /api/

# Crawl delay (in seconds)
Crawl-delay: 1

# Specific rules for Googlebot
User-agent: Googlebot
Allow: /
Crawl-delay: 0

# Disallow bad bots
User-agent: MJ12bot
Disallow: /

User-agent: AhrefsBot
Crawl-delay: 10

User-agent: SemrushBot
Crawl-delay: 10

# Sitemap location
Sitemap: https://wyattlain.com/sitemap.xml`;

  return new NextResponse(robots, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
