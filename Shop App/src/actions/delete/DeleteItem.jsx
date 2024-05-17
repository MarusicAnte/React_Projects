import React from "react";
import axios from "axios";
import Button from "../../components/buttons/Button";

function DeleteItem(props) {

    async function deleteItem() {
        if (window.confirm("Jeste li sigurni da želite ukloniti ovaj proizvod ?")) {
            await axios.delete(`http://localhost:3001/garderoba/${props.item.id}`);
            const result = await
                axios.get("http://localhost:3001/garderoba")
                    .then(rez => props.change(rez.data))
                    .catch(err => alert(err.message));
            // props.change(rez.data);
        }
    }

    return (
        <Button
            className="delete-button"
            action={deleteItem}
            text="X"
        />
    );
}

export default DeleteItem;