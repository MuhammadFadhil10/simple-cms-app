import * as React from "react";
// import { Item } from "../types";
import Moveable from "react-moveable";

interface Props {
  //   item: Item;
  sectionRef: HTMLDivElement;
  sectionRefState: any;
  children: React.ReactNode;
}

export const MoveableItemWrapper = React.memo(function MoveableItemWrapper({
  //   item,
  sectionRef,
  children,
  sectionRefState,
}: Props) {
  const targetRef = React.useRef<HTMLDivElement>(null);
  const moveableRef = React.useRef<Moveable>(null);


  return (
    <>
      <div ref={targetRef} className="target">
        {children}
      </div>
      {targetRef && (
        <Moveable
          ref={moveableRef}
          target={targetRef}
          origin={false}
          keepRatio={false}
          snappable={true}
          snapDirections={{ top: true, left: true, bottom: true, right: true }}
          snapThreshold={5}
          verticalGuidelines={[50, 150, 250, 450, 550]}
          horizontalGuidelines={[0, 100, 200, 400, 500]}
          draggable={true}
          throttleDrag={1}
          edgeDraggable={false}
          startDragRotate={0}
          throttleDragRotate={0}
          resizable={true}
          bounds={{
            left: sectionRef?.offsetLeft,
            top: sectionRef?.offsetTop,
            right:
              window.innerWidth - sectionRef?.getBoundingClientRect().right,
            bottom:
              window.innerHeight - sectionRef?.getBoundingClientRect().bottom,
            position: "css",
          }}
          edge={[]}
          onDrag={(e) => {
            e.target.style.transform = e.transform;
            console.log("sectionRefState: ", sectionRefState);
          }}
          onResize={(e) => {
            e.target.style.width = `${e.width}px`;
            e.target.style.height = `${e.height}px`;
            e.target.style.transform = e.drag.transform;
          }}
          renderDirections={["se"]}
        />
      )}
    </>
  );
});
