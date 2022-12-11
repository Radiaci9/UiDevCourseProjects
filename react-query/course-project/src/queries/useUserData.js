import { useQuery } from "react-query";

const useUserData = (userId) => useQuery(
  ["users", userId],
  () => fetch(`/api/users/${userId}`).then(res => res.json()),
  {
    enabled: !!userId,
    staleTime: 1000 *60,
  }
);

export default useUserData;