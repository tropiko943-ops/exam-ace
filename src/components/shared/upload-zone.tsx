import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { UploadCloud, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UploadZoneProps {
  accept?: string;
  multiple?: boolean;
  hint?: string;
  onFiles?: (files: File[]) => void;
  className?: string;
}

export function UploadZone({
  accept = "image/*,application/pdf",
  multiple = true,
  hint = "PNG, JPG or PDF up to 10MB",
  onFiles,
  className,
}: UploadZoneProps) {
  const [dragOver, setDragOver] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleFiles = useCallback(
    (list: FileList | null) => {
      if (!list) return;
      const arr = Array.from(list);
      setFiles((prev) => (multiple ? [...prev, ...arr] : arr));
      onFiles?.(arr);
    },
    [multiple, onFiles],
  );

  const remove = (i: number) => setFiles(files.filter((_, idx) => idx !== i));

  return (
    <div className={cn("space-y-3", className)}>
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-secondary/30 p-10 text-center transition-smooth hover:border-foreground/20 hover:bg-secondary/50",
          dragOver && "border-primary/50 bg-primary/5",
        )}
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-background shadow-xs">
          <UploadCloud className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="space-y-0.5">
          <p className="text-sm font-medium">
            <span className="text-primary">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-muted-foreground">{hint}</p>
        </div>
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFiles(e.target.files)}
          className="sr-only"
        />
      </label>

      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((f, i) => (
            <li
              key={i}
              className="flex items-center gap-3 rounded-md border border-border bg-card p-2.5 text-sm"
            >
              <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="flex-1 truncate text-[13px]">{f.name}</span>
              <span className="text-xs text-muted-foreground tabular-nums">{(f.size / 1024).toFixed(0)} KB</span>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => remove(i)}>
                <X className="h-3.5 w-3.5" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
