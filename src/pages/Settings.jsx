import React, { useState } from 'react';
import '../styles/ProfileSettings.css';

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('user@example.com');

  const saveSettings = (e) => {
    e.preventDefault();
    if (newPassword && newPassword !== confirmPassword) {
        alert("New passwords do not match!");
        return;
    }

    console.log("Saving settings...");
    alert('Settings saved!');

 
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="profile-settings-container">
      <h2 className="section-title">Account Settings</h2>

      <form onSubmit={saveSettings} className="settings-form-card">
        <div className="form-group checkbox-group">
          <label htmlFor="notifications-toggle" className="toggle-label">
            Enable Marketing Notifications
          </label>
           <input 
              id="notifications-toggle"
              type="checkbox" 
              checked={notifications} 
              onChange={() => setNotifications(!notifications)}
              className="toggle-switch"
            />
        </div>
        <div className="form-group">
          <label htmlFor="email-input">Email Address</label>
          <input 
            id="email-input"
            type="email" 
            placeholder="Enter new email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="current-password">Change Password</label>
          <input 
            id="current-password"
            type="password" 
            placeholder="Current Password (required to save)" 
            value={currentPassword} 
            onChange={e => setCurrentPassword(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <input 
            type="password" 
            placeholder="New Password" 
            value={newPassword} 
            onChange={e => setNewPassword(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <input 
            type="password" 
            placeholder="Confirm New Password" 
            value={confirmPassword} 
            onChange={e => setConfirmPassword(e.target.value)} 
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn">Save Settings</button>
        </div>

      </form>
    </div>
  );
};

export default Settings;
