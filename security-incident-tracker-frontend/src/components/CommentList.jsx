import React, { useEffect, useState } from 'react';
import './CommentList.css'
import * as reportAPI from '../utilities/report-api'

export default function CommentList({ reportId, role, user }) {
    const [comments, setComments] = useState([]);
    const [text, setText] = useState('');
    const [message, setMessage] = useState('');
  
//   useEffect(() => {
//     fetch(`http://localhost:8000/api/reports/${reportId}/comments/`)
//       .then(res => res.json())
//       .then(data => setComments(data));
//   }, [reportId]);

  // const handleSubmit = e => {
  //   e.preventDefault();
  //   fetch(`http://localhost:8000/api/reports/${reportId}/comments/`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${localStorage.getItem('token')}`, // if you're using auth
  //     },
  //     body: JSON.stringify({ content: text }),
  //   })
  //     .then(res => res.json())
  //     .then(newComment => {
  //       setComments([...comments, newComment]);
  //       setText('');
  //     });
  // };
  console.log(user)
  useEffect(() => {
    async function fetchComments() {
      try {
        const commentData = await reportAPI.getComments(reportId)
        console.log(`comments for report ${reportId}`, commentData)
        setComments([...commentData])
      } catch (err) {
        console.log(err)
        setMessage('Could not load comments: ' + err.message)
      }
    }
    fetchComments()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!reportId) {
      setMessage("❌ No report ID provided.");
      return;
    }
    try {
      const newComment = await reportAPI.createComment({content: text, report: reportId}, reportId)
      setText('')
      setComments([...comments, newComment])
    } catch (err) {
      setMessage('❌ Error: ' + err.message);
    }
  }

  return (
    <div>
      <h3>Comments</h3>

      {comments?.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        comments?.map((c) => (
         <div key={c.id}>
          <p><b>{c.author_username}:</b> {c.content}
            {/* {user.user_id == c.author && 
              <button>Edit</button>
            } */}
          </p>
        </div>
        ))
      )}
      
      {message && <p>{message}</p>}

      {role === 'manager' && (
        <form onSubmit={handleSubmit} className='comment-form'>
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