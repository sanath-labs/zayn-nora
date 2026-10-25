import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, ArrowRight, Play, Pause, Sparkles } from "lucide-react";

type VideoAnimationIntroProps = {
  onComplete: () => void;
};

export default function VideoAnimationIntro({ onComplete }: VideoAnimationIntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(15);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Attempt autoplay
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, []);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    setCurrentTime(video.currentTime);
    setProgress((video.currentTime / video.duration) * 100);
    setDuration(video.duration);
  };

  const handleVideoEnded = () => {
    finishIntro();
  };

  const finishIntro = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <section
      className={`video-intro-overlay ${isClosing ? "fade-out" : "fade-in"}`}
      aria-label="Animated wedding invitation intro"
    >
      {/* Background ambient texture */}
      <div className="video-intro-bg" />

      {/* Floating particles / ambient glow */}
      <div className="video-ambient-glow" />

      {/* Main 9:16 Video Card Container */}
      <div className="video-card-container">
        {/* Top Header Bar */}
        <div className="video-card-topbar">
          <span className="video-tagline">
            <Sparkles size={13} className="inline mr-1 text-[#b59661]" />
            Wedding Invitation Animation
          </span>
          <button
            type="button"
            className="skip-btn"
            onClick={finishIntro}
            aria-label="Skip video and view invitation"
          >
            <span>Skip to Invitation</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* 9:16 Aspect Ratio Frame */}
        <div className="video-frame-wrapper" onClick={togglePlay}>
          <video
            ref={videoRef}
            src="/wedding-intro.mp4"
            className="video-element"
            playsInline
            autoPlay
            muted={isMuted}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleVideoEnded}
            onLoadedMetadata={() => {
              if (videoRef.current) setDuration(videoRef.current.duration || 15);
            }}
          />

          {/* Play/Pause overlay indicator on click */}
          {!isPlaying && (
            <div className="play-pause-overlay" aria-hidden="true">
              <div className="play-circle">
                <Play size={28} className="text-white fill-white ml-1" />
              </div>
            </div>
          )}

          {/* Bottom Bar Controls over Video */}
          <div className="video-controls-overlay" onClick={(e) => e.stopPropagation()}>
            <div className="progress-bar-wrap">
              <div
                className="progress-bar-fill"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="controls-row">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="control-icon-btn"
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} className="fill-current" />}
                </button>
                <button
                  type="button"
                  className="control-icon-btn"
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute sound" : "Mute sound"}
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
                <span className="time-display">
                  {Math.floor(currentTime)}s / {Math.floor(duration)}s
                </span>
              </div>

              <button
                type="button"
                className="view-invite-pill"
                onClick={finishIntro}
              >
                <span>View Full Invitation</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom helper text */}
        <p className="video-bottom-hint">
          Animation automatically continues to the celebration upon completion
        </p>
      </div>
    </section>
  );
}

