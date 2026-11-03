/** Saved explicit choice wins; otherwise use the highest-quality supported tag. */
export function chooseLocale(acceptLanguage = "", cookie = "") {
  const saved = cookie.match(/(?:^|;\s*)lang=(en|bg)(?:;|$)/)?.[1];
  if (saved) return saved;
  return (
    acceptLanguage
      .split(",")
      .map((part, index) => {
        const [tag, ...params] = part.trim().split(";");
        const quality = params.find((item) => item.trim().startsWith("q="));
        return {
          locale: tag?.toLowerCase().split("-")[0],
          q: quality ? Number(quality.trim().slice(2)) : 1,
          index,
        };
      })
      .filter(({ locale, q }) => (locale === "bg" || locale === "en") && q > 0 && q <= 1)
      .sort((a, b) => b.q - a.q || a.index - b.index)[0]?.locale ?? "en"
  );
}
