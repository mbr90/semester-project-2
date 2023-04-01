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

export function DateNTime({ date }) {
  const formatDate = (dateObj) => {
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    return `${day}/${month}`;
  };

  const formatTime = (dateObj) => {
    const hour = String(dateObj.getHours()).padStart(2, "0");
    const minute = String(dateObj.getMinutes()).padStart(2, "0");
    return `${hour}:${minute}`;
  };

  const dateObj = new Date(date);
  const formattedDate = formatDate(dateObj);
  const formattedTime = formatTime(dateObj);

  return <>{`${formattedDate} - ${formattedTime}`}</>;
}
