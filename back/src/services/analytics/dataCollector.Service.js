import { scanSubmissions } from "../../repositories/submissionsRepo.js";
import { ANALYTICS_CONFIG } from "../../utils/analyticsConfig.js";

export async function streamSubmissions(processorCallback) {
  let cursor = undefined;
  let totalProcessed = 0;

  do {
    const { items, nextCursor } = await scanSubmissions({
      limit: ANALYTICS_CONFIG.PAGE_SIZE,
      cursor,
      projection: ANALYTICS_CONFIG.PROJECTION_FIELDS,
    });

    if (items && items.length > 0) {
      await processorCallback(items);
      totalProcessed += items.length;
      console.log(`Processed batch: ${items.length} items (Total: ${totalProcessed})`);
    }

    cursor = nextCursor;
  } while (cursor);

  return totalProcessed;
}

