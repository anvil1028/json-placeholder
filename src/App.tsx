import './reset.css';
import './App.css';

import { useEffect, useState } from 'react';

import PostDetail from './PostDetail';
import PostList from './PostList';
import type { Posts } from './type';

export const App = () => {
  const [posts, setPosts] = useState<Posts>();
  const [selectedId, setSelectedId] = useState<number>();

  const handleId = (id: number) => {
    setSelectedId(id);
  };

  const fetchPosts = async () => {
    const data = await fetch('https://jsonplaceholder.typicode.com/posts');
    const json = (await data.json()) as Posts;
    return json;
  };

  useEffect(() => {
    fetchPosts()
      .then((res) => {
        setPosts(res);
        if (res[0] !== undefined) setSelectedId(res[0].id);
      })
      .catch(() => {
        alert('Cannot load posts');
      });
  }, []);

  return (
    <div className="container">
      <PostList posts={posts} idSelectFunction={handleId} postId={selectedId} />
      {selectedId !== undefined ? (
        <PostDetail
          id={selectedId}
          body={
            posts !== undefined && posts[selectedId] !== undefined
              ? posts[selectedId].body
              : ''
          }
        />
      ) : (
        <div className="detailContainer"></div>
      )}
    </div>
  );
};
