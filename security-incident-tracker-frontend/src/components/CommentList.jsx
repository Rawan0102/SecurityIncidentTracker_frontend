import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function CommentList({ reportId, role }) {
    const [comments, setComments] = useState([]);
    const [text, setText] = useState('');
  
//   useEffect(() => {
//     fetch(`http://localhost:8000/api/reports/${reportId}/comments/`)
//       .then(res => res.json())
//       .then(data => setComments(data));
//   }, [reportId]);

  const handleSubmit = e => {
    e.preventDefault();
    fetch(`http://localhost:8000/api/reports/${reportId}/comments/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`, // if you're using auth
      },
      body: JSON.stringify({ content: text }),
    })
      .then(res => res.json())
      .then(newComment => {
        setComments([...comments, newComment]);
        setText('');
      });
  };

  return (
    <div>
      <h3>Comments</h3>

      {comments?.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        comments?.map((c) => (
         <div key={c.id}>{c.content}</div>
        ))
      )}

      {role === 'manager' && (
        <form onSubmit={handleSubmit}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a comment..."
            required
          />
          <button type="submit">Add Comment</button>
        </form>
      )}
    </div>
  );
}
