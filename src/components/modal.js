import {react, useState} from 'react';
import "./modal.css"

export default function Modal(post) {
    const [artists, setArtists] = useState(post.tag_string_artist.split(" "));
    const [series, setSeries] = useState(post.tag_string_copyright.split(" "));

    // console.log(series);
    
    return (
        <div className='card' id='modal'>
            <img id="modalImg" alt ='' src={post.large_file_url}></img>
            <a className='btn btn-secondary'href={post.file_url} target="_blank" id='viewButton'>View Original</a>
            <hr></hr>
            <div id='tags'>
                <h5>Artist</h5>
                {/* <p>{post.tag_string_artist}</p> */}
                {artists.map((e)=>{
                    return(<p key={e}>{e}</p>)
                })}
                <h5>Series</h5>
                {/* <p>{post.tag_string_copyright}</p> */}
                {series.map((e)=>{
                    return(<p key={e}>{e}</p>)
                })}
            </div>
        </div>
    );
}
