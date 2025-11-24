import { useEffect, useRef, useState } from 'react';

const VideoPlayer = ({ videos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
  }, [currentIndex]);

  const handleVideoEnd = () => {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <video
      ref={videoRef}
      src={videos[currentIndex]?.url}
      onEnded={handleVideoEnd}
      autoPlay
    />
  );
};

export default VideoPlayer;
