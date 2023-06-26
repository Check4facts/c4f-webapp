const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const routes = [
  { path: "/" },
  { path: "/fact-checking/sub-menu/immigration" },
  { path: "/fact-checking/sub-menu/crime" },
  { path: "/fact-checking/sub-menu/climate_change" },
  { path: "/fact-checking/sub-menu/pandemic" },
  { path: "/about/project" },
  { path: "/about/ethics" },
  { path: "/about/contact" },
  { path: "/more/third-party" },
  { path: "/dissemination" },
  { path: "/login" },
  { path: "/account/register" },
];

const generateSitemap = async () => {
  const hostname = 'https://check4facts.gr/'; // Replace with your website's URL

  const sitemap = new SitemapStream({ hostname });

  // Add each route to the sitemap
  routes.forEach(route => {
    sitemap.write({ url: route.path, changefreq: 'weekly', priority: 0.8 });
  });

  sitemap.end();

  // Wait for the sitemap to finish writing
  const sitemapXML = await streamToPromise(sitemap);

  const writeStream = createWriteStream('./public/sitemap.xml'); // Replace with the desired output path for the sitemap

  writeStream.write(sitemapXML);
  writeStream.end();

  console.log('Sitemap generated successfully.');
};

generateSitemap();