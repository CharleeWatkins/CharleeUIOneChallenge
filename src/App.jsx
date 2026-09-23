// src/App.jsx
import { useState, useEffect } from 'react';
import './App.css';
import { FiSearch, FiPlay, FiTwitter, FiInstagram, FiFacebook, FiMenu, FiX } from 'react-icons/fi';
import { FaDiscord } from 'react-icons/fa';

//ARRAYS //
const heroStats = [
  { value: '27k +', label: 'Art works' },
  { value: '20k +', label: 'Auctions' },
  { value: '7k +',  label: 'Artists' },
];

const popularData = [
  { id: 1, name: 'Crypto', author: 'Joshua Yang', price: '1.75 ETH', likes: '39k', img: '/images/imageone.jpg' },
  { id: 2, name: 'Versace', author: 'Mia Chen', price: '2.4 ETH',  likes: '48k', img: '/images/imagetwo.jpg' },
  { id: 3, name: 'Digital Decade', author: 'Anthony Gorgas', price: '2.4 ETH', likes: '50k', img: '/images/imagefour.jpg', featured: true },
  { id: 4, name: 'Winter Jamz', author: 'Steve Miller', price: '2.1 ETH',  likes: '47k', img: '/images/imagethree.jpg' },
  { id: 5, name: 'Praxel Wifey', author: 'Jane Doe',   price: '2.1 ETH',  likes: '45k', img: '/images/imagefive.jpg' },
];

const sellersData = [
  { id: 1, name: 'Leighton Kramer', price: '276.7 Eth', img: '/images/images.jpg' },
  { id: 2, name: 'Haylie Arcand', price: '345.6 Eth', img: '/images/downloadtwo.jpg' },
  { id: 3, name: 'Bowen Higgins', price: '323.7 Eth', img: '/images/downloadei.jpg' },
  { id: 4, name: 'Saige Fuentes', price: '347.7 Eth', img: '/images/downloadsix.jpg' },
  { id: 5, name: 'Sophie Melodin', price: '230.6 Eth', img: '/images/downloadfour.jpg' },
  { id: 6, name: 'Jeremy Burch', price: '267.9 Eth', img: '/images/downloadone.jpg' },
  { id: 7, name: 'Amelio Griffith', price: '394.1 Eth', img: '/images/downloadni.jpg' },
  { id: 8, name: 'Isabelle Hart', price: '289.1 Eth', img: '/images/downloadsev.jpg' },
  { id: 9, name: 'Diego Bentley', price: '290.7 Eth', img: '/images/downloadfive.jpg' },
  { id: 10, name: 'Daisy Armand', price: '205.4 Eth', img: '/images/downloadthree.jpg' },
];

