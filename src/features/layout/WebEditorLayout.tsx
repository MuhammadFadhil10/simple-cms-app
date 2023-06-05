import { useRouter } from "next/router";
import * as React from "react";

interface Props {
  children: React.ReactNode;
}

export const WebEditorLayout = ({ children }: Props) => {
  const { pathname } = useRouter();
  console.log("pathname: ", pathname);
  return (
    <>
      <title>
        {`Web - ${
          pathname === "/web/dashboard/edit/[webId]/page/[pageId]"
            ? "Edit"
            : "Dashboard"
        }`}
      </title>
      <main>{children}</main>
    </>
  );
};
