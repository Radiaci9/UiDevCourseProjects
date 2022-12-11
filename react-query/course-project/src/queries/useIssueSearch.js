

import { useQuery } from "react-query";

const useIssueSearch = (searchValue) => useQuery(
  ["issues", "search", searchValue],
  () => fetch(`/api/search/issues?q=${searchValue}`).then(res => res.json()),
  {
    enabled: searchValue.length > 1,
  },
);

export default useIssueSearch;