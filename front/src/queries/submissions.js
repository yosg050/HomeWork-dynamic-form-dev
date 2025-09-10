import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { listSubmissions, postSubmission } from "../api/submissions.js";

export function useSubmissions() {
  return useQuery({
    queryKey: ["submissions"],
    queryFn: listSubmissions,
    refetchOnWindowFocus: false,
  });
}



export function useCachedSubmissions() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postSubmission,
    onSuccess:(created) =>{
      queryClient.setQueryData(["submissions"], (old = []) => [
        created,
        ...old,
      ]);
    }
  })
}
