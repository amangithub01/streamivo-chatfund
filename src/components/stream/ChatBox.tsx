
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatMessage, { ChatMessageProps } from './ChatMessage';
import DonationBox from './DonationBox';

interface ChatBoxProps {
  streamId: string;
}

const MOCK_MESSAGES: ChatMessageProps[] = [
  {
    id: '1',
    user: {
      id: 'user1',
      name: 'GamerPro99',
      avatar: 'https://ui-avatars.com/api/?name=Gamer&background=random',
      color: '#ff5733',
      isModerator: true
    },
    message: 'Welcome everyone to the stream! Hope you enjoy the content today!',
    timestamp: '2:30 PM'
  },
  {
    id: '2',
    user: {
      id: 'user2',
      name: 'StreamFan42',
      avatar: 'https://ui-avatars.com/api/?name=Stream&background=random',
      color: '#33ff57',
      isSubscriber: true
    },
    message: 'Hey everyone! Excited to catch the stream today!',
    timestamp: '2:31 PM'
  },
  {
    id: '3',
    user: {
      id: 'user3',
      name: 'CoolDude123',
      avatar: 'https://ui-avatars.com/api/?name=Cool&background=random',
      color: '#5733ff'
    },
    message: 'That was an amazing play! 🔥',
    timestamp: '2:32 PM'
  },
  {
    id: '4',
    user: {
      id: 'user4',
      name: 'SuperFan2000',
      avatar: 'https://ui-avatars.com/api/?name=Super&background=random',
      color: '#f033ff',
      isSubscriber: true
    },
    message: 'I\'ve been waiting all week for this stream! Let\'s go!',
    timestamp: '2:33 PM',
    isDonation: true,
    donationAmount: 5.99
  },
  {
    id: '5',
    user: {
      id: 'user5',
      name: 'ChillViewer',
      avatar: 'https://ui-avatars.com/api/?name=Chill&background=random',
      color: '#33fff5'
    },
    message: 'This is my first time watching, loving the content so far!',
    timestamp: '2:34 PM'
  },
  {
    id: '6',
    user: {
      id: 'user6',
      name: 'GameMaster',
      avatar: 'https://ui-avatars.com/api/?name=Game&background=random',
      color: '#ff33a8',
      isModerator: true
    },
    message: 'Remember to follow the chat rules everyone! Keep it friendly.',
    timestamp: '2:35 PM'
  },
  {
    id: '7',
    user: {
      id: 'user7',
      name: 'LoyalFan123',
      avatar: 'https://ui-avatars.com/api/?name=Loyal&background=random',
      color: '#a833ff',
      isSubscriber: true
    },
    message: 'Been a subscriber for 6 months now! Best streamer ever!',
    timestamp: '2:36 PM',
    isDonation: true,
    donationAmount: 10.00
  },
  {
    id: '8',
    user: {
      id: 'user8',
      name: 'NewViewer99',
      avatar: 'https://ui-avatars.com/api/?name=New&background=random',
      color: '#ffb533'
    },
    message: 'Just found this channel yesterday, immediately subscribed!',
    timestamp: '2:37 PM'
  }
];

const ChatBox = ({ streamId }: ChatBoxProps) => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    const newChatMessage: ChatMessageProps = {
      id: Date.now().toString(),
      user: {
        id: 'currentUser',
        name: 'You',
        avatar: 'https://ui-avatars.com/api/?name=You&background=random',
        color: '#8B5CF6'
      },
      message: newMessage,
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
    
    setMessages([...messages, newChatMessage]);
    setNewMessage('');
  };
  
  const handleDonation = (amount: number, message: string) => {
    const newDonation: ChatMessageProps = {
      id: Date.now().toString(),
      user: {
        id: 'currentUser',
        name: 'You',
        avatar: 'https://ui-avatars.com/api/?name=You&background=random',
        color: '#8B5CF6'
      },
      message: message,
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      isDonation: true,
      donationAmount: amount
    };
    
    setMessages([...messages, newDonation]);
  };
  
  return (
    <div className="bg-card border border-border rounded-md h-full flex flex-col">
      <Tabs defaultValue="chat" className="w-full h-full flex flex-col">
        <div className="border-b border-border px-3 py-2">
          <TabsList className="w-full">
            <TabsTrigger value="chat" className="flex-1">Chat</TabsTrigger>
            <TabsTrigger value="donate" className="flex-1">Donate</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="chat" className="flex-1 flex flex-col px-3 py-2 space-y-4 m-0">
          <ScrollArea className="flex-1">
            <div className="space-y-1 pr-3">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} {...msg} />
              ))}
            </div>
          </ScrollArea>
          
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              placeholder="Send a message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">Chat</Button>
          </form>
        </TabsContent>
        
        <TabsContent value="donate" className="flex-1 m-0 p-3">
          <DonationBox onDonate={handleDonation} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChatBox;
