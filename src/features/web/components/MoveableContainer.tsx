import * as React from "react";
import Box from "@mui/material/Box";
import { MoveableItemWrapper } from "./MoveableItemWrapper";
import { useMoveable } from "../hooks";
import { ButtonItem } from "../item";

export const MoveableContainer = React.forwardRef(function MoveableContainer(
  props,
  ref
) {
  const { memoizedMovables } = useMoveable();

  return (
    <Box
      component="div"
      className="snapContainer elements selecto-area"
      sx={{
        width: "100%",
        height: "80%",
      }}
    >
      {/* items */}
      {memoizedMovables.map((item) => (
        <>
          <MoveableItemWrapper
            sectionRef={
              (ref as React.RefObject<HTMLDivElement>).current as HTMLDivElement
            }
            item={item}
          >
            {item.type === "button" && <ButtonItem item={item} />}
          </MoveableItemWrapper>
        </>
      ))}
    </Box>
  );
});
