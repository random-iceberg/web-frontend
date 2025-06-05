import { useEffect, useState } from "react";

export default function useBreakpoint() {
  const query = "(min-width: 1000px)";
  const [isMdUp, setIsMdUp] = useState(
    () => window.matchMedia?.(query).matches ?? false,
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setIsMdUp(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  return { isMdUp };
}
