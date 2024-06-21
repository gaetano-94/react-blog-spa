import React, { useState } from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_BASE_API_URL;

const CreatePost = ({ categories, onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCreatePost = async () => {
    try {
      const response = await axios.post(`${apiUrl}/api/posts`, {
        title,
        content,
        category: selectedCategory,
        // Assuming tags are handled separately
      });
      onPostCreated(response.data);
      setTitle('');
      setContent('');
      setSelectedCategory('');
    } catch (error) {
      console.error('Errore durante la creazione del post:', error);
    }
  };

  return (
    <div className="create-post">
      <h2>Crea un nuovo Post</h2>
      <input
        type="text"
        placeholder="Titolo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Contenuto"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">Seleziona una categoria</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <button onClick={handleCreatePost}>Crea Post</button>
    </div>
  );
};

export default CreatePost;
