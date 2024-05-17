import { useState, useEffect } from "react";
import RadioInput from "../../components/inputs/RadioInput";
import Table from "../../components/table/Table";
import style from './Read.module.css';

function DataDisplay({ items, setItems }) {

    const [selectedValue, setSelectedValue] = useState("Sve");
    const [filterItems, setFilterItems] = useState([]);

    useEffect(() => {
        if (selectedValue == "Sve") {
            setFilterItems(items);
        }
        else {
            setFilterItems(
                items.filter((item) => item.vrsta == selectedValue)
            );
        }
    }, [items, selectedValue]);

    const handleOptionChange = (event) => {
        setSelectedValue(event.target.value);
    };


    return (
        <div className={style["info"]}>
            <div className={style["filter"]}>
                <h2>Filter</h2>
                <RadioInput
                    value="Sve"
                    checked={selectedValue === "Sve"}
                    action={handleOptionChange}
                />

                <RadioInput
                    value="Majica"
                    checked={selectedValue === "Majica"}
                    action={handleOptionChange}
                />

                <RadioInput
                    value="Hlače"
                    checked={selectedValue === "Hlače"}
                    action={handleOptionChange}
                />

                <RadioInput
                    value="Suknja"
                    checked={selectedValue === "Suknja"}
                    action={handleOptionChange}
                />
            </div>

            <div className={style["item-list"]}>
                <h2>Popis</h2>
                <Table
                    items={filterItems}
                    change={setItems}
                />
            </div>
        </div>
    )
}

export default DataDisplay;