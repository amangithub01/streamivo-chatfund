
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import VideoPlayer from '@/components/stream/VideoPlayer';
import ChatBox from '@/components/stream/ChatBox';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StreamCardProps } from '@/components/stream/StreamCard';
import { Heart, Share2, Users, Calendar, MapPin, Link, Clock, Trophy } from 'lucide-react';
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Mock stream data (in a real app would fetch based on ID)
const STREAMS: Record<string, StreamCardProps & { 
  description: string;
  streamerInfo?: {
    joinDate: string;
    location: string;
    website?: string;
    schedule: string[];
    achievements: string[];
  };
}> = {
  '1': {
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
    isLive: true,
    description: 'Welcome to the championship finals! Today we\'re witnessing Team Alpha facing off against Team Omega in this highly anticipated match. Expect high-level gameplay and intense moments as these top teams compete for the title.',
    streamerInfo: {
      joinDate: 'January 2019',
      location: 'Los Angeles, CA',
      website: 'progamer.com',
      schedule: ['Monday 7PM', 'Wednesday 7PM', 'Friday 8PM', 'Sunday 3PM'],
      achievements: ['Tournament Winner 2022', '1M Followers Milestone', 'Partner Status']
    }
  },
  '2': {
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
    isLive: true,
    description: 'Checking out the brand new update that just dropped! We\'ll explore all the new features, areas, and gameplay changes. Come hang out and let me know what you think of the new content!',
    streamerInfo: {
      joinDate: 'March 2020',
      location: 'Chicago, IL',
      schedule: ['Tuesday 6PM', 'Thursday 6PM', 'Saturday 12PM'],
      achievements: ['500K Followers Milestone', 'Rising Star Award']
    }
  },
  // Add entries for all other streams
  '3': {
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
    isLive: true,
    description: 'Join me for a relaxing digital painting session! I\'ll be creating a fantasy landscape while sharing tips and techniques. Feel free to ask questions about digital art in the chat.',
    streamerInfo: {
      joinDate: 'July 2021',
      location: 'New York, NY',
      website: 'artportfolio.io/creativeartist',
      schedule: ['Wednesday 5PM', 'Sunday 2PM'],
      achievements: ['Featured Artist 2022', 'Collaboration with ArtBrands']
    }
  },
  '4': {
    id: '4',
    title: 'Music Production Live - Creating a New Track',
    streamer: {
      id: 'streamer4',
      name: 'MusicProducer',
      avatar: 'https://ui-avatars.com/api/?name=Music&background=random'
    },
    thumbnail: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop',
    category: 'Music',
    viewerCount: 3189,
    tags: ['Production', 'Electronic', 'Live Music'],
    isLive: true,
    description: 'Watch me produce a new electronic track from scratch! I\'ll explain my process and techniques while taking your suggestions in real-time.',
    streamerInfo: {
      joinDate: 'September 2020',
      location: 'Berlin, Germany',
      website: 'soundcloud.com/musicproducer',
      schedule: ['Monday 8PM', 'Friday 9PM'],
      achievements: ['Featured on Electronic Music Weekly', 'Top Producer Award 2023', '250K Followers Milestone']
    }
  }
};

