import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const EditPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/posts/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
        setImageUrl(res.data.imageUrl || '');
      } catch (err) {
        console.error(err);
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/posts/${id}`, { title, content, imageUrl });
      navigate(`/post/${id}`);
    } catch (err) {
      console.error(err);
      alert('Failed to update post');
    }
  };

  if (!user) {
    return <div className="container"><p>Please login to edit.</p></div>;
  }

  return (
    <div className="container">
      <div className="glass-panel" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h2 className="form-title">Edit Blog</h2>
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
          <button type="submit" className="btn btn-primary">Update Blog</button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
