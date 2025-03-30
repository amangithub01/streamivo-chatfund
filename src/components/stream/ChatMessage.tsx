
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface ChatMessageProps {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
    color: string;
    isModerator?: boolean;
    isSubscriber?: boolean;
  };
  message: string;
  timestamp: string;
  isDonation?: boolean;
  donationAmount?: number;
}

const ChatMessage = ({ 
  user, 
  message, 
  timestamp, 
  isDonation = false,
  donationAmount = 0
}: ChatMessageProps) => {
  return (
    <div className={`chat-message ${isDonation ? "bg-muted" : ""}`}>
      <div className="flex items-start gap-2">
        <Avatar className="h-6 w-6 flex-shrink-0">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback style={{ backgroundColor: user.color }}>
            {user.name.substring(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span 
              className="font-medium text-sm truncate" 
              style={{ color: user.color }}
            >
              {user.name}
            </span>
            
            {user.isModerator && (
              <span className="bg-stream-primary text-white text-[10px] px-1 rounded">MOD</span>
            )}
            
            {user.isSubscriber && (
              <span className="bg-stream-secondary text-white text-[10px] px-1 rounded">SUB</span>
            )}
            
            <span className="text-muted-foreground text-xs">{timestamp}</span>
          </div>
          
          {isDonation && (
            <div className="my-1">
              <span className="donation-amount">${donationAmount.toFixed(2)}</span>
            </div>
          )}
          
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
