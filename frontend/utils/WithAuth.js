import { useRouter } from "next/router";
import { useEffect } from "react";
import { getTokenCookie } from "./HandleCookie";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = getTokenCookie();
      if (!token) {
        router.push("/Login");
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;