import {useState, React} from 'react';


const LOGIN = 'avianbot';
const KEY = 'TekDM7Yef4WALQmM5sE28b4G'

async function getResponse(params) {
    let page = 1;
    let url = 'https://danbooru.donmai.us/posts.json?'+
    'page=' + page 
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

    getResponse().then(
        (response) => {
            setLoading(false);
            setResponse(response);
        }
    )

    return (
        <div>
            Posts: {response.length}
            {!loading && 
                <div>
                    {response.map((post) => {
                        return(
                            <div>
                                {post.id}
                            </div>
                        )
                    })}
                </div>
            }
        </div>

    );
}
