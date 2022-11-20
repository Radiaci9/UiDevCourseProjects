import { useMemo } from "react";
import useLabelsData from "../queries/useLabelsData";

export default function LabelList({selected, toggle}) {
  const {isLoading: isLabelLoading, data} = useLabelsData();

  if (isLabelLoading || !data) return null;

  return (
    <div className="labels">
      <h3>Labels</h3>
      {isLabelLoading ? <p>Loading...</p> : (
        <ul>
          {data.map(label => (
            <li key={label.id}>
              <button onClick={() => toggle(label.id)} className={`label ${selected.includes(label.id) ? "selected " : ""}${label.color}`}>{label.name}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
  return <h3>Labels</h3>;
}
