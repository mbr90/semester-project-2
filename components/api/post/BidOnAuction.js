export default async function BidOnAuction(url, amount) {
  try {
    const token = localStorage.getItem("token");

    const body = { amount };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
