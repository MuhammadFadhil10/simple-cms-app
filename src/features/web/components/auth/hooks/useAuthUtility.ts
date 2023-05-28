import * as React from "react";
import { Field } from "@/features";

export const useAuthUtility = () => {
  const signinFields: Field[] = React.useMemo(() => {
    return [
      {
        name: "email",
        type: "email",
        label: "email",
      },
      {
        name: "password",
        type: "password",
        label: "password",
      },
    ] as Field[];
  }, []);

  const signupFields: Field[] = React.useMemo(() => {
    return [
      {
        name: "name",
        type: "text",
        label: "name",
      },
      {
        name: "email",
        type: "email",
        label: "email",
      },
      {
        name: "password",
        type: "password",
        label: "password",
      },
    ] as Field[];
  }, []);

  return { signinFields, signupFields };
};
