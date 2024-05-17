function Checkbox({ checked, action, valid }) {
    return (
        <div className="checkbox">
            <input type="checkbox" id="checkbox" checked={checked} onChange={action} />
            <label htmlFor="checkbox">Prihvaćam uvjete narudžbe</label>

            {valid ? <span style={{ color: 'red', marginLeft: '15px' }}> Obavezno !</span> : null}
        </div>
    );
}

export default Checkbox;