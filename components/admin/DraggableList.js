import { CSS } from "@dnd-kit/utilities";
import {
  DndContext,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { arrayMove } from "@dnd-kit/sortable";

const SortableItem = ({ id, renderItem }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

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

const DraggableList = ({ items, onReorder, renderItem }) => {
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragEnd = ({ active, over }) => {
    if (over) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      const newItems = arrayMove(items, oldIndex, newIndex);
      onReorder(newItems);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map(({ id }) => id)}
        strategy={verticalListSortingStrategy}
      >
        {items.map((item, i) => (
          <SortableItem
            key={item.id}
            id={item.id}
            handle={true}
            renderItem={renderItem(item, i)}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default DraggableList;
