import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSchema } from "@/api/schema";

export function useSchema() {
  const qc = useQueryClient();
  return useQuery({
    queryKey: ["schema"],
    queryFn: async () => {
      const { notModified, schema } = await getSchema();
      if (notModified) return qc.getQueryData(["schema"]);
      return schema;
    },
    staleTime: 60_000,
  });
}
