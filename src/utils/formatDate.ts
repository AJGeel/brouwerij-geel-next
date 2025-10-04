export const formatDate = (value: unknown) => {
  if (!value) return "-";

  try {
    return new Date(value as string).toLocaleDateString("nl-NL");
  } catch {
    return "-";
  }
};
