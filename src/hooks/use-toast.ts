// src/hooks/use-toast.ts
import { useCallback } from "react";

export function useToast() {
  const toast = useCallback(({ title, description, variant }: { title: string; description?: string; variant?: 'destructive' }) => {
    alert(`${variant === 'destructive' ? '❌' : '✅'} ${title}\n${description ?? ''}`);
  }, []);

  return { toast };
}
