import React from "react";

/*
  Instructions:
    Refactor `useFetch` to use `useReducer` instead of
    `useState`.
*/

const LOADING = 'LOADING'
const SUCCESS = 'SUCCESS'
const ERROR = 'ERROR'

const reducer = (state, action) => {
  switch (action.type) {
    case LOADING: {
      return {
        loading: true,
        data: null,
        error: null,
      }
    }
    case SUCCESS: {
      return {
        loading: false,
        data: action.payload,
        error: null,
      }
    }
    case ERROR: {
      return {
        loading: false,
        data: null,
        error: action.payload,
      }

    }
    default: {
      return {
        loading: false,
        data: null,
        error: 'Error',
      }
    }
  }
}

function useFetch (url) {
  const [state, dispatch] = React.useReducer(reducer, {
    loading: true,
    data: null,
    error: null
  })

  React.useEffect(() => {
    dispatch({ type: LOADING })

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: SUCCESS, payload: data })
      })
      .catch((e) => {
        console.warn(e.message)
        dispatch({ type: ERROR, payload: 'Error fetching data. Try again.' })
      })
  }, [url])

  return state
}

const postIds = [1,2,3,4,5,6,7,8]

export default function UseFetchPage() {
  const [index, setIndex] = React.useState(0)

  const { loading, data: post, error } = useFetch(
    `https://jsonplaceholder.typicode.com/posts/${postIds[index]}`
  )

  const incrementIndex = () => {
    setIndex((i) => 
      i === postIds.length - 1
        ? i
        : i + 1
    )
  }

  if (loading === true) {
    return <p>Loading</p>
  }

  if (error) {
    return (
      <React.Fragment>
        <p>{error}</p>
        <button onClick={incrementIndex}>Next Post</button>
      </React.Fragment>
    )
  }

  return (
    <div className="App">
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      {error && <p>{error}</p>}
      {index === postIds.length - 1 
        ? <p>No more posts</p>
        : <button onClick={incrementIndex}>
            Next Post
          </button>}
    </div>
  );
}
