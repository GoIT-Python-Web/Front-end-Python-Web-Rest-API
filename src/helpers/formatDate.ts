export function formatDate(dateString: string, type: "dot" | "iso" = "iso") {
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

  let date: Date;

  if (type === "dot") {
    const [day, month, year] = dateString.split(".");
    date = new Date(`${year}-${month}-${day}`);
  } else {
    date = new Date(dateString);
  }

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${day} ${months[month]} ${year} року`;
}
