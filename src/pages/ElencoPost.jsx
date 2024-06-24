import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import CreatePost from '../components/CreatePost';

const apiUrl = import.meta.env.VITE_BASE_API_URL;

const ElencoPost = () => {
  const [posts, setPosts] = useState(null);
  const [categories, setCategories] = useState([]);

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/posts`);
      setPosts(data);
    } catch (error) {
      console.error('Errore durante il recupero degli articoli:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/categories`);
      setCategories(data);
    } catch (error) {
      console.error('Errore durante il recupero delle categorie:', error);
    }
  };

  const handlePostCreated = (newPost) => {
    setPosts((prevPosts) => [...prevPosts, newPost]);
  };

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  return (
    <>
      <CreatePost categories={categories} onPostCreated={handlePostCreated} />
      <div className="posts">
        {posts === null && 'Caricando posts...'}
        {posts?.length === 0 && 'Nessun post trovato.'}
        {posts?.length > 0 &&
          posts.map((post) => (
            <Link to={`/posts/${post.id}`} key={post.id}>
              <PostCard
                image={post.image}
                title={post.title}
                content={post.content}
                category={post.category}
                tags={post.tags}
                published={false}
              />
            </Link>
          ))}
      </div>
    </>
  );
};

export default ElencoPost;
