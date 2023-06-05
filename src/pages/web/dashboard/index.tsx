import * as React from "react";
import { WebEditorLayout } from "@/features";
import { CreateWeb } from "@/features/web";

export default function CreateWebPage() {
  return <CreateWeb />;
}

CreateWebPage.getLayout = function getLayout(page: React.ReactNode) {
  return <WebEditorLayout>{page}</WebEditorLayout>;
};
