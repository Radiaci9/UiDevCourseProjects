import { useState } from "react";
import useIssuesList from "../queries/useIssuesList";
import useIssueSearch from "../queries/useIssueSearch";
import IssueItem from "./IssueItem";

const IssuesList = ({labels, status}) => {
  const [searchValue, setSearchValue] = useState("");
  const {isLoading, data, isError: isIssueError, error: issueError} = useIssuesList({labels, status});
  const {fetchStatus, isLoading: isSearchLoading, data: searchedIssues} = useIssueSearch(searchValue);

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSearchValue(event.target.elements.search.value)
        }}
      >
        <label htmlFor="search">Search Issues</label>
        <input
          type="search"
          placeholder="Search"
          name="search"
          id="search"
          onChange={(event) => {
            if (event.target.value.length === 0) {setSearchValue("");}
          }}
        />
      </form>
      <h2>Issues List</h2>
      {
        isLoading ? <p>Loading...</p> : isIssueError ? <p>{issueError}</p> : fetchStatus === "idle" && isSearchLoading ? (
          <ul className="issues-list">
            {
              data.map((issue) => (
                <IssueItem
                  key={issue.id}
                  title={issue.title}
                  number={issue.number}
                  assignee={issue.assignee}
                  commentCount={issue.comments.length}
                  createdBy={issue.createdBy}
                  createdDate={issue.createdDate}
                  labels={issue.labels}
                  status={issue.status}
                />
              ))
            }
          </ul>
        ) : (
          <>
            <h2>Search Results</h2>
            {isSearchLoading ? (
              <p>Loading...</p>
            ) : (
              <>
                <p>{searchedIssues.count} Results</p>
                <ul className="issues-list">
                  {searchedIssues.items.map((issue) => (
                    <IssueItem
                      key={issue.id}
                      title={issue.title}
                      number={issue.number}
                      assignee={issue.assignee}
                      commentCount={issue.comments.length}
                      createdBy={issue.createdBy}
                      createdDate={issue.createdDate}
                      labels={issue.labels}
                      status={issue.status}
                    />
                  ))}
                </ul>
              </>
            )}
          </>
        )}
    </div>
  );
}

export default IssuesList;
