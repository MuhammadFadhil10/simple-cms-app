import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Web } from "@/features/types";
import { useRouter } from "next/router";
import { usePage } from "../hooks";

interface Props {
  web: Web;
}

export const WebCard = React.memo(function WebCard({ web }: Props) {
  const router = useRouter();
  const { handleGetWebPages } = usePage();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ width: "200px", height: "100px", boxShadow: 3, cursor: "pointer" }}
      onClick={async () => {
        const pages = await handleGetWebPages(web._id);

        const mainPage = pages.find((page) => page.isMain);

        if (!mainPage) throw Error("Page not found");

        router.push(`/web/dashboard/edit/${web._id}/page/${mainPage._id}`);
      }}
    >
      <Typography>{web.name}</Typography>
    </Box>
  );
});
