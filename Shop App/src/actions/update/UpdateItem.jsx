import React from "react";
import axios from "axios";
import Button from "../../components/buttons/Button";

function UpdateItem(props) {

    function ProcessData(object) {
        return {
            vrsta: object.vrsta,
            velicina: object.velicina,
            boja: object.boja,
            slika: object.slika,
        };
    }

    async function saveData() {
        const toSend = ProcessData(props.dataForm);

        const lowerCaseType = props.dataForm.vrsta.toLowerCase();
        const lowerCaseImg = props.dataForm.slika.toLowerCase();
        const isMatched = lowerCaseImg.includes(lowerCaseType);

        if (!isMatched) {
            alert("Vrsta ažuriranog proizvoda i njegova slika se ne podudaraju !!!");
            return;
        }

        await axios.put(`http://localhost:3001/garderoba/${props.item.id}`, toSend);
        const result = await
            axios.get("http://localhost:3001/garderoba");
        props.change(result.data);
        props.setUpdate(false);
    }

    function startUpdate() {
        props.setDataForm({
            vrsta: props.item.vrsta,
            velicina: props.item.velicina,
            boja: props.item.boja,
            slika: props.item.slika,
        });
        props.setUpdate(true);
    }


    return (
        <>
            {props.update ? (
                <Button
                    className="save-button"
                    action={saveData}
                    text="SPREMI"
                />
            ) : (
                <Button
                    className="update-button"
                    action={startUpdate}
                    text="UREDI"
                />
            )}
            {""}
        </>
    );
}

export default UpdateItem;