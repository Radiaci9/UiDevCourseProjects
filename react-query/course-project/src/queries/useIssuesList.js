import { useQuery } from "react-query";

const useIssuesList = () => useQuery(
  ["issues"],
  () => fetch('/api/issues').then(res => res.json())
);

export default useIssuesList;