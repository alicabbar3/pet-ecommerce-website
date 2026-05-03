"use client"

import { Plus } from "lucide-react"

import { Button } from "./ui/interfaces-button"

const sizes = [
  { label: "Secondary · Sm", size: "sm" as const },
  { label: "Secondary · Default", size: "default" as const },
  { label: "Secondary · Lg", size: "lg" as const },
  { label: "Secondary · Icon Sm", size: "icon-sm" as const, icon: true },
  { label: "Secondary · Icon", size: "icon" as const, icon: true },
  { label: "Secondary · Icon Lg", size: "icon-lg" as const, icon: true },
]

export default function ButtonSecondaryDemo() {
  return (
    <div className="flex w-full min-h-screen items-center justify-center overflow-hidden bg-background p-8 mt-[-48px] mb-[-60px] pb-[10px]">
      <div className="grid w-full max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sizes.map((item) => (
          <div
            key={item.label}
            className="flex min-h-36 flex-col rounded-xl border bg-card p-4 shadow-sm"
          >
            <p className="text-xs font-medium text-muted-foreground">{item.label}</p>
            <div className="flex flex-1 items-center justify-center pt-3">
              <Button variant="secondary" size={item.size} aria-label={item.icon ? item.label.toLowerCase() : undefined}>
                {item.icon ? <Plus className="size-4" /> : "Button"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
