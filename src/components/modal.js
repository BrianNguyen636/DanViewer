import react from 'react';
import "./modal.css"

export default function Modal(post) {
    return (
        <div className='card' id='modal'>
            <img id="modalImg" alt ='' src={post.large_file_url}></img>
            <a className='btn btn-secondary'href={post.file_url} target="_blank" id='viewButton'>View Original</a>
        </div>
    );
}
