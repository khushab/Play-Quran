import React, { useState, useRef } from 'react';
//Importing Components
import Chapter from './components/Chapter';
import Footer from './components/Footer';
import Player from './components/Player';
import Library from './components/Library';
import Nav from './components/Nav';
//Importing Styles
import './styles/App.scss';
//Import Util
import data from './data';

function App() {
  //State
  const [chapters, setChapters] = useState(data());
  const [currentChapter, setCurrentChapter] = useState(chapters[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [chapterInfo, setChapterInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);
  //Ref
  const audioRef = useRef(null);
  //Event Handlers
  const timeUpdateHandler = (e) => {
    // console.log(e.target.duration)
    const current = e.target.currentTime;
    const duration = e.target.duration;
    //calculate percentage
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100)
    setChapterInfo({ ...chapterInfo, currentTime: current, duration: duration, animationPercentage: animation });
  };
  const chapterEndHandler = async () => {
    let currentIndex = chapters.findIndex((chapter) => chapter.id === currentChapter.id);
    await setCurrentChapter(chapters[(currentIndex + 1) % chapters.length])
    if (isPlaying) audioRef.current.play();
  }

  return (
    <div className={`App ${libraryStatus ? 'library-active' : ''}`}>
      <Nav
        libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus}
      />
      <Chapter
        currentChapter={currentChapter}
      />
      <Player
        audioRef={audioRef}
        currentChapter={currentChapter}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        chapterInfo={chapterInfo}
        setChapterInfo={setChapterInfo}
        chapters={chapters}
        setCurrentChapter={setCurrentChapter}
        setChapters={setChapters}
      />
      <Footer />
      <Library
        audioRef={audioRef}
        chapters={chapters}
        setCurrentChapter={setCurrentChapter}
        isPlaying={isPlaying}
        setChapters={setChapters}
        libraryStatus={libraryStatus}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentChapter.audio}
        onEnded={chapterEndHandler}
      ></audio>
    </div>
  );
}

export default App;
