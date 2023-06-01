import { Webs } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useGetWebs = () => {
  return useQuery({ queryKey: ["webs"], queryFn: Webs.getWebs });
};
