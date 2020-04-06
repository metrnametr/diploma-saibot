export const customFetch = async (url, ...rest) => {
    const token = localStorage.getItem('token');
    console.log(token)
    const res = await fetch(url, {
        ...rest,
        'Content-Type': 'application/json',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return res.json();
}