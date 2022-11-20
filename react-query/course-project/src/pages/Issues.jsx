import { useCallback, useState } from "react";
import IssuesList from "../components/IssuesList";
import LabelList from "../components/LabelList";
import StatusSelect from "../components/StatusSelect";
export default function Issues() {
  const [labels, setLabels] = useState([]);
  const [status, setStatus] = useState("");

  const toggleLabel = useCallback((label) =>
    setLabels((currentLabels) =>
      currentLabels.includes(label)
        ? currentLabels.filter((currentLabel) => currentLabel !== label)
        : currentLabels.concat(label)
    ),
    [setLabels]
  );

  return (
    <div>
      <main>
        <section>
          <h1>Issues</h1>
          <IssuesList labels={labels} status={status} />
        </section>
        <aside>
          <LabelList selected={labels} toggle={toggleLabel} />
          <h3>Status</h3>
          <StatusSelect
            value={status}
            onChange={((event) => setStatus(event.target.value))}
          />
        </aside>
      </main>
    </div>
  );
}
