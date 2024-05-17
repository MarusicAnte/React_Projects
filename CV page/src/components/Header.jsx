function Header({ preWord, title, imgURL }) {
    return (
        <div className="header">
            <h1> <span className="bruSpan">{preWord}</span> {title}</h1>
            <img src={imgURL} alt="batmanLogo" className="batmanLogo" />
        </div>
    );
}

export default Header;