import react from 'react';
import './postCard.css'

function clicked() {

}

export default function PostCard(post) {
    
    return (
        <div className = "card border-primary mb-3" id ='card'>
            <div className='card-body'>
                <img src={post.preview_file_url} alt=''></img>
            </div>
            <div className='card-footer'>{post.tag_string_artist}</div>
        </div>
    );
}
