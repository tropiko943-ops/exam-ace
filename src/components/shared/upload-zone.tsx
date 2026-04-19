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
          "flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border p-10 text-center cursor-pointer transition-smooth hover:border-primary/50 hover:bg-primary-muted/30",
          dragOver && "border-primary bg-primary-muted/50",
        )}
      >
        <div className="h-14 w-14 rounded-full bg-primary-muted flex items-center justify-center">
          <UploadCloud className="h-7 w-7 text-primary" />
        </div>
        <div className="space-y-1">
          <p className="font-medium">
            <span className="text-primary">Click to upload</span> or drag and drop
          </p>
          <p className="text-sm text-muted-foreground">{hint}</p>
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
              className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 text-sm"
            >
              <FileText className="h-4 w-4 text-primary shrink-0" />
              <span className="flex-1 truncate">{f.name}</span>
              <span className="text-xs text-muted-foreground">{(f.size / 1024).toFixed(0)} KB</span>
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
