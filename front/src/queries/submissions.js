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
    onSuccess: (response, originalFormData) => {
      const newSubmission = {
        ...originalFormData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      };

      queryClient.setQueryData(["submissions"], (old = []) => [
        newSubmission,
        ...old,
      ]);
    },
    onError: (error) => {
      console.error("Error creating submission:", error);
    },
  });
}
