import { useQuery } from "react-query";

const useUsers = () => useQuery(["users"], ({signal}) =>
  fetch("/api/users", {signal}).then((res) => res.json())
);

export default useUsers;