import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Button from "../../components/buttons/Button";
import SelecDataContainer from "../../components/containers/SelectDataContainer";
import InputDataContainer from "../../components/containers/InputDataContainer";
import ImageDataContainer from "../../components/containers/ImageDataContainer";
import style from './Create.module.css';
import SelectDataContainer from "../../components/containers/SelectDataContainer";

function CreateItem(props) {
    const [type, setType] = useState([]);
    const [size, setSize] = useState([]);
    const [image, setImage] = useState([]);
    const [dataForm, setDataForm] = useState({
        vrsta: " ",
        velicina: " ",
        boja: " ",
        slika: " "
    });
    const [invalidInputData, setInvalidInputData] = useState(false);

    useEffect(() => {
        const firstRetrive = async () => {
            const getType = axios.get("http://localhost:3001/vrsta");
            const getSize = axios.get("http://localhost:3001/velicina");
            const getImg = axios.get("http://localhost:3001/slike");

            const requestArray = [getType, getSize, getImg];

            try {
                const [firstResult, secondResult, thirdResult] = await Promise.all(
                    requestArray
                );

                setType(firstResult.data);
                setSize(secondResult.data);
                setImage(thirdResult.data);
            }
            catch (error) {
                console.log(error);
            }
        };

        firstRetrive();
    }, []);

    useEffect(() => {
        if (dataForm.vrsta === " " || dataForm.velicina === " " || dataForm.slika === " " ||
            dataForm.vrsta === "Odaberi" || dataForm.velicina === "Odaberi" || dataForm.slika === "Odaberi") {
            setInvalidInputData(true);
        } else {
            setInvalidInputData(false);
        }
    }, [dataForm])


    const sendData = async (event) => {
        event.preventDefault();

        const toSend = ProcesData(dataForm);

        const lowerCaseType = dataForm.vrsta.toLowerCase();
        const lowerCaseImg = dataForm.slika.toLowerCase();
        const isMatched = lowerCaseImg.includes(lowerCaseType);

        if (!isMatched || invalidInputData) {
            alert("Greška kod unosa podataka! Molimo provjerite unos forme.");
            return;
        }

        await axios.post("http://localhost:3001/garderoba", toSend);
        const result = await axios.get("http://localhost:3001/garderoba");
        props.add(result.data);
    };

    function inputChange(event) {
        const { name, value } = event.target;
        setDataForm({ ...dataForm, [name]: value });
    }

    function ProcesData(object) {
        return {
            vrsta: object.vrsta,
            velicina: object.velicina,
            boja: object.boja,
            slika: object.slika,
        };
    }

    return (
        <div className={style["add-item"]}>
            <h2>Dodaj novu</h2>
            <form className={style["form"]} onSubmit={sendData}>
                <SelectDataContainer
                    name="vrsta"
                    value={dataForm.vrsta}
                    action={inputChange}
                    array={type}
                    info="Vrsta"
                />

                <SelecDataContainer
                    name="velicina"
                    value={dataForm.velicina}
                    action={inputChange}
                    array={size}
                    info="Veličina"
                />

                <ImageDataContainer
                    name="slika"
                    value={dataForm.slika}
                    action={inputChange}
                    array={image}
                    info="Slika"
                />

                <InputDataContainer
                    info="Boja"
                    value={dataForm.boja}
                    action={inputChange}
                />

                <Button
                    className="submit-button"
                    type="submit"
                    text="SPREMI"
                />

            </form>
        </div>
    );
}

export default CreateItem;