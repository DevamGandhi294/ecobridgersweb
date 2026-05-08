export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://ecobridgers.com/sitemap.xml',
    host: 'https://ecobridgers.com',
  };
}
