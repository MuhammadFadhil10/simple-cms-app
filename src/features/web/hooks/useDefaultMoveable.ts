import * as React from "react";
import { ButtonProperties, ItemPropertiesTypes, ItemTypes } from "../types";

export const useDefaultMoveable = () => {
  // default memo
  const defaultButtonProperties: ButtonProperties = React.useMemo(() => {
    return {
      event: null,
      variant: "contained",
      style: {
        height: "30px",
        width: "100px",
      },
    };
  }, []);
  // function
  const handleGetDefaultProperties = React.useCallback(
    (type: ItemTypes): ItemPropertiesTypes | undefined => {
      switch (type) {
        case "button":
          return defaultButtonProperties;
      }
    },
    [defaultButtonProperties]
  );

  return {
    handleGetDefaultProperties,
  };
};
