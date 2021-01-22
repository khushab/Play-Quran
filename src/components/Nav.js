import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faLibr } from '@fortawesome/free-solid-svg-icons';

function Nav({ libraryStatus, setLibraryStatus }) {
    return (
        <div className="nav">
            <h1>Play Quran</h1>
            <button onClick={() => setLibraryStatus(!libraryStatus)}>Library</button>
        </div>
    )
}

export default Nav;