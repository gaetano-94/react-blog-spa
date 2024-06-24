import React, { useState } from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_BASE_API_URL;

const CreatePost = ({ categories, onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(categories[0]?.id || '');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category', category);
    formData.append(
      'tags',
      tags.split(',').map((tag) => tag.trim())
    );
    if (image) {
      formData.append('image', image);
    }

    try {
      const { data: newPost } = await axios.post(
        `${apiUrl}/api/posts`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      onPostCreated(newPost);
      setTitle('');
      setContent('');
      setCategory(categories[0]?.id || '');
      setTags('');
      setImage(null);
    } catch (error) {
      setError('Errore durante la creazione del post.');
      console.error('Errore durante la creazione del post:', error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <form className="create-post-form" onSubmit={handleSubmit}>
      <h2>Crea Nuovo Post</h2>
      <div>
        <label>Titolo:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Contenuto:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Categoria:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Tags (separati da virgola):</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      <div>
        <label>Immagine:</label>
        <input type="file" onChange={handleImageChange} />
      </div>
      <button type="submit">Crea Post</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default CreatePost;
