
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StreamCard, { StreamCardProps } from '@/components/stream/StreamCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for featured streams
const FEATURED_STREAMS: StreamCardProps[] = [
  {
    id: '1',
    title: 'Championship Finals - Team Alpha vs Team Omega',
    streamer: {
      id: 'streamer1',
      name: 'ProGamer',
      avatar: 'https://ui-avatars.com/api/?name=Pro&background=random'
    },
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop',
    category: 'Esports',
    viewerCount: 15420,
    tags: ['Tournament', 'FPS', 'Pro'],
    isLive: true
  },
  {
    id: '2',
    title: 'Casual Gameplay - Trying the New Update!',
    streamer: {
      id: 'streamer2',
      name: 'GameMaster',
      avatar: 'https://ui-avatars.com/api/?name=Game&background=random'
    },
    thumbnail: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=2070&auto=format&fit=crop',
    category: 'Adventure',
    viewerCount: 8753,
    tags: ['Casual', 'New Update', 'Exploration'],
    isLive: true
  },
  {
    id: '3',
    title: 'Art Creation - Digital Painting Session',
    streamer: {
      id: 'streamer3',
      name: 'CreativeArtist',
      avatar: 'https://ui-avatars.com/api/?name=Artist&background=random'
    },
    thumbnail: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=2070&auto=format&fit=crop',
    category: 'Art',
    viewerCount: 4215,
    tags: ['Digital Art', 'Tutorial', 'Creative'],
    isLive: true
  },
  {
    id: '4',
    title: 'Music Production - Creating Beats Live',
    streamer: {
      id: 'streamer4',
      name: 'BeatMaker',
      avatar: 'https://ui-avatars.com/api/?name=Beat&background=random'
    },
    thumbnail: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop',
    category: 'Music',
    viewerCount: 3120,
    tags: ['Music Production', 'Live Creation', 'EDM'],
    isLive: true
  }
];

// Mock data for recommended streams
const RECOMMENDED_STREAMS: StreamCardProps[] = [
  {
    id: '5',
    title: 'Speedrunning World Record Attempts',
    streamer: {
      id: 'streamer5',
      name: 'SpeedKing',
      avatar: 'https://ui-avatars.com/api/?name=Speed&background=random'
    },
    thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop',
    category: 'Speedrunning',
    viewerCount: 7830,
    tags: ['World Record', 'Challenge', 'Pro'],
    isLive: true
  },
  {
    id: '6',
    title: 'Let\'s Chat - Q&A with Viewers',
    streamer: {
      id: 'streamer6',
      name: 'TalkShow',
      avatar: 'https://ui-avatars.com/api/?name=Talk&background=random'
    },
    thumbnail: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069&auto=format&fit=crop',
    category: 'Just Chatting',
    viewerCount: 5420,
    tags: ['Q&A', 'Community', 'Discussion'],
    isLive: true
  },
  {
    id: '7',
    title: 'Cooking Stream - Italian Cuisine',
    streamer: {
      id: 'streamer7',
      name: 'ChefMaster',
      avatar: 'https://ui-avatars.com/api/?name=Chef&background=random'
    },
    thumbnail: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=2026&auto=format&fit=crop',
    category: 'Cooking',
    viewerCount: 2840,
    tags: ['Cooking', 'Italian', 'Recipe'],
    isLive: true
  },
  {
    id: '8',
    title: 'Game Development - Building a New Game From Scratch',
    streamer: {
      id: 'streamer8',
      name: 'DevGuru',
      avatar: 'https://ui-avatars.com/api/?name=Dev&background=random'
    },
    thumbnail: 'https://images.unsplash.com/photo-1553481187-be93c21490a9?q=80&w=2070&auto=format&fit=crop',
    category: 'Development',
    viewerCount: 1950,
    tags: ['Game Dev', 'Coding', 'Indie'],
    isLive: true
  }
];

// Combine all streams for categories tab
const ALL_STREAMS = [...FEATURED_STREAMS, ...RECOMMENDED_STREAMS];

// Organize by categories
const CATEGORIES = {
  'Gaming': ALL_STREAMS.filter(s => ['Esports', 'Adventure', 'Speedrunning'].includes(s.category)),
  'Creative': ALL_STREAMS.filter(s => ['Art', 'Music', 'Development'].includes(s.category)),
  'IRL': ALL_STREAMS.filter(s => ['Just Chatting', 'Cooking'].includes(s.category)),
};

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 container mx-auto px-4">
        <div className="mt-8">
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Featured Streams</h2>
              <Button variant="outline">See All</Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {FEATURED_STREAMS.map((stream) => (
                <StreamCard key={stream.id} {...stream} />
              ))}
            </div>
          </section>
          
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Recommended for You</h2>
              <Button variant="outline">See All</Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {RECOMMENDED_STREAMS.map((stream) => (
                <StreamCard key={stream.id} {...stream} />
              ))}
            </div>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Browse Categories</h2>
            <Tabs defaultValue="Gaming">
              <TabsList className="mb-6">
                <TabsTrigger value="Gaming">Gaming</TabsTrigger>
                <TabsTrigger value="Creative">Creative</TabsTrigger>
                <TabsTrigger value="IRL">IRL</TabsTrigger>
              </TabsList>
              
              {Object.entries(CATEGORIES).map(([category, streams]) => (
                <TabsContent key={category} value={category} className="m-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {streams.map((stream) => (
                      <StreamCard key={stream.id} {...stream} />
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
