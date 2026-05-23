import { Location } from "@prisma/client";
import { reorderItinerary } from "@/lib/actions/recorder-itineraty";
import { deleteLocation } from "@/lib/actions/delete-location";
import { Trash2, GripVertical } from "lucide-react";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useId, useState } from "react";

interface SortableItineraryProps {
  locations: Location[];
  tripId: string;
}

function SortableItem({ item, tripId }: { item: Location; tripId: string }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item.id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`group p-6 glass border border-border/50 rounded-3xl flex justify-between items-center transition-all ${isDragging ? 'shadow-2xl ring-2 ring-secondary/50 scale-[1.02] z-50' : 'hover:shadow-md'}`}
    >
      <div className="flex items-center gap-4">
        <div {...attributes} {...listeners} className="p-2 hover:bg-accent rounded-xl cursor-grab active:cursor-grabbing text-muted-foreground/40 group-hover:text-muted-foreground transition-colors">
           <GripVertical size={20} />
        </div>
        <div className="space-y-1">
          <h4 className="font-bold text-foreground leading-tight"> {item.locationTitle}</h4>
          <p className="text-xs font-bold text-secondary uppercase tracking-widest">
            Stop Order: {item.order + 1}
          </p>
        </div>
      </div>
      
      <form action={() => deleteLocation(item.id, tripId)}>
        <button 
          type="submit" 
          className="p-3 text-muted-foreground/50 hover:text-destructive hover:bg-destructive/10 rounded-2xl transition-all active:scale-95"
          onClick={(e) => {
             if (!confirm("Remove this destination from your itinerary?")) {
               e.preventDefault();
             }
          }}
        >
          <Trash2 size={18} />
        </button>
      </form>
    </div>
  );
}

export default function SortableItinerary({
  locations,
  tripId,
}: SortableItineraryProps) {
  const id = useId();
  const [localLocation, setLocalLocation] = useState(locations);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = localLocation.findIndex((item) => item.id === active.id);
      const newIndex = localLocation.findIndex((item) => item.id === over!.id);

      const newLocationsOrder = arrayMove(
        localLocation,
        oldIndex,
        newIndex
      ).map((item, index) => ({ ...item, order: index }));

      setLocalLocation(newLocationsOrder);

      await reorderItinerary(
        tripId,
        newLocationsOrder.map((item) => item.id)
      );
    }
  };

  return (
    <DndContext
      id={id}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={localLocation.map((loc) => loc.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-4">
          {localLocation.map((item, key) => (
            <SortableItem key={key} item={item} tripId={tripId} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}