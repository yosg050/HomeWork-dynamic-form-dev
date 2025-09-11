import { scanSubmissions } from "../../repositories/submissionsRepo.js";
import { ANALYTICS_CONFIG } from "../../utils/analyticsConfig.js";

export class DataCollectorService {
  async fetchAllSubmissions() {
    const allSubmissions = [];
    let cursor = undefined;

    do {
      const { items, nextCursor } = await scanSubmissions({
        limit: ANALYTICS_CONFIG.PAGE_SIZE,
        cursor,
        projection: ANALYTICS_CONFIG.PROJECTION_FIELDS,
      });

      allSubmissions.push(...items);
      cursor = nextCursor;
    } while (cursor);

    return allSubmissions;
  }
}
