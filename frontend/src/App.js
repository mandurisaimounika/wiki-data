import React, { useState, useEffect } from 'react'
import { Dropdown } from 'react-bootstrap'
import './App.css'
import axios from 'axios'
import ShowCarInfo from './ShowCarInfo'

function App () {
  const [data, setData] = useState([])
  const [selectedName, setSelectedName] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(async () => {
    const result = await axios.get(
      'http://localhost:8080/getCarModels'
    )
    // console.log(result.data.details)
    setData(result.data.models)
    setLoading(false)
  }, [])

  return (
    <div className="App">
      <header className="App-header">
       { loading ? <div className="loading">Loading...</div> : <div></div> }
       <Dropdown>
         <Dropdown.Toggle variant="success" id="dropdown-basic">
             Dropdown Button
         </Dropdown.Toggle>

         <Dropdown.Menu>
           {data.map((obj, index) => {
             return <Dropdown.Item href="#/action-1" key={index} onClick={() => setSelectedName(obj.modelName)}>
                      {obj.modelName}
                    </Dropdown.Item>
           })}
         </Dropdown.Menu>
       </Dropdown>
       { selectedName ? <ShowCarInfo data = {data} selectedName = {selectedName}/> : null }
      </header>
    </div>
  )
}

export default App
