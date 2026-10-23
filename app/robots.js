// Explicitly welcome AI answer-engine crawlers (AEO) alongside search engines.
const aiCrawlers = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'PerplexityBot',
  'Google-Extended',
  'Applebot-Extended',
  'Bingbot',
];

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      ...aiCrawlers.map((userAgent) => ({ userAgent, allow: '/' })),
    ],
    sitemap: 'https://ecobridgers.com/sitemap.xml',
    host: 'https://ecobridgers.com',
  };
}
