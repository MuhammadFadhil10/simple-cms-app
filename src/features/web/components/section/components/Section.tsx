import * as React from "react";
import Stack from "@mui/material/Stack";
import { SectionWrapper } from "./SectionWrapper";
import { useSection } from "../hooks";
import Moveable from "react-moveable";

export const Section = React.memo(function Memo() {
  const { memoizedSectionWidth } = useSection();

  const sectionWrapperRef = React.useRef<HTMLDivElement>(null);
  const targetRef = React.useRef<HTMLDivElement>(null);
  const moveableRef = React.useRef<Moveable>(null);

  return (
    <>
      <div ref={targetRef} className="targetasddasadsawsdds"></div>
      <Stack
        component="div"
        ref={sectionWrapperRef}
        alignItems="center"
        justifyContent="center"
        sx={(theme) => ({
          width: memoizedSectionWidth,
          minHeight: "50px",
          backgroundColor: "transparent",
          border: "none",
          outline: `3px solid ${theme.palette.primary.main}`,
          alignSelf: "center",
          marginTop: 1,
        })}
      >
        <SectionWrapper ref={sectionWrapperRef} />
      </Stack>
      {sectionWrapperRef && (
        <Moveable
          ref={moveableRef}
          target={sectionWrapperRef}
          origin={false}
          keepRatio={false}
          snappable={true}
          snapDirections={{ top: true, left: true, bottom: true, right: true }}
          snapThreshold={5}
          verticalGuidelines={[50, 150, 250, 450, 550]}
          horizontalGuidelines={[0, 100, 200, 400, 500]}
          draggable={false}
          throttleDrag={1}
          edgeDraggable={false}
          startDragRotate={0}
          throttleDragRotate={0}
          resizable={true}
          bounds={{
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            position: "css",
          }}
          edge={[]}
          // onDrag={(e) => {
          //   e.target.style.transform = e.transform;
          //   console.log("sectionRefState: ", sectionRefState);
          // }}
          onResize={(e) => {
            e.target.style.width = `${e.width}px`;
            e.target.style.height = `${e.height}px`;
            e.target.style.transform = e.drag.transform;
          }}
          renderDirections={["s"]}
        />
      )}
    </>
  );
});