const exploreData = [
  { id: 1, title: 'Abstract', items: '30 items', imgs: ['/images/imagef.jpg','/images/imageon.jpg','/images/imagetw.jpg','/images/imagesi.jpg']},
  { id: 2, title: '3D Art', items: '45 items', imgs: ['/images/imagethr.jpg','/images/imagete.jpg','/images/imfive.jpg','/images/imageei.jpg']},
  { id: 3, title: 'Modern Art', items: '59 items', imgs: ['/images/imel.jpg','/images/imagefi.jpg','/images/imagesi.jpg','/images/imagetwe.jpg']},
  { id: 4, title: 'Game', items: '25 items', imgs: ['/images/imageele.jpg','/images/imte.jpg','/images/imthree.jpg','/images/imtw.jpg']},
  { id: 5, title: 'Graffiti', items: '36 items', imgs: ['/images/imni.jpg','/images/imone.jpg','/images/imei.jpg','/images/infour.jpg']},
  { id: 6, title: 'Watercolor', items: '40 items', imgs: ['/images/imageni.jpg','/images/imsev.jpg','/images/imtwo.jpg','/images/imte.jpg']},
];

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeNav] = useState('Home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // TODO: Replace with real logic (wallet connect, navigation, modals)
  const handleRegister = () => alert('Register clicked (TODO: open signup modal)');
  const handleDiscover = () => alert('Discover clicked (TODO: navigate to explore)');
  const handleCreate = () => alert('Create clicked (TODO: navigate to create page)');
  const handlePlaceBid = () => alert('Place Bid clicked (TODO: open bid modal)');
  const handlePurchase = () => alert('Purchase clicked (TODO: open checkout)');
  const handleJoinCommunity = () => alert('Join Community clicked (TODO: open Discord invite)');
  const handleVideo = () => alert('TODO: Play intro video');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Searching for: "${searchQuery}" (TODO: wire up to search results)`);
    }
  };

  return (
    <>
      {/* --- STICKY NAVBAR --- */}
      <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="content-wrapper navbar-inner">
          <div className="logo">PLAY<span>NFT</span></div>

          <div className="nav-links">
            <a href="#home" className={activeNav === 'Home' ? 'active' : ''}>Home</a>
            <a href="#explore">Explore</a>
            <a href="#marketplace">Marketplace</a>
            <a href="#artists">Artists</a>
            <a href="#news">News</a>
          </div>

          <div className="nav-actions">
            <form className="search-pill" onSubmit={handleSearchSubmit}>
              <FiSearch />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search NFTs"
              />
            </form>
            <button className="btn btn-primary" onClick={handleRegister}>Register</button>
            <button
              className="hamburger"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <div className={`mobile-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
          <a href="#home" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
          <a href="#explore" onClick={() => setIsMobileMenuOpen(false)}>Explore</a>
          <a href="#marketplace" onClick={() => setIsMobileMenuOpen(false)}>Marketplace</a>
          <a href="#artists" onClick={() => setIsMobileMenuOpen(false)}>Artists</a>
          <a href="#news" onClick={() => setIsMobileMenuOpen(false)}>News</a>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="hero content-wrapper">
        <div className="hero-content">
          <h1>Discover, Collect and Sell Dope Art and NFTs</h1>
          <p>
            The world's largest digital marketplace for crypto collections
            and non fungible tokens (NFTs).
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={handleDiscover}>Discover</button>
            <button className="btn btn-outline" onClick={handleCreate}>Create</button>
            <button className="video-btn" onClick={handleVideo}>
              <FiPlay /> Watch a video
            </button>
          </div>

          {/* Stats card */}
          <div className="hero__stats">
            {heroStats.map((stat, i) => (
              <div className="hero__stat" key={stat.label}>
                {i > 0 && <span className="hero__divider" aria-hidden="true" />}
                <div>
                  <div className="hero__stat-value">{stat.value}</div>
                  <div className="hero__stat-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Users block */}
          <div className="hero__users">
            <div className="hero__avatars">
              <img src='/images/downloadei.jpg' alt="User" />
              <img src='/images/downloadone.jpg' alt="User" />
              <img src='/images/downloadfive.jpg' alt="User" />
              <img src='/images/downloadsev.jpg' alt="User" />
              <img src='/images/downloadfour.jpg' alt="User" />
            </div>
            <div>
              <div className="hero__stat-value">40k +</div>
              <div className="hero__stat-label">Active Users</div>
            </div>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <div className="nft-card">
            <img src="/images/imagesix.jpg" alt="NFT Art" className="nft-image" />

            <div className="nft-overlay-content">
              <div className="nft-info">
                <div>
                  <h4>Ending In:</h4>
                  <p>1h 20m 30s</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <h4>Highest Bid</h4>
                  <p>32.4 ETH</p>
                </div>
              </div>

              <div className="nft-actions">
                <button className="btn btn-primary" onClick={handlePlaceBid}>Place a Bid</button>
                <button className="btn btn-outline" onClick={handlePurchase}>Purchase</button>
              </div>
            </div>
          </div>
        </div>
      </section>

     <div className="marquee-wrapper">
  <div className="marquee-content">
    {[...Array(2)].flatMap((_, setIndex) =>
      [
        { name: 'PayPal',     path: 'M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.771.771 0 0 1 .76-.65h5.755c1.912 0 3.365.4 4.32 1.19.94.775 1.42 1.923 1.42 3.41 0 .5-.058.998-.174 1.48a5.29 5.29 0 0 1-.512 1.408 5.444 5.444 0 0 1-.876 1.234 4.915 4.915 0 0 1-1.253.985 5.91 5.91 0 0 1-1.665.633c-.622.14-1.34.21-2.14.21H8.933a.79.79 0 0 0-.78.666l-.66 4.157a.79.79 0 0 0 .78.895h.803z' },
        { name: 'Coinbase',   path: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 15a5 5 0 1 1 0-10 5 5 0 0 1 0 10z' },
        { name: 'Binance',    path: 'M12 2l-2.5 6.5L3 11l6.5 2.5L12 20l2.5-6.5L21 11l-6.5-2.5z' },
        { name: 'Revolut',    path: 'M5 4h9a4 4 0 0 1 0 8h-3l4 8h-3l-4-8H8v8H5V4zm3 3v2h6a1 1 0 0 0 0-2H8z' },
        { name: 'Exodus',     path: 'M12 2l10 18H2L12 2zm0 5l-5 9h10l-5-9z' },
        { name: 'Bitfinex',   path: 'M4 6h7v3H4V6zm0 9h7v3H4v-3zm9-9h7v3h-7V6zm0 9h7v3h-7v-3zM11 4h2v16h-2V4z' },
        { name: 'Blockchain', path: 'M12 2l9 5v10l-9 5-9-5V7l9-5zm0 2.3L5 8v8l7 4 7-4V8l-7-3.7zM9 12l2 2 4-4' },
      ].map((logo) => (
        <span key={`${setIndex}-${logo.name}`}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d={logo.path} />
          </svg>
          {logo.name}
        </span>
      ))
    )}
  </div>
</div>


      {/* --- POPULAR, SELLERS, EXPLORE, CTA (all inside ONE content-wrapper) --- */}
      <div className="content-wrapper">
        {/* --- POPULAR THIS WEEK --- */}
        <h2 className="section-title">Popular this week</h2>
        <div className="popular-grid">
          {popularData.map((item) => (
         <article 
  className={`popular-card ${item.featured ? 'featured' : ''}`} 
  key={item.id}
>
  <img 
    src={item.img} 
    alt={item.name} 
    className="popular-card__image" 
  />

  <div className="popular-card__overlay">
    <div className="popular-card__left">
      <h3 className="popular-card__name">{item.name}</h3>
      <p className="popular-card__author">by {item.author}</p>
    </div>
    <div className="popular-card__right">
      <span className="popular-card__price">{item.price}</span>
      <span className="popular-card__likes">♥ {item.likes}</span>
    </div>
  </div>
</article>
          ))}
        </div>

        {/* --- TOP SELLERS --- */}
        <h2 className="section-title">Top Sellers</h2>
        <div className="sellers-grid">
          {sellersData.map((seller) => (
            <div className="seller-card" key={seller.id}>
              <img src={seller.img} alt={seller.name} />
              <div className="seller-info">
                <h4>{seller.name}</h4>
                <p>{seller.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* --- EXPLORE ARTWORKS --- */}
<h2 className="section-title">Explore Artworks</h2>
<div className="explore-grid">
  {exploreData.map((item) => (
    <div className="explore-card" key={item.id}>
      <div className="explore-images">
  <img src={item.imgs[0]} alt={`${item.title} 1`} className="explore-img-small" />
  <img src={item.imgs[1]} alt={`${item.title} 2`} className="explore-img-small" />
  <img src={item.imgs[2]} alt={`${item.title} 3`} className="explore-img-small" />
  <img src={item.imgs[3]} alt={`${item.title} large`} className="explore-img-large" />
</div>
      <div className="explore-footer">
        <h4>{item.title}</h4>
        <span>{item.items}</span>
      </div>
    </div>
  ))}
</div>
        {/* --- CTA BANNER --- */}
        <div className="cta-banner">
          <h2>Join Us to Create Sell and Collect NFTs Digital Art</h2>
          <button className="btn btn-primary" onClick={handleJoinCommunity}>Join Community</button>
        </div>
      </div>

      {/* --- FOOTER --- */}
      <footer className="footer content-wrapper">
        <div className="footer-brand">
          <div className="logo">PLAY<span>NFT</span></div>
          <p>The World's Largest Digital Marketplace for crypto collections and non fungible tokens (NFTs) buy, sell and discover exclusive digital assets</p>
          <div className="social-icons">
            <button aria-label="Twitter"><FiTwitter /></button>
            <button aria-label="Instagram"><FiInstagram /></button>
            <button aria-label="Facebook"><FiFacebook /></button>
            <button aria-label="Discord"><FaDiscord /></button>
          </div>
        </div>

        <div className="footer-links">
          <h4>Explore</h4>
          <ul>
            <li><a href="#art">Art</a></li>
            <li><a href="#photography">Photography</a></li>
            <li><a href="#music">Music</a></li>
            <li><a href="#games">Games</a></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>My Account</h4>
          <ul>
            <li><a href="#profile">My Profile</a></li>
            <li><a href="#collections">My Collections</a></li>
            <li><a href="#favorites">My Favorites</a></li>
            <li><a href="#settings">My Account Settings</a></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Resources</h4>
          <ul>
            <li><a href="#help">Help Center</a></li>
            <li><a href="#partners">Partners</a></li>
            <li><a href="#suggestions">Suggestions</a></li>
            <li><a href="#newsletters">Newsletters</a></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Company</h4>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#careers">Careers</a></li>
            <li><a href="#ranking">Ranking</a></li>
            <li><a href="#activity">Activity</a></li>
          </ul>
        </div>
      </footer>
    </>
  );
}

export default App;