export function OrganizationSchema() {
    return (
        <script type="application/ld+json" dangerouslySetInnerHTML={{
            __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": ["Organization", "LocalBusiness"],
                "name": "EcoBridgers",
                "url": "https://www.ecobridgers.site",
                "logo": "https://www.ecobridgers.site/logo.png",
                "email": "ecobridgers.tech@gmail.com",
                "telephone": "+917862949437",
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Surat",
                    "addressRegion": "Gujarat",
                    "addressCountry": "IN"
                },
                "description": "IoT, embedded systems, web, mobile and cloud development company based in Surat, India.",
                "areaServed": "Worldwide",
                "openingHours": "Mo-Sa 10:00-19:00",
                "sameAs": [
                    "https://linkedin.com/company/ecobridgers",
                    "https://github.com/ecobridgers"
                ]
            })
        }} />
    )
}