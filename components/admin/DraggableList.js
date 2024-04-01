import { useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import {
  DndContext,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  closestCenter,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { arrayMove } from "@dnd-kit/sortable";

const SortableItem = ({ id, renderItem }) => {
  const { setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {renderItem}
    </div>
  );
};

const DraggableList = ({ items, onReorder, renderItem, getPosition }) => {
  const [activeId, setActiveId] = useState(null);
  const [theItems, setTheItems] = useState(items ? items : []);

  console.log({ items });
  console.log({ theItems });
  console.log({ activeId });

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };
  const handleDragEnd = ({ active, over }) => {
    if (over) {
      const oldIndex = theItems.findIndex((item) => item.id === active.id);
      const newIndex = theItems.findIndex((item) => item.id === over.id);
      const newItems = arrayMove(theItems, oldIndex, newIndex); // Store the result

      setTheItems(newItems); // Update the state of your items list

      const priorItemPosition =
        newIndex > 0 ? getPosition(newItems[newIndex - 1]) : null;
      const subsequentItemPosition =
        newIndex < newItems.length - 1
          ? getPosition(newItems[newIndex + 1])
          : null;

      onReorder(active.id, priorItemPosition, subsequentItemPosition);
    }
    setActiveId(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <SortableContext
        items={theItems.map(({ id }) => id)}
        strategy={verticalListSortingStrategy}
      >
        {theItems.map((item, i) => (
          <SortableItem
            key={item.id}
            id={item.id}
            handle={true}
            renderItem={renderItem(item)}
          />
        ))}
        <DragOverlay>
          {activeId ? (
            <div
              style={{
                borderRadius: "4px",
                border: "1px solid #00A69C",
                overflow: "hidden",
                boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.1)", // Updated boxShadow property
              }}
            >
              {renderItem(
                theItems.find((item) => item.id === activeId),
                theItems.findIndex((item) => item.id === activeId)
              )}
            </div>
          ) : null}
        </DragOverlay>
      </SortableContext>
    </DndContext>
  );
};

export default DraggableList;
