import * as fs from 'node:fs/promises';

import { CloudManager } from '@oramacloud/client';
import { type OramaDocument, sync } from 'fumadocs-core/search/orama-cloud';

export async function updateSearchIndexes(): Promise<void> {
  const apiKey = process.env.ORAMA_PRIVATE_API_KEY;

  if (!apiKey) {
    console.log('no api key for Orama found, skipping');
    return;
  }

  const content = await fs.readFile('.next/server/app/static.json.body');
  const records = JSON.parse(content.toString()) as OramaDocument[];

  const manager = new CloudManager({ api_key: apiKey });

  await sync(manager, {
    index: 'mtu8ptd5s06kwpggyqrjc4ko',
    documents: records,
  });

  console.log(`search updated: ${records.length} records`);
}
