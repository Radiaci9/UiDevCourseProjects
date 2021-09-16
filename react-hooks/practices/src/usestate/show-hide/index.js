import React, { useState } from "react";
import "./styles.css";

/*
  Instructions:
    Given the array of "posts", recreate the functionality for this app. 
    By default, each post preview is cut off until the user clicks "Open". 
    Only one post can be "Open" at a time.
*/

function ShowHide ({ posts }) {
  const [selectedId, setSelectedId] = useState(null)

  const openPost = (id) => {
    console.log(11, id);
    setSelectedId(id)
  }

  return (
    <div>
      <ul>
        {
          posts.map((post) => {
            const isOpen = post.id === selectedId

            const textToShow = isOpen ? post.text : post.text.substring(0, 100) + '...'

            return (
              <li className="showHideLi" style={{border: isOpen ? '1px solid white' : 'none'}} key={post.id}>
                <img className="showHideImg" src={post.url} alt="Post" />
                <p>{textToShow}</p>
                {
                  !isOpen &&
                    <button className="showHideBtn" onClick={() => openPost(post.id)}>Open</button>
                }
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default function ShowHidePage () {
  return <ShowHide posts={[
    {
      id: 0,
      img: 'https://ui.dev/images/content/code-splitting.png',
      text: 'Code splitting has gained popularity recently for its ability to allow you to split your app into separate bundles your users can progressively load. In this post we’ll take a look at not only what code splitting is and how to do it, but also how to implement it with React Router.'
    },
    {
      id: 1,
      img: 'https://ui.dev/images/content/composition-vs-inheritance.png',
      text: 'The problem with object-oriented languages is they’ve got all this implicit environment that they carry around with them. You wanted a banana but what you got was a gorilla holding the banana and the entire jungle. - Joe Armstrong.'
    },
    {
      id: 2,
      img: 'https://ui.dev/images/content/modules.png',
      text: 'I’ve taught JavaScript for a long time to a lot of people. Consistently the most commonly under-learned aspect of the language is the module system. There’s good reason for that. Modules in JavaScript have a strange and erratic history. In this post we’ll walk through that history and you’ll learn modules of the past to better understand how JavaScript modules work today.'
    }
  ]} />
}