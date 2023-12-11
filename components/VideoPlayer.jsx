import { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';

export default function VideoPlayer({ src }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.controls = true;
    const defaultOptions = {};
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // This will run in safari, where HLS is supported natively
      video.src = src;
    } else if (Hls.isSupported()) {
      // This will run in all other modern browsers

      const hls = new Hls();
      hls.loadSource(src);
      const player = new Plyr(video, defaultOptions);
      hls.attachMedia(video);
    } else {
      console.error(
        'This is an old browser that does not support MSE https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API'
      );
    }

    const handleKeyPress = (event) => {
      // Check if the pressed key is either ArrowLeft or ArrowRight
      if (event.key === 'ArrowLeft') {
        video.currentTime -= 10; // Seek backward by 10 seconds
      } else if (event.key === 'ArrowRight') {
        video.currentTime += 10; // Seek forward by 10 seconds
      }
    };

    // Add event listener for keydown on the document
    document.addEventListener('keydown', handleKeyPress);

    // Cleanup the event listener when the component is unmounted
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [src, videoRef]);

  return (
    <>
      <video data-displaymaxtap ref={videoRef} className="min-w-full"/>
      <style jsx>{`
        video {
          max-width: 100%;
          min-width: 100%;
        }   
      `}</style>
    </>
  );
}
