import {useState, React} from 'react';


const LOGIN = 'avianbot';
const KEY = 'TekDM7Yef4WALQmM5sE28b4G'

export default function Feed() {

    const [response, setResponse] = useState({});
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(true);
    let page = 1;
    let url = 'https://danbooru.donmai.us/posts.json?'+
    'page=' + page 
    +'&login='+LOGIN+'&api_key='+KEY;

        fetch(url,
            {method:"GET", mode:"cors"}
        )
            .then((response)=>response.json())
            .then((response)=>{
                setResponse(response)
                setLoading(false)
    })
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
