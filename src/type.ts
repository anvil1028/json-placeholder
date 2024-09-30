type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type Comment = {
  body: string;
  email: string;
  id: number;
  name: string;
  postId: number;
};

export type Comments = Comment[];
export type Posts = Post[];
