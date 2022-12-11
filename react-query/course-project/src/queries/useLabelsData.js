

import { useQuery } from "react-query";
import { defaultLabels } from "../helpers/defaultData";

const useLabelsData = () => useQuery(
  ["labels"],
  ({signal}) => fetch(`/api/labels`, {signal}).then(res => res.json()),
  {
    staleTime: 1000 * 60 * 60,
    placeholderData: defaultLabels,
  }
);

export default useLabelsData;