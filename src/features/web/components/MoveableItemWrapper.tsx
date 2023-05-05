import * as React from "react";
import { Item } from "../types";
import Moveable from "react-moveable";
import { useMoveable } from "../hooks";

interface Props {
  item: Item;
  sectionRef: HTMLDivElement;
  children: React.ReactNode;
}

export const MoveableItemWrapper = React.memo(function MoveableItemWrapper({
  item,
  sectionRef,
  children,
}: Props) {
  const { updateMoveableProps } = useMoveable();

  const targetRef = React.useRef<HTMLDivElement>(null);
  const moveableRef = React.useRef<Moveable>(null);

  const { height, width } = item?.properties.style ?? {
    height: "100px",
    width: "100px",
  };

  return (
    <>
      {item && (
        <>
          <div
            ref={targetRef}
            className="target"
            style={{
              height,
              width,
              transform: item?.properties.style.transform ?? "",
            }}
          >
            {children}
          </div>
          {targetRef?.current && (
            <Moveable
              ref={moveableRef}
              target={targetRef}
              origin={false}
              keepRatio={false}
              snappable={true}
              snapDirections={{
                top: true,
                left: true,
                bottom: true,
                right: true,
              }}
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
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                position: "css",
              }}
              snapContainer={sectionRef}
              // scrollable={true}
              // scrollOptions={{
              //   container: sectionRef,
              //   threshold: 30,
              //   checkScrollEvent: false,
              //   throttleTime: 0,
              // }}
              onDrag={(e) => {
                e.target.style.transform = e.transform;
                console.log("e: ", e);
                updateMoveableProps(item.id, {
                  ...item.properties,
                  style: {
                    ...item.properties.style,
                    transform: e.target.style.transform,
                  },
                });
              }}
              onResize={(e) => {
                e.target.style.width = `${e.width}px`;
                e.target.style.height = `${e.height}px`;
                e.target.style.transform = e.drag.transform;
              }}
              onScroll={({ scrollContainer, direction }) => {
                scrollContainer.scrollBy(direction[0] * 10, direction[1] * 10);
              }}
              renderDirections={["se"]}
            />
          )}
        </>
      )}
    </>
  );
});
