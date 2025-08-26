import { useState, useEffect, useRef, useMemo } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TooltipLabel from "../TooltipLabel";

import styles from "./BackgroundMusicToggle.module.scss";

const BackgroundMusicToggle = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const playlist = useMemo(() => ["/1518-time-to-dance.mp3"], []);
  const getRandomIndex = () => Math.floor(Math.random() * playlist.length);
  const [currentSongIndex, setCurrentSongIndex] = useState(getRandomIndex());

  useEffect(() => {
    const handleSongEnd = () => {
      const nextSongIndex = (currentSongIndex + 1) % playlist.length;
      setCurrentSongIndex(nextSongIndex);
    };
    if (audioRef.current) {
      audioRef.current.loop = playlist.length === 1;
      audioRef.current.addEventListener("ended", handleSongEnd);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", handleSongEnd);
      }
    };
  }, [currentSongIndex, playlist.length]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = playlist[currentSongIndex];
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentSongIndex, isPlaying, playlist]);

  return (
    <div className={styles.AudioUI}>
      <div className={styles.BG}>
        <TooltipLabel
          key={"audio-switch"}
          label={isPlaying ? "Pause Audio" : "Play Audio"}
        >
          <button className={styles.Button} onClick={toggleMusic}>
            <FontAwesomeIcon
              className={styles.Icon}
              icon={isPlaying ? "pause" : "play"}
            />
          </button>
        </TooltipLabel>
        <audio ref={audioRef} />
      </div>
    </div>
  );
};

export default BackgroundMusicToggle;
