import { useState, useMemo, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { LinkCard } from './components/LinkCard';
import { LinkModal } from './components/LinkModal';
import { DeleteModal } from './components/DeleteModal';
import { Toast } from './components/Toast';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Search, Plus, Link as LinkIcon, Heart, Tag, Menu } from 'lucide-react';
import './App.css';

function App() {
  // --- Data State (LocalStorage) ---
  const [links, setLinks] = useLocalStorage('links-vault-data', []);
  
  // --- UI State ---
  const [currentView, setCurrentView] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // --- Modal States ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [linkToDelete, setLinkToDelete] = useState(null);

  // --- Toast Notification State ---
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  // --- CRUD Operations ---
  const handleSaveLink = (link) => {
    const exists = links.find(l => l.id === link.id);
    
    if (exists) {
      setLinks(prev => prev.map(l => l.id === link.id ? link : l));
      showToast('Link updated successfully', 'success');
    } else {
      setLinks(prev => [link, ...prev]);
      showToast('Link added to your vault', 'success');
    }
  };

  const promptDeleteLink = (id) => {
    const link = links.find(l => l.id === id);
    if (link) {
      setLinkToDelete(link);
      setIsDeleteModalOpen(true);
    }
  };

  const confirmDeleteLink = () => {
    if (!linkToDelete) return;
    setLinks(prev => prev.filter(l => l.id !== linkToDelete.id));
    setIsDeleteModalOpen(false);
    setLinkToDelete(null);
    showToast('Link deleted', 'error');
  };

  const handleToggleFavorite = (id) => {
    const link = links.find(l => l.id === id);
    if (!link) return;

    const newState = !link.isFavorite;
    setLinks(prev => prev.map(l => l.id === id ? { ...l, isFavorite: newState } : l));
    showToast(newState ? 'Added to favorites' : 'Removed from favorites', 'info');
  };

  const openEditModal = (link) => {
    setEditingLink(link);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingLink(null);
    setIsModalOpen(true);
  };

  // --- Filtering Logic ---
  const filteredLinks = useMemo(() => {
    let result = links;

    if (currentView === 'favorites') {
      result = result.filter(l => l.isFavorite);
    } 

    if (searchQuery) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(link => 
        (link.title || '').toLowerCase().includes(query) ||
        (link.url || '').toLowerCase().includes(query) ||
        (link.description || '').toLowerCase().includes(query) ||
        (link.tags || []).some(tag => (tag || '').toLowerCase().includes(query))
      );
    }

    return result;
  }, [links, currentView, searchQuery]);

  // --- Stats Calculation ---
  const stats = {
    total: links.length,
    favorites: links.filter(l => l.isFavorite).length,
    tags: new Set(links.flatMap(l => l.tags || [])).size
  };

  return (
    <div className="app-container">
      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="main-content">
               {/* Header */}
        <header className="header">
          {/* Greeting */}
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
            {currentView === 'dashboard' ? 'Hey, Charleé!' : 
             currentView === 'favorites' ? 'Your Favorites' : 'My Vault'}
          </h1>

          {/* Search Bar  */}
          <div className="search-bar">
            <Search size={18} color="#999" />
            <input 
              placeholder="Search bookmarks..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Subtext (moved to second line) */}
          <p className="header-subtext">
            You have {stats.total} saved links
          </p>

          {/* Hamburger Button (only visible on mobile) */}
          <button 
            className="hamburger-btn" 
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
        </header>

        {/* Dashboard Stats */}
        {currentView === 'dashboard' && (
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon"><LinkIcon size={24} /></div>
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Total Links</p>
                <h2 style={{ fontSize: '1.5rem' }}>{stats.total}</h2>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><Heart size={24} /></div>
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Favorites</p>
                <h2 style={{ fontSize: '1.5rem' }}>{stats.favorites}</h2>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><Tag size={24} /></div>
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Tags Created</p>
                <h2 style={{ fontSize: '1.5rem' }}>{stats.tags}</h2>
              </div>
            </div>
          </div>
        )}

        {/* Action Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div className="select-wrapper">
             <select 
                onChange={(e) => setCurrentView(e.target.value)}
                value={currentView}
             >
                <option value="dashboard">All Tags</option>
                <option value="all">All Links</option>
                <option value="favorites">Favorites</option>
             </select>
          </div>
          <button className="btn-primary" onClick={openAddModal}>
            <Plus size={18} /> Add New Link
          </button>
        </div>

        {/* Links Grid OR Empty State */}
        {filteredLinks.length > 0 ? (
          <div className="links-grid">
            {filteredLinks.map(link => (
              <LinkCard 
                key={link.id} 
                link={link} 
                onDelete={promptDeleteLink}
                onEdit={openEditModal}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="stat-icon" style={{ marginBottom: '1rem', padding: '20px' }}>
                <LinkIcon size={40} />
            </div>
            <h2>{searchQuery ? 'No results found' : 'Your vault is empty'}</h2>
            <p style={{ margin: '10px 0 20px' }}>
              {searchQuery 
                ? `Nothing matched "${searchQuery}". Try a different search.` 
                : 'Start saving your favorite links, technical resources, and documentation pages.'}
            </p>
            {!searchQuery && (
              <button className="btn-primary" onClick={openAddModal}>
                  <Plus size={18} /> Add Your First Link
              </button>
            )}
          </div>
        )}

      </main>

      {/* Add/Edit Modal */}
      <LinkModal 
        key={editingLink ? editingLink.id : 'new-link'}
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveLink}
        editingLink={editingLink}
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeleteLink}
        linkTitle={linkToDelete ? linkToDelete.title : ''}
      />

      {/* Mobile Sidebar Overlay */}
      <div 
        className={`sidebar-overlay ${isSidebarOpen ? 'active' : ''}`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      {/* Toast Notifications Container */}
      <div className="toast-container">
        {toasts.map(toast => (
          <Toast key={toast.id} message={toast.message} type={toast.type} />
        ))}
      </div>

    </div>
  );
}

export default App;