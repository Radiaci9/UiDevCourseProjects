

import { useQuery } from "react-query";

const useIssueData = (issueId) => useQuery(
  ["issues", issueId],
  () => fetch(`/api/issues/${issueId}`).then(res => res.json())
);

export default useIssueData;