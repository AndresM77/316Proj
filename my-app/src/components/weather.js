import React from 'react'

const Weather = (props) => {
  console.log(props.weathers)
  return (
    <div>
      {props.weathers.annualData}
    </div>
  )
};

export default Weather