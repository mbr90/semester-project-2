import { ProfileBids } from "@/components/Variables";
import Username from "../tools/Username";
import FetchLoggedIn from "../api/fetch/FetchLoggedIn";

const profileEndpoint = ProfileBids + Username();

export default function RenderProfile() {
  const { data, error, isLoading } = FetchLoggedIn({
    endpoint: profileEndpoint,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }

  return <div>{JSON.stringify(data._count.listings)}</div>;
}
