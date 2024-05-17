function UpdateButton({ name, value, action, disabled }) {
    const activeClass = disabled ? 'disabledButton' : 'updateButton';

    function handleClick() {
        action();
    }

    return (
        <button className={activeClass} disabled={disabled} onClick={handleClick}>{value}</button>
    );
}

export default UpdateButton;