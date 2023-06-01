import * as React from "react";
import { MutationEventType } from "@/features/web";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";

import { Webs } from "@/api";

export const useGlobalMutation = (
  event: MutationEventType,
  queryKey?: unknown[]
) => {
  const queryClient = useQueryClient();

  const mutationFn = React.useCallback(
    async (body?: unknown) => {
      switch (event) {
        case "CREATE_WEB": {
          return await Webs.createWeb(body);
        }
      }
    },
    [event]
  );

  return useMutation({
    mutationFn: (body?: unknown) => mutationFn(body),

    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData(queryKey as QueryKey);

      queryClient.setQueryData(["todos"], () => data);

      return { previousData };
    },

    onError: (err, newTodo, context) => {
      queryClient.setQueryData(queryKey as QueryKey, context?.previousData);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKey });
    },
  });
};
