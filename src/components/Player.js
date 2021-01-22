import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons';
// import { playAudio } from '../util';

function Player({ audioRef, chapterInfo, setChapterInfo, currentChapter, isPlaying, setIsPlaying, chapters, setCurrentChapter, setChapters }) {

    const activeLibraryHandler = (nextPrev) => {
        const newChapter = chapters.map((chapter) => {
            if (chapter.id === nextPrev.id) {
                return {
                    ...chapter, active: true,
                }
            } else {
                return {
                    ...chapter, active: false,
                }
            }
        });
        setChapters(newChapter);
    }

    //Event Handlers
    const playChapterHandler = () => {
        setIsPlaying(!isPlaying)
        if (isPlaying) {
            audioRef.current.pause();

        } else {
            audioRef.current.play();
        }
    }

    const getTime = (time) => {
        let hour = "0" + Math.floor(time / 3600);
        let minute = ("0" + ((Math.floor(time / 60)) - (hour * 60))).slice(-2);
        let second = ("0" + Math.floor(time % 60)).slice(-2);
        // return  Math.floor(time / 60) + ":" ("0" + Math.floor(time % 60)).slice(-2);
        return hour + ":" + minute + ":" + second
    }

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setChapterInfo({ ...chapterInfo, currentTime: e.target.value });
    }

    const skipTrackHandler = async (direction) => {
        let currentIndex = chapters.findIndex((chapter) => chapter.id === currentChapter.id);
        if (direction === 'skip-forward') {
            await setCurrentChapter(chapters[(currentIndex + 1) % chapters.length]);
            activeLibraryHandler(chapters[(currentIndex + 1) % chapters.length])
        }
        if (direction === 'skip-back') {
            if ((currentIndex - 1) % chapters.length === -1) {
                await setCurrentChapter(chapters[chapters.length - 1])
                activeLibraryHandler(chapters[chapters.length - 1])
            }
            else {
                await setCurrentChapter(chapters[(currentIndex - 1) % chapters.length])
                activeLibraryHandler(chapters[(currentIndex - 1) % chapters.length])

            }

        }
        if (isPlaying) audioRef.current.play();
        // playAudio(isPlaying, audioRef);
    };
    //Add the styles to input:range
    const trackAnim = {
        transform: `translateX(${chapterInfo.animationPercentage}%)`
    };

    return (
        <div className="player">
            <div className="time__control">
                <p>{getTime(chapterInfo.currentTime)}</p>
                <div className="track">
                    <input
                        min={0}
                        max={(Math.floor(chapterInfo.duration)) || 0}
                        value={chapterInfo.currentTime}
                        onChange={dragHandler}
                        type="range"
                    />
                    <div style={trackAnim} className="animate-track"></div>
                </div>
                <p>{chapterInfo.duration ? getTime(chapterInfo.duration) : "00:00:00"}</p>
            </div>
            <div className="play__control">
                <FontAwesomeIcon
                    onClick={() => skipTrackHandler('skip-back')}
                    className="skip__back skip"
                    size="2x"
                    icon={faAngleLeft}
                />
                <FontAwesomeIcon onClick={playChapterHandler}
                    className="play"
                    size="2x"
                    icon={isPlaying ? faPause : faPlay}
                />
                <FontAwesomeIcon
                    onClick={() => skipTrackHandler('skip-forward')}
                    className="skip__forward skip"
                    size="2x"
                    icon={faAngleRight}
                />
            </div>

        </div>
    )
}

export default Player
