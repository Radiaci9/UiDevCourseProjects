import { useQuery } from "react-query";

const useUserData = (userId) => useQuery(
  ["users", userId],
  ({signal}) => fetch(`/api/users/${userId}`, {signal}).then(res => res.json()),
  {
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  }
);

export default useUserData;