import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/posts', { title, content, imageUrl });
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Failed to create post');
    }
  };

  if (!user) {
    return <div className="container"><p>Please login to write a blog.</p></div>;
  }

  return (
    <div className="container">
      <div className="glass-panel" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h2 className="form-title">Write a New Blog</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input 
              type="text" 
              className="form-control" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input 
              type="text" 
              className="form-control" 
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea 
              className="form-control" 
              rows="10"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required 
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Publish Blog</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
