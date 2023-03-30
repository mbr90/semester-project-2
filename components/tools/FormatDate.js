export default function FormatDate({ date }) {
  const formattedDate = new Date(date).toLocaleString("nb-NO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const [formattedDatePart, formattedTimePart] = formattedDate.split(", ");

  return (
    <>
      {formattedDatePart} At {formattedTimePart}
    </>
  );
}
