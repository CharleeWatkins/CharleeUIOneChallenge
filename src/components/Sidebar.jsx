import { LayoutDashboard, Link as LinkIcon, Heart, Tag, Lock, X } from 'lucide-react';

export const Sidebar = ({ currentView, setCurrentView, isOpen, onClose }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'all', label: 'All Links', icon: LinkIcon },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'tags', label: 'Tags', icon: Tag },
  ];

  const handleItemClick = (id) => {
    setCurrentView(id);
    if (onClose) onClose();
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="logo">
          <div className="logo-icon"><Lock size={20} /></div>
          Links Vault
        </div>
        <button 
          className="icon-btn" 
          style={{ color: 'white', display: isOpen ? 'flex' : 'none' }} 
          onClick={onClose}
        >
          <X size={20} />
        </button>
      </div>
      
      <nav className="nav-links">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${currentView === item.id ? 'active' : ''}`}
            onClick={() => handleItemClick(item.id)}
          >
            <item.icon size={18} />
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};