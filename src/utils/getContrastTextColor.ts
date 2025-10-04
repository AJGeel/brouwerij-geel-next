export function getContrastTextColor(hex: string): string {
  // Strip leading #
  const c = hex.substring(1);
  const rgb = parseInt(c, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = rgb & 0xff;

  // Calculate luminance (WCAG formula)
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  return luminance > 140 ? "#000000" : "#FFFFFF";
}
