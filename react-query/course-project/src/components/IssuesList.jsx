import { useState } from "react";
import useIssuesList from "../queries/useIssuesList";
import useIssueSearch from "../queries/useIssueSearch";
import IssueItem from "./IssueItem";
import Loader from "./Loader";

const IssuesList = ({labels, status, pageNum, setPageNum}) => {
  const [searchValue, setSearchValue] = useState("");
  const issuesQuery = useIssuesList({labels, status, pageNum });
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
      <h2>Issues List {issuesQuery.isFetching ? <Loader /> : null}</h2>
      {
        issuesQuery.isLoading ? <p>Loading...</p> : issuesQuery.isError ? <p>{issuesQuery.error}</p> : fetchStatus === "idle" && isSearchLoading ? (
          <>
            <ul className="issues-list">
              {
                issuesQuery.data.map((issue) => (
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
            <div className="pagination">
              <button
                onClick={() => {
                  if (pageNum - 1 > 0) {
                    setPageNum(pageNum - 1);
                  }
                }}
                disabled={pageNum === 1}
              >
                Previous
              </button>
              <p>
                Page {pageNum} {issuesQuery.isFetching ? "..." : ""}
              </p>
              <button
                disabled={
                  issuesQuery.data?.length === 0 || issuesQuery.isPreviousData
                }
                onClick={() => {
                  if (
                    issuesQuery.data?.length !== 0 &&
                    !issuesQuery.isPreviousData
                  ) {
                    setPageNum(pageNum + 1);
                  }
                }}
              >
                Next
              </button>
            </div>
          </>
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

