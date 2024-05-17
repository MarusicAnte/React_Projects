function Radio({ name, value, checked, action }) {
    return (
        <div>
            <input type="radio" value={value} id={value} name={name} checked={checked} onChange={action} />
            <label htmlFor={value}>{value}</label>
        </div>
    );
}

export default Radio;