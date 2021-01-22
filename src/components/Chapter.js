import React from 'react';
// import cover from '../images/cover.png';
import cover2 from '../images/cover2.png';

function Chapters({ currentChapter }) {
    return (
        <div className="chapter">
            <img src={cover2} alt="cover" />
            {/* <h1>Al-Quran</h1> */}
            <h2>{currentChapter.name}</h2>
            <h3>{currentChapter.reciter}</h3>
        </div>
    )
}

export default Chapters
