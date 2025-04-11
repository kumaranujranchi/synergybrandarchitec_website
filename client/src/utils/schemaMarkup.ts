/**
 * Schema.org markup for enhanced SEO and rich results in Google
 */

/**
 * Creates breadcrumb schema for a given page path
 * @param pagePath - The current page path
 * @returns BreadcrumbList schema object
 */
const createBreadcrumbSchema = (pagePath: string) => {
  // Base path is always home
  const breadcrumbs = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://synergybrandarchitect.in"
    }
  ];
  
  // Remove leading slash and split path into segments
  const path = pagePath.startsWith('/') ? pagePath.substring(1) : pagePath;
  const segments = path.split('/').filter(segment => segment !== '');
  
  // Build breadcrumb list based on path segments
  if (segments.length > 0) {
    let currentPath = "";
    
    segments.forEach((segment, index) => {
      currentPath += "/" + segment;
      
      // Convert segment to readable format (replace hyphens with spaces and capitalize)
      const readableName = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      breadcrumbs.push({
        "@type": "ListItem",
        "position": index + 2, // +2 because we already have the home item at position 1
        "name": readableName,
        "item": `https://synergybrandarchitect.in${currentPath}`
      });
    });
  }
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs
  };
};

/**
 * Updates the schema markup in the DOM based on the current page
 * @param pagePath - The current page path
 * @param pageData - Optional data specific to the current page
 */
