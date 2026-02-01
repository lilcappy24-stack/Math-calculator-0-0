
import React, { useState, useEffect, useMemo } from 'react';
import { HashRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import htm from 'htm';
import { GameCategory } from './types.js';
import { GAMES_DATA } from './games.js';

const html = htm.bind(React.createElement);

// --- Icons ---
const IconSearch = () => html`<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth=${2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>`;
const IconHeart = ({ filled }) => html`<svg xmlns="http://www.w3.org/2000/svg" className=${`w-5 h-5 ${filled ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} fill=${filled ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth=${2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>`;
const IconGrid = () => html`<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth=${2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>`;
const IconBack = () => html`<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth=${2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>`;
const IconMaximize = () => html`<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth=${2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>`;

const GameCard = ({ game, isFavorite, onToggleFavorite }) => {
  return html`
    <div className="group relative bg-slate-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-cyan-500/20 flex flex-col h-full">
      <${Link} to=${`/game/${game.id}`} className="relative block aspect-video overflow-hidden">
        <img 
          src=${game.thumbnail} 
          alt=${game.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
          <span className="text-white font-bold text-lg">Play Now</span>
        </div>
      <//>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <${Link} to=${`/game/${game.id}`} className="text-xl font-outfit font-bold text-slate-100 hover:text-cyan-400 transition-colors">
            ${game.title}
          <//>
          <button 
            onClick=${() => onToggleFavorite(game.id)}
            className="p-1 hover:bg-slate-700 rounded-full transition-colors"
          >
            <${IconHeart} filled=${isFavorite} />
          </button>
        </div>
        <p className="text-slate-400 text-sm line-clamp-2 mb-4 flex-grow">
          ${game.description}
        </p>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-cyan-900/50 text-cyan-400 text-xs font-semibold border border-cyan-800/50">
            ${game.category}
          </span>
        </div>
      </div>
    </div>
  `;
};

const Header = ({ searchQuery, setSearchQuery, favoritesCount }) => {
  return html`
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 md:px-8 py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        <${Link} to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-cyan-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-900/20 group-hover:bg-cyan-500 transition-colors">
            <span className="text-white font-black text-xl italic">N</span>
          </div>
          <span className="text-2xl font-outfit font-black tracking-tighter text-white">
            NOVA<span className="text-cyan-400 underline decoration-cyan-400 underline-offset-4 decoration-4">ARCADE</span>
          </span>
        <//>

        <div className="flex-1 max-w-xl relative">
          <input 
            type="text"
            placeholder="Search for games..."
            value=${searchQuery}
            onChange=${(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-12 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all text-slate-200 placeholder:text-slate-500"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
            <${IconSearch} />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <${Link} to="/favorites" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700">
            <${IconHeart} filled=${favoritesCount > 0} />
            <span className="font-semibold hidden sm:inline">Favorites</span>
            <span className="bg-cyan-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              ${favoritesCount}
            </span>
          <//>
        </div>
      </div>
    </header>
  `;
};

const GameView = ({ favorites, onToggleFavorite }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const game = GAMES_DATA.find(g => g.id === id);
  const isFavorite = favorites.includes(id || '');

  if (!game) {
    return html`
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
        <h2 className="text-3xl font-bold mb-4">Game Not Found</h2>
        <button onClick=${() => navigate('/')} className="px-6 py-2 bg-cyan-600 rounded-lg text-white font-bold hover:bg-cyan-500 transition-colors">Go Home</button>
      </div>
    `;
  }

  const toggleFullscreen = () => {
    const iframe = document.getElementById('game-iframe');
    if (iframe?.requestFullscreen) iframe.requestFullscreen();
    else if (iframe?.webkitRequestFullscreen) iframe.webkitRequestFullscreen();
    else if (iframe?.msRequestFullscreen) iframe.msRequestFullscreen();
  };

  return html`
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="mb-6 flex items-center justify-between">
        <button onClick=${() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <${IconBack} />
          <span>Back</span>
        </button>
        <div className="flex gap-2">
          <button onClick=${() => onToggleFavorite(game.id)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors">
            <${IconHeart} filled=${isFavorite} />
            <span className="hidden sm:inline">${isFavorite ? 'Favorited' : 'Add to Favorites'}</span>
          </button>
          <button onClick=${toggleFullscreen} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white transition-colors">
            <${IconMaximize} />
            <span className="hidden sm:inline">Fullscreen</span>
          </button>
        </div>
      </div>

      <div className="bg-black rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/10 border border-slate-800 aspect-video w-full relative group">
        <iframe 
          id="game-iframe"
          src=${game.iframeUrl} 
          className="w-full h-full border-none"
          title=${game.title}
          allowFullScreen
          allow="autoplay; fullscreen; keyboard"
        />
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-black font-outfit mb-4 text-white">${game.title}</h1>
          <div className="flex gap-2 mb-6">
            <span className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300 font-semibold border border-slate-700">${game.category}</span>
          </div>
          <div className="prose prose-invert max-w-none text-slate-300">
            <h3 className="text-xl font-bold mb-2 text-slate-100">About this game</h3>
            <p>${game.description}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4 text-slate-100 flex items-center gap-2">
              <${IconGrid} />
              Recommended
            </h3>
            <div className="space-y-4">
              ${GAMES_DATA.filter(g => g.id !== game.id).slice(0, 3).map(rec => html`
                <${Link} key=${rec.id} to=${`/game/${rec.id}`} className="flex items-center gap-4 group">
                  <div className="w-24 h-16 rounded-lg overflow-hidden bg-slate-700 flex-shrink-0">
                    <img src=${rec.thumbnail} alt=${rec.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-200 group-hover:text-cyan-400 transition-colors line-clamp-1">${rec.title}</h4>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">${rec.category}</p>
                  </div>
                <//>
              `)}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
};

const HomePage = ({ searchQuery, activeCategory, setActiveCategory, favorites, onToggleFavorite, showOnlyFavorites = false }) => {
  const filteredGames = useMemo(() => {
    return GAMES_DATA.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           game.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || game.category === activeCategory;
      const isFavorite = !showOnlyFavorites || favorites.includes(game.id);
      return matchesSearch && matchesCategory && isFavorite;
    });
  }, [searchQuery, activeCategory, favorites, showOnlyFavorites]);

  const categories = ['All', ...Object.values(GameCategory)];

  return html`
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      ${!showOnlyFavorites && html`
        <div className="mb-12">
          <h1 className="text-5xl font-black font-outfit mb-4 text-white tracking-tighter">
            READY PLAYER <span className="text-cyan-500">ONE</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl">Explore a vast collection of unblocked games.</p>
          <div className="mt-8 flex flex-wrap gap-2">
            ${categories.map(cat => html`
              <button
                key=${cat}
                onClick=${() => setActiveCategory(cat)}
                className=${`px-5 py-2.5 rounded-xl font-bold transition-all border ${
                  activeCategory === cat ? 'bg-cyan-600 border-cyan-500 text-white shadow-lg shadow-cyan-900/30' : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600 hover:text-white'
                }`}
              >
                ${cat}
              </button>
            `)}
          </div>
        </div>
      `}

      ${showOnlyFavorites && html`
        <div className="mb-8">
          <h1 className="text-3xl font-black font-outfit mb-2 text-white">Your Favorites</h1>
        </div>
      `}

      ${filteredGames.length > 0 ? html`
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          ${filteredGames.map(game => html`
            <${GameCard} 
              key=${game.id} 
              game=${game} 
              isFavorite=${favorites.includes(game.id)}
              onToggleFavorite=${onToggleFavorite}
            />
          `)}
        </div>
      ` : html`
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-600">
            <${IconSearch} />
          </div>
          <h3 className="text-2xl font-bold text-slate-300">No games found</h3>
          <p className="text-slate-400 mt-2">Try adding some games to the database to get started.</p>
        </div>
      `}
    </div>
  `;
};

const Footer = () => html`
  <footer className="bg-slate-900 border-t border-slate-800 py-12 px-4 md:px-8 mt-auto text-center text-slate-600 text-sm">
    &copy; ${new Date().getFullYear()} NovaArcade. All rights reserved.
  </footer>
`;

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('novaarcade_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => localStorage.setItem('novaarcade_favorites', JSON.stringify(favorites)), [favorites]);

  const toggleFavorite = (id) => setFavorites(prev => prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]);

  return html`
    <${HashRouter}>
      <div className="min-h-screen flex flex-col">
        <${Header} searchQuery=${searchQuery} setSearchQuery=${setSearchQuery} favoritesCount=${favorites.length} />
        <main className="flex-grow">
          <${Routes}>
            <${Route} path="/" element=${html`<${HomePage} searchQuery=${searchQuery} activeCategory=${activeCategory} setActiveCategory=${setActiveCategory} favorites=${favorites} onToggleFavorite=${toggleFavorite} />`} />
            <${Route} path="/favorites" element=${html`<${HomePage} searchQuery=${searchQuery} activeCategory="All" setActiveCategory=${setActiveCategory} favorites=${favorites} onToggleFavorite=${toggleFavorite} showOnlyFavorites=${true} />`} />
            <${Route} path="/game/:id" element=${html`<${GameView} favorites=${favorites} onToggleFavorite=${toggleFavorite} />`} />
          <//>
        </main>
        <${Footer} />
      </div>
    <//>
  `;
}
