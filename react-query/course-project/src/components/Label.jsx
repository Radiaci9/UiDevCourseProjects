import { useMemo } from "react";
import useLabelsData from "../queries/useLabelsData";

const Label = ({label}) => {
  const {isLoading: isLabelLoading, data} = useLabelsData();

  const labelData = useMemo(() => {
    if (data) return data?.find(queryLabel => queryLabel.id === label) || null;
  }, [data]);

  if (isLabelLoading || !labelData) return null;

  return <span key={label} className={`label ${labelData.color}`}>
    {labelData.name}
  </span>;
}

export default Label;