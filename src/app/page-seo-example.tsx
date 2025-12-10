import { Metadata } from "next";
import Script from "next/script";
import { generateSEOMetadata, generatePersonSchema, generateLocalBusinessSchema, generateOrganizationSchema } from "@/lib/seo";
import { SchemaMarkup, Breadcrumbs } from "@/components/SchemaMarkup";

// Update metadata for the home page
export const metadata: Metadata = generateSEOMetadata({
  title: "Calgary Web Developer | React & Modern Web Design - Wyatt Lain",
  description:
    "Finance-driven web developer in Calgary specializing in React, Next.js, and data-driven websites. Founder of TUCN Media. Fast, modern web solutions.",
  keywords:
    "Calgary web developer, React developer Calgary, web design Calgary, TUCN Media, Wyatt Lain, Next.js developer",
  canonical: "https://wyattlain.com",
  image: "https://wyattlain.com/og-image.png",
});

export default function Home() {
  const breadcrumbs = [{ name: "Home", url: "/" }];

  return (
    <>
      {/* Schema markup for rich snippets */}
      <SchemaMarkup
        schema={generatePersonSchema()}
        id="person-schema"
      />
      <SchemaMarkup
        schema={generateLocalBusinessSchema()}
        id="business-schema"
      />
      <SchemaMarkup
        schema={generateOrganizationSchema()}
        id="organization-schema"
      />

      <main>
        {/* Breadcrumbs for navigation and SEO */}
        <Breadcrumbs items={breadcrumbs} />

        <article className="py-12">
          <header className="mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Calgary Web Developer | Data-Driven Digital Solutions
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              React & Modern Web Development for Growing Businesses
            </p>
            <p className="text-lg text-gray-700">
              Hi, I'm Wyatt Lain, a finance-driven web developer in Calgary,
              Alberta. I specialize in building fast, scalable, and modern web
              applications using React, Next.js, and TypeScript. Whether you're
              looking to launch a new product, optimize your existing platform,
              or explore digital transformation, I'm here to help.
            </p>
          </header>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">What I Do</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <article>
                <h3 className="text-xl font-semibold mb-3">
                  Web Development
                </h3>
                <p className="text-gray-700">
                  Custom web applications built with modern technologies. Fast
                  loading times, responsive design, and exceptional user
                  experience.
                </p>
              </article>
              <article>
                <h3 className="text-xl font-semibold mb-3">Web Design</h3>
                <p className="text-gray-700">
                  Beautiful, intuitive interfaces that your users will love.
                  Accessibility-first design that works on all devices.
                </p>
              </article>
              <article>
                <h3 className="text-xl font-semibold mb-3">
                  Digital Strategy
                </h3>
                <p className="text-gray-700">
                  Data-driven insights to optimize your digital presence. From
                  SEO to analytics, I help you make informed decisions.
                </p>
              </article>
              <article>
                <h3 className="text-xl font-semibold mb-3">
                  Tech Consulting
                </h3>
                <p className="text-gray-700">
                  Expert guidance on technology choices, architecture, and best
                  practices for your business needs.
                </p>
              </article>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Technology Stack</h2>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <li className="flex items-center">
                <span className="mr-2">✓</span> React & Next.js
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span> TypeScript
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span> Tailwind CSS
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span> Node.js & Express
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span> PostgreSQL & MongoDB
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span> AWS & Vercel
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Let's Work Together</h2>
            <p className="text-lg text-gray-700 mb-6">
              Whether you need a complete redesign, a new feature, or just some
              advice on your tech stack, I'd love to help. Get in touch to
              discuss your project.
            </p>
            <a
              href="/contact"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Start a Project
            </a>
          </section>
        </article>
      </main>
    </>
  );
}
