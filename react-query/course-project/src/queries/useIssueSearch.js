

import { useQuery } from "react-query";

const useIssueSearch = (searchValue) => useQuery(
  ["issues", "search", searchValue],
  ({signal}) => fetch(`/api/search/issues?q=${searchValue}`, {signal}).then(res => res.json()),
  {
    enabled: searchValue.length > 1,
  },
);

export default useIssueSearch;