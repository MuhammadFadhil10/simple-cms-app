import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Selecto from "react-selecto";
import Moveable from "react-moveable";
import { useSection } from "../hooks/useSection";
import { useDrop, DropTargetMonitor } from "react-dnd";
import {
  AddItemButton,
  ButtonItem,
  ItemTypes,
  useAppStore,
  useMoveable,
} from "@/features/web";
import { MoveableItemWrapper } from "../../MoveableItemWrapper";
import { useRouter } from "next/router";

export const SectionWrapper = React.memo(function SectionWrapper() {
  const router = useRouter();
  const { webId } = router.query;

  const { activeId, setActiveId } = useAppStore();
  const { acceptedItems } = useSection();
  const { currentMoveables, handleCreateMoveable, updateMoveable } =
    useMoveable();

  const [targets, setTargets] = React.useState<Array<SVGElement | HTMLElement>>(
    []
  );
  const boxRef = React.useRef<HTMLDivElement>(null);
  const moveableRef = React.useRef<Moveable>(null);
  const selectoRef = React.useRef<Selecto>(null);

  const [, drop] = useDrop(
    () => ({
      accept: acceptedItems,
      drop(_item: string, monitor) {
        const type = monitor.getItemType();
        handleCreateMoveable(type as ItemTypes, localStorage?.webId as string);
        return undefined;
      },
      collect: (monitor: DropTargetMonitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        draggingColor: monitor.getItemType() as string,
      }),
    }),
    []
  );

  return (
    <Stack
      ref={drop}
      className="container"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "transparent",
      }}
    >
      {boxRef && (
        <>
          <Moveable
            ref={moveableRef}
            draggable={true}
            target={targets.length > 0 ? targets : boxRef.current}
            zoom={targets.length > 0 ? 1 : 0}
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
            snapContainer={boxRef.current}
            renderDirections={["se"]}
            onClickGroup={(e) => {
              selectoRef.current!.clickTarget(e.inputEvent, e.inputTarget);
            }}
            onDrag={(e) => {
              e.target.style.transform = e.transform;
            }}
            onDragEnd={(e) => {
              const moveable = currentMoveables.find(
                (item) => item.id === activeId
              );

              if (!moveable) return;

              updateMoveable(activeId, {
                ...moveable,
                properties: {
                  ...moveable.properties,
                  style: {
                    ...moveable.properties.style,
                    transform: e.lastEvent?.transform ?? "",
                  },
                },
              });
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
          ></Moveable>

          <Selecto
            ref={selectoRef}
            dragContainer={boxRef.current}
            boundContainer={boxRef.current}
            selectableTargets={[".items"]}
            hitRate={0}
            selectByClick={true}
            selectFromInside={true}
            toggleContinueSelect={["shift"]}
            ratio={0}
            onDragStart={(e) => {
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

              if (!e.added[0]?.dataset) return;

              setActiveId(e.added[0].dataset.id as string);
            }}
            onSelectEnd={(e) => {
              const moveable = moveableRef.current!;
              if (e.isDragStart) {
                e.inputEvent.preventDefault();

                moveable.waitToChangeTarget().then(() => {
                  moveable.dragStart(e.inputEvent);
                });
              }
            }}
          ></Selecto>
        </>
      )}
      <Box
        component="div"
        ref={boxRef}
        className="snapContainer elements selecto-area"
        sx={{
          width: "100%",
          height: "80%",
          // display: "flex",
          // alignItems: "centee",
          // justifyContent: "center",
        }}
      >
        {/* no items */}
        {currentMoveables.filter((item) => item.webId === (webId as string))
          .length === 0 && <AddItemButton />}

        {/* items */}
        {currentMoveables
          .filter((item) => item.webId === (localStorage.webId as string))
          .map((item) => (
            <>
              <MoveableItemWrapper
                sectionRef={boxRef?.current as HTMLDivElement}
                item={item}
              >
                {item.type === "button" && <ButtonItem item={item} />}
              </MoveableItemWrapper>
            </>
          ))}
      </Box>
    </Stack>
  );
});
