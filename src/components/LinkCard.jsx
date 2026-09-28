import { Heart, Edit2, Trash2, ExternalLink, Globe } from 'lucide-react';

export const LinkCard = ({ link, onDelete, onEdit, onToggleFavorite }) => {
  let hostname = "link";
  try {
    hostname = new URL(link.url).hostname;
  } catch {
    // Ignore invalid URL errors
  }

  return (
    <div className="link-card">
      <div className="card-header">
        <div style={{ display: 'flex', gap: '10px' }}>
            <div className="stat-icon" style={{ width: '40px', height: '40px', padding: '8px' }}>
                <Globe size={20} />
            </div>
            <div>
                <h3 className="card-title">{link.title}</h3>
                <a href={link.url} target="_blank" rel="noreferrer" className="card-url">
                    {hostname} <ExternalLink size={10} style={{ display: 'inline' }} />
                </a>
            </div>
        </div>
        <div style={{ display: 'flex', gap: '5px' }}>
            <button 
                className={`icon-btn ${link.isFavorite ? 'active' : ''}`} 
                onClick={() => onToggleFavorite(link.id)}
            >
                <Heart size={16} fill={link.isFavorite ? "currentColor" : "none"} />
            </button>
            <button className="icon-btn" onClick={() => onEdit(link)}>
                <Edit2 size={16} />
            </button>
            <button className="icon-btn" onClick={() => onDelete(link.id)}>
                <Trash2 size={16} />
            </button>
        </div>
      </div>

      <p className="card-desc">{link.description}</p>

      <div className="card-footer">
        <div className="tags">
          {(link.tags || []).map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
        <a href={link.url} target="_blank" rel="noreferrer" style={{ color: 'var(--primary-pink)', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>
            Open
        </a>
      </div>
    </div>
  );
};