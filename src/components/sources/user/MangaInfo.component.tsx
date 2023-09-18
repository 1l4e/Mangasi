

export default function MangaInfoComponent({mangaData,sId}:any) {
  return (
    <div className="flex flex-col lg:flex-row py-20 gap-4">
        <img src={mangaData.image}></img>
        
        <div className="flex flex-col">
          <h1 className="text-xl text-center">{mangaData.name}</h1>
          <span>Author : {mangaData.author}</span>
          <span>Other Name: {mangaData.otherName}</span>
          <div className="flex flex-row gap-4">
            <span>Genres</span>
            <ul className="flex flex-row gap-4">
              {mangaData.genres?.map((item: any, index: number) => (
                <li key={index}>{item.name}</li>
              ))}
            </ul>
          </div>

          <span>{mangaData.description}</span>
        </div>
      </div>
  )
}
