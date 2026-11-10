import { hydrateRoot } from "react-dom/client";
import { App } from "./app";
import { isLocale } from "@/lib/i18n/config";
import { pageFromPath } from "@/lib/pages";
import "@fontsource-variable/geist";
import "./styles.css";

const locale = document.documentElement.lang;
hydrateRoot(
  document.getElementById("root")!,
  <App locale={isLocale(locale) ? locale : "en"} page={pageFromPath(window.location.pathname)} />,
);
