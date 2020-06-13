import React from "react"

const PostLayout = props => {
  return (
    <>
      <h1>{props.pageContext.data.title.text}</h1>
      <div
        dangerouslySetInnerHTML={
          { __html: props.pageContext.data.content.html }
        }
      />
    </>
  )
}

export default PostLayout
