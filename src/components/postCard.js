import react from 'react';
import './postCard.css'

export default function PostCard(post) {
    return (
        <div class = "card" id ='card'>
            {post.id}
            <img src={post.preview_file_url}></img>
        </div>
    );
}
