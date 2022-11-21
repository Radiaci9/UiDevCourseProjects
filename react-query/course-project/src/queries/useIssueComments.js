

import { useQuery } from "react-query";

const useIssueData = (issueId) => useQuery(
  ["issues", issueId, "comments"],
  () => fetch(`/api/issues/${issueId}/comments`).then(res => res.json())
);

export default useIssueData;