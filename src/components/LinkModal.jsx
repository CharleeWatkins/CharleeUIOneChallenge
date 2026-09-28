import { useState } from 'react';

export const LinkModal = ({ isOpen, onClose, onSave, editingLink }) => {
  const [formData, setFormData] = useState(() => {
    if (editingLink) {
      return {
        title: editingLink.title || '',
        url: editingLink.url || '',
        description: editingLink.description || '',
        isFavorite: editingLink.isFavorite || false,
      };
    }
    return { title: '', url: '', description: '', isFavorite: false };
  });

  const [tagInput, setTagInput] = useState(() => {
    return editingLink ? editingLink.tags.join(', ') : '';
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.url) return;

    const tagsArray = tagInput.split(',').map(t => t.trim()).filter(Boolean);

    const newLink = {
      id: editingLink ? editingLink.id : crypto.randomUUID(),
      title: formData.title,
      url: formData.url,
      description: formData.description || '',
      tags: tagsArray,
      isFavorite: formData.isFavorite || false,
      dateAdded: editingLink ? editingLink.dateAdded : Date.now(),
    };

    onSave(newLink);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{editingLink ? 'Edit Link' : 'Add New Link'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input 
              required
              value={formData.title} 
              onChange={(e) => setFormData({...formData, title: e.target.value})} 
              placeholder="e.g. React Documentation"
            />
          </div>
          <div className="form-group">
            <label>URL</label>
            <input 
              required
              type="url"
              value={formData.url} 
              onChange={(e) => setFormData({...formData, url: e.target.value})} 
              placeholder="https://..."
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea 
              rows={3}
              value={formData.description} 
              onChange={(e) => setFormData({...formData, description: e.target.value})} 
            />
          </div>
          <div className="form-group">
            <label>Tags (comma separated)</label>
            <input 
              value={tagInput} 
              onChange={(e) => setTagInput(e.target.value)} 
              placeholder="React, Frontend, Tutorial"
            />
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-outline">Cancel</button>
            <button type="submit" className="btn-primary">Save Link</button>
          </div>
        </form>
      </div>
    </div>
  );
};