import React from 'react';
import LibraryChapter from './LibraryChapter';

function Library({ chapters, setCurrentChapter, audioRef, isPlaying, setChapters, libraryStatus, }) {
    return (
        <div className={`library ${libraryStatus ? 'library--active' : ""}`}>
            <h2>Library</h2>
            <div className="library__chapters">
                {chapters.map((chapter) => (
                    <LibraryChapter
                        chapters={chapters}
                        setCurrentChapter={setCurrentChapter}
                        chapter={chapter}
                        id={chapter.id}
                        key={chapter.id}
                        audioRef={audioRef}
                        isPlaying={isPlaying}
                        setChapters={setChapters}
                    />
                ))}
            </div>
        </div>
    )
}

export default Library