const StreamPage = () => {
  const { id } = useParams<{ id: string }>();
  const streamId = id || '1'; // Default to first stream if no ID
  
  // Get stream data
  const streamData = STREAMS[streamId] || STREAMS['1'];
  
  // State for follow and share
  const [isFollowing, setIsFollowing] = React.useState(false);
  
  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    if (!isFollowing) {
      toast.success(`You are now following ${streamData.streamer.name}!`);
    } else {
      toast.info(`You have unfollowed ${streamData.streamer.name}.`);
    }
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Stream link copied to clipboard!');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 container mx-auto px-4">
        <div className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 space-y-4">
              <VideoPlayer 
                streamId={streamData.id} 
                streamerName={streamData.streamer.name}
              />
              
              <div>
                <h1 className="text-xl font-bold">{streamData.title}</h1>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-2">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={streamData.streamer.avatar} alt={streamData.streamer.name} />
                      <AvatarFallback>{streamData.streamer.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-2">
                      <h3 className="font-medium">{streamData.streamer.name}</h3>
                      <p className="text-sm text-muted-foreground">{streamData.category}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-2 sm:mt-0 space-x-2">
                    <span className="flex items-center text-sm mr-2">
                      <Users className="h-4 w-4 mr-1" />
                      {streamData.viewerCount.toLocaleString()}
                    </span>
                    
                    <Button 
                      onClick={handleFollow}
                      variant={isFollowing ? "default" : "outline"}
                      className={isFollowing ? "bg-stream-primary" : ""}
                    >
                      <Heart className="h-4 w-4 mr-1" fill={isFollowing ? "white" : "none"} />
                      {isFollowing ? "Following" : "Follow"}
                    </Button>
                    
                    <Button variant="outline" size="icon" onClick={handleShare}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Tabs defaultValue="about">
                    <TabsList>
                      <TabsTrigger value="about">About</TabsTrigger>
                      <TabsTrigger value="schedule">Schedule</TabsTrigger>
                      <TabsTrigger value="videos">Videos</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="about" className="mt-4">
                      <div className="space-y-4">
                        <div className="bg-card border border-border rounded-md p-4">
                          <div className="flex flex-wrap gap-2 mb-4">
                            {streamData.tags.map((tag, index) => (
                              <span key={index} className="stream-tag">{tag}</span>
                            ))}
                          </div>
                          <p className="text-muted-foreground">{streamData.description}</p>
                        </div>
                        
                        {streamData.streamerInfo && (
                          <Card>
                            <CardContent className="p-4">
                              <h3 className="text-lg font-medium mb-3">Streamer Profile</h3>
                              <Separator className="mb-4" />
                              
                              <div className="space-y-3">
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <span className="text-sm">Joined: {streamData.streamerInfo.joinDate}</span>
                                </div>
                                
                                <div className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <span className="text-sm">Location: {streamData.streamerInfo.location}</span>
                                </div>
                                
                                {streamData.streamerInfo.website && (
                                  <div className="flex items-center">
                                    <Link className="h-4 w-4 mr-2 text-muted-foreground" />
                                    <a 
                                      href={`https://${streamData.streamerInfo.website}`} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-sm text-blue-500 hover:underline"
                                    >
                                      {streamData.streamerInfo.website}
                                    </a>
                                  </div>
                                )}
                                
                                <div>
                                  <div className="flex items-center mb-2">
                                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                                    <span className="text-sm font-medium">Regular Schedule:</span>
                                  </div>
                                  <ul className="pl-6 space-y-1">
                                    {streamData.streamerInfo.schedule.map((time, index) => (
                                      <li key={index} className="text-xs text-muted-foreground">{time}</li>
                                    ))}
                                  </ul>
                                </div>
                                
                                <div>
                                  <div className="flex items-center mb-2">
                                    <Trophy className="h-4 w-4 mr-2 text-muted-foreground" />
                                    <span className="text-sm font-medium">Achievements:</span>
                                  </div>
                                  <ul className="pl-6 space-y-1">
                                    {streamData.streamerInfo.achievements.map((achievement, index) => (
                                      <li key={index} className="text-xs text-muted-foreground">{achievement}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="schedule" className="mt-4">
                      <div className="bg-card border border-border rounded-md p-4">
                        <p className="text-muted-foreground">Upcoming schedule will be displayed here.</p>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="videos" className="mt-4">
                      <div className="bg-card border border-border rounded-md p-4">
                        <p className="text-muted-foreground">Past videos will be displayed here.</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
            
            <div className="h-[calc(100vh-130px)]">
              <ChatBox streamId={streamData.id} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StreamPage;
