import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useOverlay } from "@/lib/overlay-context";

const ProjectContext = createContext<{
  selected: string | null;
  openProject: (slug: string) => void;
  closeProject: () => void;
} | null>(null);
export function ProjectProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<string | null>(null);
  const active = useRef<string | null>(null);
  const { setIsOverlayOpen } = useOverlay();
  useEffect(() => {
    const sync = () => {
      const slug =
        typeof history.state?.twofoldProject === "string" ? history.state.twofoldProject : null;
      active.current = slug;
      setSelected(slug);
      setIsOverlayOpen(Boolean(slug));
    };
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, [setIsOverlayOpen]);
  const openProject = useCallback(
    (slug: string) => {
      if (active.current === slug) return;
      const method = active.current ? "replaceState" : "pushState";
      history[method]({ ...history.state, twofoldProject: slug }, "");
      active.current = slug;
      setSelected(slug);
      setIsOverlayOpen(true);
    },
    [setIsOverlayOpen],
  );
  const closeProject = useCallback(() => {
    if (!active.current) return;
    active.current = null;
    setSelected(null);
    setIsOverlayOpen(false);
    if (history.state?.twofoldProject) history.back();
  }, [setIsOverlayOpen]);
  const value = useMemo(
    () => ({ selected, openProject, closeProject }),
    [selected, openProject, closeProject],
  );
  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
}
export function useProject() {
  const value = useContext(ProjectContext);
  if (!value) throw new Error("ProjectProvider is required");
  return value;
}
