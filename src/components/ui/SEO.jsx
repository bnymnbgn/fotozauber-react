import { useEffect } from "react";

const SEO = ({
  title = "Noha Studio - Magische Kinderfotografie & Bildbearbeitung",
  description = "Professionelle Kinderfotografie und magische Bildbearbeitung. Wir verwandeln Ihre Erinnerungen in einzigartige Kunstwerke mit kreativer Fantasiefotografie.",
  keywords = "Kinderfotografie, Bildbearbeitung, Fantasiefotografie, Familienfotos, Babyfotografie, magische Transformationen, Noha Studio",
  canonical = "https://noha-studio.de",
  type = "website",
  imageUrl = "https://noha-studio.de/og-image.jpg",
}) => {
  useEffect(() => {
    // Update meta tags dynamically
    const updateMetaTag = (name, content) => {
      let tag =
        document.querySelector(`meta[name="${name}"]`) ||
        document.querySelector(`meta[property="${name}"]`);

      if (!tag) {
        tag = document.createElement("meta");
        if (name.startsWith("og:")) {
          tag.setAttribute("property", name);
        } else {
          tag.setAttribute("name", name);
        }
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    // Update title
    document.title = title;

    // Update basic meta tags
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);

    // Update Open Graph tags
    updateMetaTag("og:title", title);
    updateMetaTag("og:description", description);
    updateMetaTag("og:type", type);
    updateMetaTag("og:image", imageUrl);
    updateMetaTag("og:url", canonical);

    // Update Twitter Card tags
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", imageUrl);

    // Update canonical URL
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement("link");
      canonicalTag.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute("href", canonical);

    // Add structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "FotoZauber",
      description: description,
      url: canonical,
      logo: imageUrl,
      image: imageUrl,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Deutschland",
        addressCountry: "DE",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        availableLanguage: "German",
      },
      serviceType: "Photography Services",
      priceRange: "€€",
      openingHours: "Mo-Fr 09:00-18:00",
      sameAs: [
        "https://instagram.com/noha_studio",
        "https://facebook.com/noha_studio",
      ],
    };

    // Remove existing structured data
    const existingScript = document.querySelector(
      'script[type="application/ld+json"]'
    );
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(structuredData, null, 2);
    document.head.appendChild(script);

    // Cleanup
    return () => {
      const script = document.querySelector(
        'script[type="application/ld+json"]'
      );
      if (script) {
        script.remove();
      }
    };
  }, [title, description, keywords, canonical, type, imageUrl]);

  return null;
};

export default SEO;
