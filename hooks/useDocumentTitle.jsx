// hooks/useDocumentTitle.jsx - PERBAIKI DI SINI
import { useEffect } from "react";

export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title; // ✅ Safe: hanya jalan di browser
  }, [title]);
}
