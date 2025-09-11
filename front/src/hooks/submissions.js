import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { listSubmissions, postSubmission } from "../api/submissions.js";


export function useSubmissionsInfinite(limit = 50) {
  return useInfiniteQuery({
    queryKey: ["submissions-infinite", { limit }],
    queryFn: ({ pageParam }) =>
      listSubmissions({ limit, cursor: pageParam }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? undefined,
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
        ...(old || []),
      ]);

      queryClient.setQueryData(
        ["submissions-infinite", { limit: 50 }],
        (old) => {
          if (!old?.pages?.length) return old;
          const [first, ...rest] = old.pages;
          const updatedFirst = {
            ...first,
            items: [newSubmission, ...(first.items || [])],
          };
          return { ...old, pages: [updatedFirst, ...rest] };
        }
      );
    },
    onError: (error) => {
      console.error("Error creating submission:", error);
    },
  });
}