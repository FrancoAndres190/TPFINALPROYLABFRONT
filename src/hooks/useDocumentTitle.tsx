import { useEffect } from "react";

export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = `${title} - GYM APP 2025`;
  }, [title]);
}
