export function formatDate(dateString) {
  console.log(dateString);
  const months = [
    "січня",
    "лютого",
    "березня",
    "квітня",
    "травня",
    "червня",
    "липня",
    "серпня",
    "вересня",
    "жовтня",
    "листопада",
    "грудня",
  ];

  const [day, month, year] = dateString.split(".");
  const monthName = months[parseInt(month, 10) - 1];

  return `${parseInt(day, 10)} ${monthName} ${year} року`;
}
