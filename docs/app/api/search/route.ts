import { createFromSource } from 'fumadocs-core/search/server';

import { source } from '@/lib/source';

// it should be cached forever
export const revalidate = false;

// For static export, we need to generate the search index
export const { staticGET: GET } = createFromSource(source, {
  // Generate search index for static export
  buildIndex(page) {
    return {
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      id: page.url,
      structuredData: page.data.structuredData,
    };
  },
});
