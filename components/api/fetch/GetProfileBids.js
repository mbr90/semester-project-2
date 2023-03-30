import { ProfileBids } from "@/components/Variables";
import Username from "@/components/tools/Username";
import FetchLoggedIn from "./FetchLoggedIn";

const profileEndpoint = ProfileBids + Username() + "/bids";

export default function ProfileData({ props }) {
  const { data, error, isLoading } = FetchLoggedIn({
    endpoint: profileEndpoint,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }

  let value = data[props];

  return <>{JSON.stringify(value)}</>;
}
