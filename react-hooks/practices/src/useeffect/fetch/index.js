import React, { useEffect, useState } from "react";

import "./styles.css";

/*
  Instructions:
    You're given an array of `postIds` and a `fetchPost` function.
    When you invoke `fetchPost`, you'll need to pass it an `id` from
    the `postIds` array. `fetchPost` returns a promise that will resolve
    with a post shaped like this

    {
      "userId": 1,
      "id": 1,
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    }

    The UI should show `Loading` if the request is still being made,
    an error message if there was an error, or the post title, body,
    and a button to fetch the next post on a successful request.
*/

const postIds = [1,2,3,4,5,6,7,8]

function fetchPost (id) {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((res) => res.json())
}

export default function FetchPage() {
  const [loading, setLoading] = useState(false)
  const [index, setCurIndex] = useState(0)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setData(null)
    setError(null)
    fetchPost(postIds[index])
      .then((data) => {
        setData(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }, [index])

  const nextPost = () => {
    setCurIndex((prevIndex) => prevIndex === (postIds.length - 1) ? 0 : prevIndex + 1)
  }

  return (
    <div className="fetchApp">
      <button
        type="button"
        className="fetchBtn"
        onClick={nextPost}
      >
        Next post
      </button>
      {
        loading && <h2>Loading...</h2>
      }
      {
        error
      }
      {
        data && (
          <>
            <h2>{data.title}</h2>
            <p>{data.body}</p>
          </>
        )
      }
    </div>
  );
}
