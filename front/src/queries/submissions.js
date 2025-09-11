import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { listSubmissions, postSubmission } from "../api/submissions.js";

// export function useSubmissions() {
//   return useQuery({
//     queryKey: ["submissions"],
//     queryFn: listSubmissions,
//     refetchOnWindowFocus: false,
//   });
// }

// export function useCachedSubmissions() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: postSubmission,
//     onSuccess: (response, originalFormData) => {
//       const newSubmission = {
//         ...originalFormData,
//         id: Date.now(),
//         createdAt: new Date().toISOString(),
//       };

//       queryClient.setQueryData(["submissions"], (old = []) => [
//         newSubmission,
//         ...old,
//       ]);
//     },
//     onError: (error) => {
//       console.error("Error creating submission:", error);
//     },
//   });
// }

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
        // אין לך id ב-DB; אם יש hash מהשרת – עדיף להשתמש בו. אחרת fallback זמני:
        id: Date.now(),
        createdAt: new Date().toISOString(),
      };

      // 1) לעדכן את הרשימה הפשוטה (אם בשימוש במקום אחר)
      queryClient.setQueryData(["submissions"], (old = []) => [
        newSubmission,
        ...(old || []),
      ]);

      // 2) לעדכן גם את האינסוף-גלילה: להקדים לפרק הראשון אם קיים
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