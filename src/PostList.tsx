import type { Posts } from './type';

type postListProp = {
  posts: Posts | undefined;
  idSelectFunction: (id: number) => void;
  postId: number | undefined;
};

const PostList = ({ posts, postId, idSelectFunction }: postListProp) => {
  return (
    <div className="postContainer">
      <div className="title">포스트 목록</div>
      <hr />
      {posts !== undefined ? (
        <div className="postList scroll">
          {posts.map(({ id, title }) => (
            <div
              key={id}
              className={`postListItem ${id === postId ? 'selected' : ''}`}
              onClick={() => {
                idSelectFunction(id);
                const scroll = document.querySelectorAll(
                  '.detailContainer .scroll',
                );
                scroll.forEach((item) => {
                  item.scrollTo({ top: 0 });
                });
              }}
            >
              <div>
                {id}. {title}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="loading">Loading Postlists...</div>
      )}
    </div>
  );
};

export default PostList;
