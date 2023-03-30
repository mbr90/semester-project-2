import { useEffect, useState } from "react";

export default function IsLoggedIn({ children, fallback }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  if (isLoggedIn) {
    return <>{children}</>;
  } else {
    return <>{fallback}</>;
  }
}

// Example usage:

// <IsLoggedIn fallback={<p>You need to be logged in to see this content.</p>}>
//   <p>This content is only visible to logged-in users.</p>
// </IsLoggedIn>
