import React from 'react'
// import cover from '../images/cover.png';
import cover2 from '../images/cover2.png';
// import { playAudio } from '../util';

function LibraryChapter({ chapter, chapters, setCurrentChapter, id, audioRef, isPlaying, setChapters }) {
    //functions
    const chapterSelectHandler = async () => {
        // const selectedChapter = chapters.filter((state) => state.id === id);
        await setCurrentChapter(chapter);
        //add active state
        const newChapter = chapters.map((chapter) => {
            if (chapter.id === id) {
                return {
                    ...chapter, active: true,
                }
            } else {
                return {
                    ...chapter, active: false,
                }
            }
        })
        setChapters(newChapter)
        //check if the chapter is playing
        if (isPlaying) audioRef.current.play();
    }

    return (
        <div onClick={chapterSelectHandler} className={`library__chapter ${chapter.active ? 'selected' : ""}`}>
            <img src={cover2} alt="cover" />
            <div className="chapter__description">
                <h3>{chapter.name}</h3>
                <h4>{chapter.reciter}</h4>
            </div>
        </div>
    )
}

export default LibraryChapter
