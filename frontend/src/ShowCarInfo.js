import React from 'react'

export default function ShowCarInfo (props) {
  const details = props.data.find((element) => element.modelName === props.selectedName)
  return (
         <div className="car-details" key={Math.floor(Math.random() * props.data.length)}>
           <div>
             <label>Car Model:</label>
             <span>{props.selectedName}</span>
           </div>
           <div>
             <label>Image:</label>
             <img src={details.imageUrl} width="160" height="120" alt="display image"/>
           </div>
           <div>
             <label>Production:</label>
             <span>{details.productionYear}</span>
           </div>
           <div>
             <label>Class:</label>
             <span>{details.carClass}</span>
           </div>
         </div>
  )
}
