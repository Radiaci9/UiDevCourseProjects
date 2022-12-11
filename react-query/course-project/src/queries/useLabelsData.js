

import { useQuery } from "react-query";

const useLabelsData = () => useQuery(
  ["labels"],
  () => fetch(`/api/labels`).then(res => res.json()),
  {
    staleTime: 1000 * 60 * 60,
  }
);

export default useLabelsData;