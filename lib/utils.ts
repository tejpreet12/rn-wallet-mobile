export function formatDate(dateString: string) {
  // format date nicely
  // example: from this 👉 2025-08-28 18:34:23.122188 to this 👉 August 28, 2025
  const date = new Date(dateString.split('.')[0]); // Remove microseconds part
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}