export const updateSchemaMarkup = (pagePath: string, pageData?: any) => {
  // Create breadcrumb schema for all pages
  const breadcrumbSchema = createBreadcrumbSchema(pagePath);
  
  let markup: any;
  
  // Default organization data
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Synergy Brand Architect",
    "url": "https://synergybrandarchitect.in",
    "logo": "https://imagizer.imageshack.com/img924/5789/CC6b4R.png",
    "description": "Digital Marketing & Brand Building Agency in Patna offering web development, SEO, social media marketing, and brand strategy services.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+919525230232",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": ["en", "hi"]
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "East Gola Road, Vivek Vihar Colony",
      "addressLocality": "Danapur Nizamat",
      "addressRegion": "Patna",
      "postalCode": "801503",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://www.facebook.com/synergybrandarchitect",
      "https://www.instagram.com/synergybrandarchitect"
    ]
  };
  
  // Homepage schema - WebSite, Organization, and LocalBusiness
  if (pagePath === '/' || pagePath === '') {
    markup = [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Synergy Brand Architect",
        "url": "https://synergybrandarchitect.in",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://synergybrandarchitect.in/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      organizationData,
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Synergy Brand Architect",
        "image": "https://imagizer.imageshack.com/img924/5789/CC6b4R.png",
        "url": "https://synergybrandarchitect.in",
        "telephone": "+919525230232",
        "address": organizationData.address,
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "25.5941",
          "longitude": "85.1376"
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ],
          "opens": "10:00",
          "closes": "19:00"
        },
        "priceRange": "₹₹",
        "servesCuisine": "Digital Marketing Services"
      }
    ];
  }
  
  // Services page schema - Service offerings
  else if (pagePath.includes('/services')) {
    markup = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "Service",
            "name": "Digital Marketing",
            "url": "https://synergybrandarchitect.in/services#digital-marketing",
            "provider": {
              "@type": "Organization",
              "name": "Synergy Brand Architect"
            },
            "description": "Comprehensive digital marketing services including SEO, SEM, social media marketing, and content strategy.",
            "offers": {
              "@type": "Offer",
              "price": "5000",
              "priceCurrency": "INR"
            }
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "Service",
            "name": "Web Development",
            "url": "https://synergybrandarchitect.in/services#web-development",
            "provider": {
              "@type": "Organization",
              "name": "Synergy Brand Architect"
            },
            "description": "Professional website development services including custom websites, e-commerce platforms, and CMS integration.",
            "offers": {
              "@type": "Offer",
              "price": "15000",
              "priceCurrency": "INR"
            }
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item": {
            "@type": "Service",
            "name": "Brand Strategy",
            "url": "https://synergybrandarchitect.in/services#brand-strategy",
            "provider": {
              "@type": "Organization",
              "name": "Synergy Brand Architect"
            },
            "description": "Strategic brand development including brand identity, messaging, positioning, and visual design.",
            "offers": {
              "@type": "Offer",
              "price": "10000",
              "priceCurrency": "INR"
            }
          }
        }
      ]
    };
  }
  
  // Startup Plan page schema - Product and offer
  else if (pagePath.includes('/startup-plan')) {
    markup = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Startup Website Package",
      "image": "https://imagizer.imageshack.com/img923/1839/irjZDM.jpg",
      "description": "Professional, custom-coded website at just ₹15,000 - empowering small businesses to go digital affordably.",
      "brand": {
        "@type": "Brand",
        "name": "Synergy Brand Architect"
      },
      "offers": {
        "@type": "Offer",
        "price": "15000",
        "priceCurrency": "INR",
        "priceValidUntil": "2025-12-31",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "Synergy Brand Architect"
        },
        "url": "https://synergybrandarchitect.in/startup-plan"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "25"
      }
    };
  }
  
  // Resources page schema - Collection page
  else if (pagePath.includes('/resources')) {
    markup = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Digital Marketing Resources",
      "description": "Free resources, guides, templates and tools for digital marketing and brand building.",
      "url": "https://synergybrandarchitect.in/resources",
      "publisher": {
        "@type": "Organization",
        "name": "Synergy Brand Architect",
        "logo": {
          "@type": "ImageObject",
          "url": "https://imagizer.imageshack.com/img924/5789/CC6b4R.png"
        }
      },
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "url": "https://synergybrandarchitect.in/resources/guides"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "url": "https://synergybrandarchitect.in/resources/templates"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "url": "https://synergybrandarchitect.in/resources/case-studies"
          }
        ]
      }
    };
  }
  
  // Case Studies page schema
  else if (pagePath.includes('/case-studies') || pagePath.includes('/resources/case-studies')) {
    markup = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "Article",
            "name": "Wishluv Buildcon - Real Estate Lead Generation",
            "url": "https://synergybrandarchitect.in/case-studies/wishluv-buildcon",
            "author": {
              "@type": "Organization",
              "name": "Synergy Brand Architect"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Synergy Brand Architect",
              "logo": {
                "@type": "ImageObject",
                "url": "https://imagizer.imageshack.com/img924/5789/CC6b4R.png"
              }
            },
            "datePublished": "2024-01-15",
            "description": "How we helped Wishluv Buildcon increase their qualified leads by 230% through targeted digital marketing strategies."
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "Article",
            "name": "Biryani Mahal - Restaurant Website & Online Orders",
            "url": "https://synergybrandarchitect.in/case-studies/biryani-mahal",
            "author": {
              "@type": "Organization",
              "name": "Synergy Brand Architect"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Synergy Brand Architect",
              "logo": {
                "@type": "ImageObject",
                "url": "https://imagizer.imageshack.com/img924/5789/CC6b4R.png"
              }
            },
            "datePublished": "2024-02-20",
            "description": "How we helped Biryani Mahal increase their online orders by 185% through website development and digital marketing."
          }
        }
      ]
    };
  }
  
  // Blog pages schema
  else if (pagePath.includes('/blog')) {
    // If we're on a specific blog post
    if (pageData && pageData.title) {
      markup = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": pageData.title,
        "image": pageData.image || "https://imagizer.imageshack.com/img924/5789/CC6b4R.png",
        "datePublished": pageData.date || "2024-01-01",
        "dateModified": pageData.updated || pageData.date || "2024-01-01",
        "author": {
          "@type": "Organization",
          "name": "Synergy Brand Architect",
          "url": "https://synergybrandarchitect.in"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Synergy Brand Architect",
          "logo": {
            "@type": "ImageObject",
            "url": "https://imagizer.imageshack.com/img924/5789/CC6b4R.png"
          }
        },
        "description": pageData.description || "Digital marketing insights from Synergy Brand Architect",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://synergybrandarchitect.in${pagePath}`
        }
      };
    } 
    // Blog index page
    else {
      markup = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "Synergy Brand Architect Blog",
        "description": "Digital marketing insights, trends, and strategies to help your business grow online.",
        "url": "https://synergybrandarchitect.in/blog",
        "publisher": {
          "@type": "Organization",
          "name": "Synergy Brand Architect",
          "logo": {
            "@type": "ImageObject",
            "url": "https://imagizer.imageshack.com/img924/5789/CC6b4R.png"
          }
        }
      };
    }
  }
  
  // Contact/About page schema
  else if (pagePath.includes('/contact') || pagePath.includes('/about')) {
    markup = {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Synergy Brand Architect",
      "description": "Get in touch with our digital marketing and web development team for a free consultation.",
      "url": "https://synergybrandarchitect.in/contact",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://synergybrandarchitect.in/contact"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Synergy Brand Architect",
        "logo": {
          "@type": "ImageObject",
          "url": "https://imagizer.imageshack.com/img924/5789/CC6b4R.png"
        }
      }
    };
  }
  
  // FAQs page schema
  else if (pagePath.includes('/faq')) {
    markup = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What services does Synergy Brand Architect offer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We offer a comprehensive range of digital marketing services including SEO, social media marketing, website development, content marketing, paid advertising, brand strategy, and graphic design."
          }
        },
        {
          "@type": "Question",
          "name": "How much does a website cost?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our startup website package starts at just ₹15,000, which includes custom design, mobile responsiveness, and basic SEO. Enterprise-level websites with advanced features range from ₹50,000 to ₹1,00,000+."
          }
        },
        {
          "@type": "Question",
          "name": "How long does it take to build a website?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our standard delivery timeline for a basic website is 10-14 working days. For more complex projects, the timeline can extend to 4-6 weeks depending on the requirements and revisions."
          }
        }
      ]
    };
  }
  
  // Addons/pricing page schema
  else if (pagePath.includes('/addons') || pagePath.includes('/pricing')) {
    markup = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "Product",
            "name": "Addition of Page",
            "description": "Add a new page to your existing website with custom design and content.",
            "offers": {
              "@type": "Offer",
              "price": "2000",
              "priceCurrency": "INR"
            }
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "Product",
            "name": "WordPress Website Development",
            "description": "Complete WordPress website with custom theme and plugins.",
            "offers": {
              "@type": "Offer",
              "price": "10000",
              "priceCurrency": "INR"
            }
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item": {
            "@type": "Product",
            "name": "SEO Package",
            "description": "Comprehensive SEO optimization to improve your website's search engine rankings.",
            "offers": {
              "@type": "Offer",
              "price": "8000",
              "priceCurrency": "INR"
            }
          }
        }
      ]
    };
  }
  
  // Default schema is just the organization
  else {
    markup = organizationData;
  }
  
  // Make markup an array if it's not already to include breadcrumbs
  let markupArray = Array.isArray(markup) ? markup : [markup];
  
  // Add breadcrumb schema to the markup array for all pages except homepage
  if (pagePath !== '/' && pagePath !== '') {
    markupArray.push(breadcrumbSchema);
  }
  
  // Update the schema markup in the DOM
  const schemaScript = document.getElementById('schemaOrgMarkup');
  if (schemaScript) {
    schemaScript.textContent = JSON.stringify(markupArray, null, 2);
  }
  
  // Update canonical link based on current page path
  const canonicalLink = document.getElementById('canonical-link') as HTMLLinkElement;
  if (canonicalLink) {
    const normalizedPath = pagePath.endsWith('/') && pagePath.length > 1 
      ? pagePath.slice(0, -1)  // Remove trailing slash for canonical URLs
      : pagePath;
    canonicalLink.href = `https://synergybrandarchitect.in${normalizedPath}`;
  }
};

/**
 * Build schema markup for a blog post
 * @param post - The blog post data
 */
export const getBlogPostSchema = (post: any) => {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": post.image || "https://imagizer.imageshack.com/img924/5789/CC6b4R.png",
    "datePublished": post.date,
    "dateModified": post.updated || post.date,
    "author": {
      "@type": "Organization",
      "name": "Synergy Brand Architect"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Synergy Brand Architect",
      "logo": {
        "@type": "ImageObject",
        "url": "https://imagizer.imageshack.com/img924/5789/CC6b4R.png"
      }
    },
    "description": post.description || post.excerpt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://synergybrandarchitect.in/blog/${post.slug}`
    }
  };
};