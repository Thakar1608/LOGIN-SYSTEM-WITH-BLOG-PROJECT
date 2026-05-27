import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('/posts');
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <div className="hero">
        <h1>Welcome to Blogverse</h1>
        <p>A place to share knowledge, experiences, and cool ideas.</p>
      </div>
      <div className="container blog-grid">
        {loading ? (
          <p>Loading posts...</p>
        ) : posts.length === 0 ? (
          <p>No posts available. Be the first to write one!</p>
        ) : (
          posts.map(post => (
            <div key={post._id} className="glass-panel blog-card">
              {post.imageUrl && (
                <div className="blog-card-image-wrap">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="blog-card-image"
                  />
                </div>
              )}
              <div className="blog-card-body">
                <h2 className="blog-card-title">{post.title}</h2>
                <p className="blog-card-meta">
                  By {post.authorName} | {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <p className="blog-card-excerpt">
                  {post.content.length > 100 ? post.content.substring(0, 100) + '...' : post.content}
                </p>
                <Link to={`/post/${post._id}`} className="btn btn-primary">Read More</Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
