import FetchLoggedIn from "./FetchLoggedIn";

export default function GetProfileData({ endpoint }) {
  const { data, error, isLoading } = FetchLoggedIn({
    endpoint,
  });

  if (isLoading) {
    return "";
  }

  if (error) {
    return error.message;
  }

  return data;
}
