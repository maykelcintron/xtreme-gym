"use client";
import { useState } from "react";
import QuickActions from "./QuickActions";
import ProductSidePanel from "../inventory/ProductSidePanel";
import { saveProductAction } from "@/actions/actions";

export default function DashboardClientWrapper({
  categories,
}: {
  categories: string[];
}) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleSave = async (data: any) => {
    const res = await saveProductAction(data);
    if (res.success) {
      setIsPanelOpen(false);
      // La página se refrescará sola gracias al revalidatePath en la acción
    }
  };

  return (
    <>
      <QuickActions onOpenPanel={() => setIsPanelOpen(true)} />
      {isPanelOpen && (
        <ProductSidePanel
          categories={categories}
          onClose={() => setIsPanelOpen(false)}
          onSave={handleSave}
        />
      )}
    </>
  );
}
