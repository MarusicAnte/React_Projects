import React from "react";
import style from "./Table.module.css";
import TableRow from "./TableRow";

function Table({ items, change }) {
    return (
        <table className={style["table"]}>
            <thead>
                <tr>
                    <th>Vrsta</th>
                    <th>Veličina</th>
                    <th>Boja</th>
                    <th>Slika</th>
                    <th>Opcije</th>
                </tr>
            </thead>

            <tbody>
                {items.map(i => (
                    <TableRow key={i.id} item={i} change={change} />
                ))}
            </tbody>

        </table>
    );
}

export default Table;