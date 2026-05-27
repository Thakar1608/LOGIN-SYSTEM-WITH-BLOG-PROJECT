import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const PostDetails = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await axios.delete(`/posts/${id}`);
        navigate('/');
      } catch (err) {
        console.error(err);
        alert('Failed to delete post');
      }
    }
  };

  if (loading) return <div className="container"><p>Loading...</p></div>;
  if (!post) return <div className="container"><p>Post not found.</p></div>;

  const isAuthor = user && user.id === post.author;

  return (
    <div className="container">
      <div className="glass-panel single-post">
        {post.imageUrl && (
          <div className="single-post-image-wrap">
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="single-post-image"
            />
          </div>
        )}
        <div className="single-post-body">
          <h1 className="single-post-title">{post.title}</h1>
          <div className="single-post-meta">
            <span>By <strong>{post.authorName}</strong></span>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
          
          <div className="single-post-content">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {isAuthor && (
            <div className="post-actions">
              <Link to={`/edit/${post._id}`} className="btn btn-primary">Edit Post</Link>
              <button onClick={handleDelete} className="btn btn-danger">Delete Post</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
