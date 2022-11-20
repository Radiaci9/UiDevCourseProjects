

import { useQuery } from "react-query";

const useLabelsData = () => useQuery(
  ["labels"],
  () => fetch(`/api/labels`).then(res => res.json())
);

export default useLabelsData;