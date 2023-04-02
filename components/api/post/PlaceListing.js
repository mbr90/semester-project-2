export default async function PlaceListing(
  title,
  description,
  inputFieldValues,
  formattedDate,
  url
) {
  try {
    const token = localStorage.getItem("token");

    const body = {
      title: title,
      description: description,
      media: inputFieldValues,
      endsAt: formattedDate,
    };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.errors[0].message);
      error.response = response;
      throw error;
    }

    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
