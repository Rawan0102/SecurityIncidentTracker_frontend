import React, { useState } from 'react';
import { createProfile } from '../../utilities/api';

export default function ProfileForm({ userId }) {
  const [formData, setFormData] = useState({
    user: userId,
    bio: '',
    location: '',
    role: '',
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProfile = await createProfile(formData);
      console.log('Profile created:', newProfile);
    } catch (err) {
      console.error('Error creating profile:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Profile</h2>
      <label>
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
      </label>
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
