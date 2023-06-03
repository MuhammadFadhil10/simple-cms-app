import * as React from "react";
import { Item, MutationEventType } from "@/features/web";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";

import { Pages, Webs } from "@/api";
import { Items } from "@/api/items";

export const useGlobalMutation = (
  event: MutationEventType,
  queryKey?: unknown[]
) => {
  const queryClient = useQueryClient();

  const mutationFn = React.useCallback(
    async (body?: unknown) => {
      switch (event) {
        // web
        case "CREATE_WEB": {
          return await Webs.createWeb(body);
        }

        // page
        case "CREATE_PAGE": {
          return await Pages.createPages(body);
        }

        case "DELETE_PAGE": {
          return await Pages.deletePage(body as string);
        }

        // item
        case "CREATE_ITEM": {
          return await Items.createItems(body as Partial<Item>);
        }
        case "UPDATE_ITEM": {
          return await Items.updateItems(
            (body as any).itemId,
            (body as any).payload as Partial<Item>
          );
        }
        case "DELETE_ITEM": {
          return Items.deleteItem(body as string);
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
