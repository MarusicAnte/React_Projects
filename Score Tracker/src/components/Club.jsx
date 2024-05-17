function Club({ imgURL, alt, title }) {
    return (
        <div className='clubContainer'>
            <img src={imgURL} alt={alt} className="clubLogo" />
            <h1 className="clubTitle">{title}</h1>
        </div>
    );
}

export default Club;