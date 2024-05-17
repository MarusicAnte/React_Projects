import { useState, useEffect } from 'react'
import axios from 'axios'
import CreateItem from "./actions/create/CreateItem";
import DataDisplay from "./actions/read/DataDisplay";
import './App.css'

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get("http://localhost:3001/garderoba/");
        setItems(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);


  return (
    <div className="App">
      <h1>Moja garderoba</h1>
      <div className='shop-content'>
        <CreateItem
          add={setItems}
        />
        <DataDisplay
          items={items}
          setItems={setItems}
        />
      </div>
    </div>
  )
}


export default App;
