import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function CommentList() {
  const { reportId } = useParams();
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    fetch(`/api/reports/${reportId}/comments/`)
      .then(res => res.json())
      .then(data => setComments(data));
  }, [reportId]);

  const handleSubmit = e => {
    e.preventDefault();
    fetch(`/api/reports/${reportId}/comments/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`, // if you're using auth
      },
      body: JSON.stringify({ text }),
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
      {comments.map(c => (
        <div key={c.id}>{c.text}</div>
      ))}
      <form onSubmit={handleSubmit}>
        <textarea value={text} onChange={e => setText(e.target.value)} />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
}
