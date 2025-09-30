import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import MovieCatalog from './MovieCatalog';
import FamilyManagement from './FamilyManagement';

const DashboardScreen = () => {
  const [activeTab, setActiveTab] = useState<'catalog' | 'family'>('catalog');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-red-500 flex items-center justify-center">
                  <Icon name="Play" size={24} className="text-black" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
                  START
                </span>
              </div>

              <nav className="flex gap-6">
                <button
                  onClick={() => setActiveTab('catalog')}
                  className={`text-lg font-medium transition-colors ${
                    activeTab === 'catalog' 
                      ? 'text-green-500' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Каталог
                </button>
                <button
                  onClick={() => setActiveTab('family')}
                  className={`text-lg font-medium transition-colors flex items-center gap-2 ${
                    activeTab === 'family' 
                      ? 'text-green-500' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon name="Users" size={20} />
                  Семья
                </button>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              {activeTab === 'catalog' && (
                <div className="relative w-80">
                  <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <Input
                    placeholder="Поиск фильмов и сериалов..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-gray-900 border-gray-800 text-white placeholder:text-gray-500"
                  />
                </div>
              )}

              <Avatar className="w-10 h-10 border-2 border-green-500">
                <AvatarFallback className="bg-gradient-to-br from-green-500 to-green-600 text-black font-semibold">
                  АП
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-24 container mx-auto px-6 pb-12">
        {activeTab === 'catalog' ? (
          <MovieCatalog searchQuery={searchQuery} />
        ) : (
          <FamilyManagement />
        )}
      </main>
    </div>
  );
};

export default DashboardScreen;