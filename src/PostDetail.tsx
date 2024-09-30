import { useEffect, useState } from 'react';

import type { Comments } from './type';

type postDetailProp = {
  id: number;
  body: string;
};

const PostDetail = ({ id, body }: postDetailProp) => {
  const [comments, setComments] = useState<Comments>();

  useEffect(() => {
    let ignore = false;
    fetchComments(id)
      .then((res) => {
        if (!ignore) setComments(res);
      })
      .catch(() => {
        alert('Cannot load comments');
      });
    return () => {
      ignore = true;
      setComments(undefined);
    };
  }, [id]);

  const fetchComments = async (postId: number) => {
    const data = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
    );
    const json = (await data.json()) as Comments;
    return json;
  };

  return (
    <div className="detailContainer">
      <div className="detailBody">
        <div className="title">내용</div>
        {body !== '' ? (
          <div className="scroll">{body}</div>
        ) : (
          <div className="loading">Loading Content...</div>
        )}
      </div>
      <div className="detailComments">
        <div className="title">댓글</div>
        <hr />
        {comments !== undefined ? (
          <div className="scroll">
            {comments.map((comment) => (
              <div key={comment.id} className="commentsItem">
                <div className="commentWriter">작성자: {comment.email}</div>
                <div className="commentBody">{comment.body}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="loading">Loading Comments...</div>
        )}
      </div>
    </div>
  );
};

export default PostDetail;
