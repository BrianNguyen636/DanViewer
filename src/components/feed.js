import {useState, React, useEffect} from 'react';
import PostCard from './postCard';
import './feed.css'

const LOGIN = 'avianbot';
const KEY = 'TekDM7Yef4WALQmM5sE28b4G'

async function getResponse(params) {
    let page = 1;
    let url = 'https://danbooru.donmai.us/posts.json?'+
    'page=' + page +'&limit=12'
    +'&login='+LOGIN+'&api_key='+KEY;
    
    let response = await fetch(url,
        {method:"GET", mode:"cors"}
    )
    return await response.json();
}

export default function Feed() {

    const [response, setResponse] = useState({});
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        getResponse().then(
            (response) => {
                setLoading(false);
                setResponse(response);
            }
        )
    },[]);

    return (
        <div id='feed'>
            {/* Posts: {response.length} */}
            {!loading && 
                <div id='list'>
                    {response.map((post) => {
                        return(
                            <div key = 'id'>
                                <PostCard {...post}/>
                            </div>
                        )
                    })}
                </div>
            }
        </div>

    );
}
