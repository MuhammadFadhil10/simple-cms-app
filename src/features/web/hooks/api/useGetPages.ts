import { Pages } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export const useGetPages = () => {
  const { webId } = useRouter().query;

  return useQuery({
    queryKey: ["pages"],
    queryFn: () => Pages.getPages(webId as string),
  });
};
