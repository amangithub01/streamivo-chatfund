
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Volume2, VolumeX, Maximize, Pause, Play } from 'lucide-react';

interface VideoPlayerProps {
  streamId: string;
  streamerName: string;
  videoSrc?: string; // Optional for demo purposes
}

const VideoPlayer = ({ streamId, streamerName, videoSrc }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  
  // Demo video fallback
  const demoVideo = videoSrc || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    const videoElement = document.getElementById('stream-video') as HTMLVideoElement;
    if (videoElement) {
      if (isPlaying) {
        videoElement.pause();
      } else {
        videoElement.play();
      }
    }
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
    const videoElement = document.getElementById('stream-video') as HTMLVideoElement;
    if (videoElement) {
      videoElement.muted = !isMuted;
    }
  };
  
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    const videoElement = document.getElementById('stream-video') as HTMLVideoElement;
    if (videoElement) {
      videoElement.volume = newVolume / 100;
      if (newVolume === 0) {
        setIsMuted(true);
        videoElement.muted = true;
      } else if (isMuted) {
        setIsMuted(false);
        videoElement.muted = false;
      }
    }
  };
  
  const enterFullscreen = () => {
    const videoContainer = document.getElementById('video-container');
    if (videoContainer) {
      if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen();
      }
    }
  };
  
  return (
    <div id="video-container" className="relative bg-black rounded-md overflow-hidden">
      <video
        id="stream-video"
        className="w-full aspect-video"
        src={demoVideo}
        autoPlay
        playsInline
      ></video>

      <div className="absolute top-0 left-0 right-0 p-3 bg-gradient-to-b from-black/80 to-transparent flex justify-between">
        <div>
          <span className="live-indicator">LIVE</span>
        </div>
        <div>
          <span className="text-white text-sm font-medium">
            {streamerName}
          </span>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button size="icon" variant="ghost" className="h-8 w-8 text-white" onClick={togglePlay}>
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            
            <div className="hidden sm:flex items-center space-x-2">
              <Button size="icon" variant="ghost" className="h-8 w-8 text-white" onClick={toggleMute}>
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              
              <div className="w-24">
                <Slider 
                  value={[volume]} 
                  max={100} 
                  step={1}
                  onValueChange={handleVolumeChange}
                />
              </div>
            </div>
          </div>
          
          <div>
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8 text-white" 
              onClick={enterFullscreen}
            >
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
