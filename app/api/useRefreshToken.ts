// import axios from '../api/axios';
import { useFirebaseAuth } from "@/auth/firebase";
import { axiosPrivateInstance } from "./axiosInstances";

const useRefreshToken = () => {
  const { getFirebaseAuth } = useFirebaseAuth();

  const refresh = async () => {
    const auth = getFirebaseAuth();
    const response = await axiosPrivateInstance?.get(
      "http//:localhost:3000.com/api/custom-claims/"
      // {
      //   withCredentials: true,
      // }
    );
    // setAuth(prev => {
    //     console.log(JSON.stringify(prev));
    //     console.log(response.data.accessToken);
    //     return {
    //         ...prev,
    //         roles: response.data.roles,
    //         accessToken: response.data.accessToken
    //     }
    // });

    await auth.currentUser!.getIdToken(true);
    return response?.data;
  };
  return refresh;
};

export default useRefreshToken;
