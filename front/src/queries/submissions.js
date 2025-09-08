import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { listSubmissions, postSubmission } from "@/api/submissions";

export function useSubmissions() {
  return useQuery({ queryKey: ["submissions"], queryFn: listSubmissions });
}
export function useCreateSubmission() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: postSubmission,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["submissions"] }),
  });
}

