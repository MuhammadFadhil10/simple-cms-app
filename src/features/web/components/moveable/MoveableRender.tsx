import * as React from "react";
import Selecto from "react-selecto";
import Moveable from "react-moveable";
import { useAppStore, useMoveable } from "@/features/web";
import { MoveableContainer } from "./MoveableContainer";

export const MoveableRender = React.forwardRef(function MoveableRender(
  // eslint-disable-next-line no-unused-vars
  props,
  ref
) {
  const { activeId, setActiveId, isHandMode } = useAppStore();
  const { memoizedMovables, updateMoveableTransform, handleResizeMoveable } =
    useMoveable();

  const [targets, setTargets] = React.useState<Array<SVGElement | HTMLElement>>(
    []
  );
  const moveableRef = React.useRef<Moveable>(null);
  const selectoRef = React.useRef<Selecto>(null);

  return (
    <>
      {ref && (
        <>
          <Moveable
            ref={moveableRef}
            draggable={true}
            // snapContainer={(ref as React.RefObject<HTMLDivElement>).current}
            target={
              targets.length > 0 && activeId.trim().length > 0
                ? targets
                : (ref as React.RefObject<HTMLDivElement>).current
            }
            useAccuratePosition={true}
            zoom={targets.length > 0 ? 1 : 0}
            origin={false}
            keepRatio={false}
            snappable={true}
            snapDirections={{
              top: true,
              left: true,
              bottom: true,
              right: true,
              center: true,
              middle: true,
            }}
            elementSnapDirections={{
              top: true,
              left: true,
              bottom: true,
              right: true,
              center: true,
              middle: true,
            }}
            elementGuidelines={[".container"]}
            snapThreshold={5}
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
            renderDirections={["se"]}
            onClickGroup={(e) => {
              selectoRef.current!.clickTarget(e.inputEvent, e.inputTarget);
            }}
            onDrag={(e) => {
              e.target.style.transform = e.transform;
            }}
            onDragEnd={(e) => {
              if (!e.isDrag) return;

              const moveable = memoizedMovables.find(
                (item) => item._id === activeId
              );

              if (!moveable) return;

              updateMoveableTransform(moveable, e.lastEvent?.transform);
            }}
            onDragGroup={(e) => {
              e.events.forEach((ev) => {
                ev.target.style.transform = ev.transform;
              });
            }}
            onResize={(e) => {
              e.target.style.width = `${e.width}px`;
              e.target.style.height = `${e.height}px`;
              e.target.style.transform = e.drag.transform;
            }}
            onResizeEnd={(e) => {
              const moveable = memoizedMovables.find(
                (item) => item._id === activeId
              );

              if (!moveable) return;

              handleResizeMoveable(
                moveable,
                e.moveable.getState()?.width,
                e.moveable.getState()?.height
              );
            }}
          />

          <Selecto
            ref={selectoRef}
            // dragContainer={(ref as React.RefObject<HTMLDivElement>).current}
            boundContainer={true}
            rootContainer={document.body}
            // scrollOptions={{
            //   container: (ref as React.RefObject<HTMLElement>)
            //     .current as HTMLElement,
            // }}
            // continueSelectWithoutDeselect={true}
            selectableTargets={[".items"]}
            hitRate={0}
            selectByClick={true}
            selectFromInside={false}
            toggleContinueSelect={["shift"]}
            ratio={0}
            onDragStart={(e) => {
              if (isHandMode) return e.stop();

              const moveable = moveableRef.current!;
              const target = e.inputEvent.target;
              if (
                moveable.isMoveableElement(target) ||
                targets.some((t) => t === target || t.contains(target))
              ) {
                e.stop();
              }
            }}
            onSelect={(e) => {
              setTargets(e.selected);

              if (!e.added[0]?.dataset) return setActiveId("");

              setActiveId(e.added[0].dataset.id as string);
            }}
            onSelectEnd={(e) => {
              if (e.selected.length === 0) return;

              const moveable = moveableRef.current!;
              if (e.isDragStart) {
                e.inputEvent.preventDefault();

                moveable.waitToChangeTarget().then(() => {
                  moveable.dragStart(e.inputEvent);
                });
              }
            }}
          />

          <MoveableContainer ref={ref} />
        </>
      )}
    </>
  );
});
