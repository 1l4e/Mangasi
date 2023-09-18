
export async function fetchData(url:string,cache:RequestCache){
    try {
        const res = await fetch(url,{
            cache,
        });
        const data = await res.json();
        const mangaLists = data.data;
        return mangaLists
    } catch (error) {
        return
}
}