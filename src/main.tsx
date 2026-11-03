import { hydrateRoot } from "react-dom/client";
import { App } from "./app";
import { isLocale } from "@/lib/i18n/config";
import "@fontsource-variable/geist";
import "@fontsource/instrument-serif/latin-400-italic.css";
import "./styles.css";

const locale = document.documentElement.lang;
hydrateRoot(document.getElementById("root")!, <App locale={isLocale(locale) ? locale : "en"} />);
