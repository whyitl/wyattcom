import Script from "next/script";

interface SchemaMarkupProps {
  schema: Record<string, any>;
  id?: string;
}

export function SchemaMarkup({ schema, id }: SchemaMarkupProps) {
  return (
    <Script
      id={id || "schema-markup"}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
      strategy="afterInteractive"
    />
  );
}

interface BreadcrumbsProps {
  items: Array<{ name: string; url: string }>;
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://wyattlain.com${item.url}`,
    })),
  };

  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex items-center gap-2 text-sm">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && <span className="text-gray-400">/</span>}
              <a
                href={item.url}
                className="text-blue-600 hover:underline"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <SchemaMarkup schema={schema} id="breadcrumb-schema" />
    </>
  );
}
