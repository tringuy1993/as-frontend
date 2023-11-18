// import axios from '../api/axios';
import { useFirebaseAuth } from "@/auth/firebase";
import { axiosPrivateInstance } from "./axiosInstances";

const refreshToken = async (accessToken) => {
  const { getFirebaseAuth } = useFirebaseAuth();

  const auth = getFirebaseAuth();
  const getNewAccessToken = await fetch(
    "http://localhost:3000/api/refresh-tokens/",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  await auth.currentUser!.getIdToken(true);

  const newAccessToken = await getNewAccessToken.json().then((data) => {
    return data?.idToken;
  });

  return newAccessToken;
};

export default refreshToken;
