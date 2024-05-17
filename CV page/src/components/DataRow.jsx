function DataRow({ data, dataValue }) {
    return (
        <div className="dataRow">
            <span className="rowData">{data}:</span>
            <span className="rowDataValue">{dataValue}</span>
        </div>
    )
}

export default DataRow;