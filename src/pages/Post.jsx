import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PostCard from '../components/PostCard';

const apiUrl = import.meta.env.VITE_BASE_API_URL;

const Post = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  const fetchPost = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/posts/${postId}`);
      setPost(data);
    } catch (error) {
      console.error("Errore durante il recupero dell'articolo:", error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  if (!post) return <div>Caricamento dell'articolo...</div>;

  return (
    <div>
      <PostCard
        key={post.id}
        image={post.image}
        title={post.title}
        content={post.content}
        category={post.category}
        tags={post.tags}
        published={true}
      />
    </div>
  );
};

export default Post;
