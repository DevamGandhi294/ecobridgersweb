export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://ecobridgers.site/sitemap.xml',
    host: 'https://ecobridgers.com',
  };
}
