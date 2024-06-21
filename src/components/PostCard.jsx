import React from 'react';
import { FaCartPlus as CartIcon } from 'react-icons/fa';

const PostCard = ({ image, title, content, tags, category, published }) => {
  return (
    <div className={`post ${published ? 'published' : ''}`}>
      <div className="card-image">
        <img src={image} alt="Post" />
      </div>
      <div className="card-content">
        <h2>{title}</h2>
        {tags.length > 0 ? (
          <div>
            <strong>Tags: </strong>
            <ul>
              {tags.map((tag, index) => (
                <li key={index}>{tag.name}</li>
              ))}
            </ul>
          </div>
        ) : (
          <strong>Tags non specificati</strong>
        )}
        <div>
          <strong>Categoria: </strong>
          <ul>
            <li>{category.name}</li>
          </ul>
        </div>
        <p className={!content ? 'italic' : ''}>
          {content || 'Descrizione non disponibile'}
        </p>
      </div>
    </div>
  );
};

export default PostCard;
