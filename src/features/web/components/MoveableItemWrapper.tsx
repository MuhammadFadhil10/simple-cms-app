import * as React from "react";
import { Item } from "../types";

interface Props {
  item: Item;
  sectionRef: HTMLDivElement;
  children: React.ReactNode;
}

export const MoveableItemWrapper = React.memo(function MoveableItemWrapper({
  item,
  children,
}: Props) {
  const targetRef = React.useRef<HTMLDivElement>(null);

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
            className="items"
            style={{
              height,
              width,
              position: "absolute",
              transform:
                item.properties.style.transform ??
                `translate(${item.position.x}px, ${item.position.y}px)`,
            }}
            data-id={item._id}
          >
            {children}
          </div>
        </>
      )}
    </>
  );
});
