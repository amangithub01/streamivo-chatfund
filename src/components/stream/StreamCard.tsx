
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from 'react-router-dom';

export interface StreamCardProps {
  id: string;
  title: string;
  streamer: {
    id: string;
    name: string;
    avatar: string;
  };
  thumbnail: string;
  category: string;
  viewerCount: number;
  tags: string[];
  isLive: boolean;
}

const StreamCard = ({ 
  id, 
  title, 
  streamer, 
  thumbnail, 
  category, 
  viewerCount, 
  tags, 
  isLive 
}: StreamCardProps) => {
  return (
    <Link to={`/stream/${id}`}>
      <Card className="overflow-hidden hover:ring-1 hover:ring-primary transition-all duration-200 h-full">
        <div className="relative">
          <img 
            src={thumbnail} 
            alt={title}
            className="w-full aspect-video object-cover"
          />
          {isLive && (
            <div className="absolute top-2 left-2">
              <span className="live-indicator">LIVE</span>
            </div>
          )}
          <div className="absolute bottom-2 left-2">
            <span className="bg-black/70 text-white text-xs px-2 py-0.5 rounded-md">
              {viewerCount.toLocaleString()} viewers
            </span>
          </div>
        </div>
        <CardContent className="p-3">
          <div className="flex items-start gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={streamer.avatar} alt={streamer.name} />
              <AvatarFallback>{streamer.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm line-clamp-1" title={title}>{title}</h3>
              <p className="text-muted-foreground text-xs">{streamer.name}</p>
              <p className="text-muted-foreground text-xs">{category}</p>
              <div className="mt-1.5 flex flex-wrap gap-1">
                {tags.slice(0, 2).map((tag, index) => (
                  <span key={index} className="stream-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default StreamCard;
