import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProfile } from '../../utilities/api';

export default function ProfileForm({ user }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    // bio: '',
    // location: '',
    role: '',
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      user: user.user_id,
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('form', formData)
      console.log('user', user.user_id)
      const newProfile = await createProfile(formData);
      console.log('Profile created:', newProfile);
      navigate('/profile')
    } catch (err) {
      console.error('Error creating profile:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Profile for {user.username}</h2>
      {/* <label>
        Bio:
        <input
          type="text"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
        />
      </label>
      <label>
        Location:
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
      </label> */}
      <label>
        Role:
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="">Select a role</option>
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
        </select>
      </label>
      <button type="submit">Create Profile</button>
    </form>
  );
}
