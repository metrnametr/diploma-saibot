import { useState, useEffect } from 'react';


function useFetch(url, method, ...rest) {
    const [res, setRes] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    useEffect(() => {
        

        async function getData(){
            try {
                const res = await fetch(url);
                const data = await res.json();
                setRes(data);
            } catch(e){
                setError(e);
            }
            setLoading(false);
        }

        getData();
    }, [url])

    // console.log(res)
    return [res, loading, error]
}

export default useFetch;