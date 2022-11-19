import { useQuery } from "react-query";

const useUserData = (userId) => useQuery(
  ["users", userId],
  () => fetch(`/api/users/${userId}`).then(res => res.json())
);

export default useUserData;