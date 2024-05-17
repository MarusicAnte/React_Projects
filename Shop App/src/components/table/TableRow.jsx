import React from "react";
import axios from "axios";
import styled from "styled-components";
import { useState, useEffect } from "react";
import DeleteItem from "../../actions/delete/DeleteItem";
import UpdateItem from "../../actions/update/UpdateItem";
import SelectInput from "../inputs/SelectInput";
import ColorPicker from "../inputs/ColorPicker";
import ImageInput from "../inputs/ImageInput";
import style from "./Table.module.css";

const Color = styled.div`
    background-color: ${(props) => (props.color === " ") ? "black" : props.color};
    width: 1.5em; 
    height: 1.5em;
    margin: 0 auto;
    border: 0.1px solid black;
`;

function TableRow({ item, change }) {
    const [update, setUpdate] = useState(false);
    const [dataForm, setDataForm] = useState({});
    const [type, setType] = useState([]);
    const [size, setSize] = useState([]);
    const [image, setImage] = useState([]);

    useEffect(() => {
        const firstRetrive = async () => {
            const getType = axios.get("http://localhost:3001/vrsta");
            const getSize = axios.get("http://localhost:3001/velicina");
            const getImage = axios.get("http://localhost:3001/slike");

            const requestArray = [getType, getSize, getImage];

            try {
                const [firstResult, secondResult, thirdResult] = await Promise.all(
                    requestArray
                );

                setType(firstResult.data);
                setSize(secondResult.data);
                setImage(thirdResult.data);
            } catch (error) {
                console.log(error);
            }
        };

        firstRetrive();
    }, []);

    function inoutChange(event) {
        const { name, value } = event.target;
        setDataForm({ ...dataForm, [name]: value });
    }

    return (
        <tr className={style["row"]}>
            <td>
                {update ? (
                    <SelectInput
                        name="vrsta"
                        value={dataForm.vrsta}
                        action={inoutChange}
                        array={type}
                        info="Type"
                    />
                ) : (
                    item.vrsta
                )}
                {""}
            </td>

            <td>
                {update ? (
                    <SelectInput
                        name="velicina"
                        value={dataForm.velicina}
                        action={inoutChange}
                        array={size}
                        info="Size"
                    />
                ) : (
                    item.velicina
                )}
                {""}
            </td>

            <td>
                {update ? (
                    <ColorPicker value={dataForm.boja} action={inoutChange} />
                ) : (
                    <Color color={item.boja} />
                )}
                {""}
            </td>

            <td>
                {update ? (
                    <ImageInput
                        name="slika"
                        value={dataForm.slika}
                        action={inoutChange}
                        array={image}
                        info="Image"
                    />
                ) : (
                    <div className={style["image-div"]}>
                        <img
                            className={style["image"]}
                            src={item.slika}
                            alt={item.slika}
                        />
                    </div>
                )}
                {""}
            </td>

            <td>
                <div className={style["options"]}>
                    <UpdateItem
                        dataForm={dataForm}
                        item={item}
                        change={change}
                        setUpdate={setUpdate}
                        setDataForm={setDataForm}
                        update={update}
                    />
                    <DeleteItem change={change} item={item} />
                </div>
            </td>

        </tr>
    );
}

export default TableRow;