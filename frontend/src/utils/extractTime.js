export function extractTime(dateString) {
  const date = new Date(dateString);

  let hours = date.getHours();
  const minutes = padZero(date.getMinutes());

  // Determine AM/PM
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 should be 12

  return `${padZero(hours)}:${minutes} ${ampm}`;
}

function padZero(number) {
  return number.toString().padStart(2, "0");
}


function formatDateHeading(dateString) {
  const date = new Date(dateString);
  const today = new Date();

  // Normalize to midnight
  const isToday = date.toDateString() === today.toDateString();

  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();

  if (isToday) return "Today";
  if (isYesterday) return "Yesterday";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export { formatDateHeading };