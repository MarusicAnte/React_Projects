function Card({ title, children }) {
    return (
        <div className="cardContainer">
            <h3 className="cardTitle">{title}</h3>
            {children}
        </div>
    )
}

export default Card;