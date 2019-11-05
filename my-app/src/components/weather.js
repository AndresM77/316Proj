import React from 'react'

const Weather = (props) => {
  console.log(props.weathers)
  return (
    <div>
      Weather is: {props.weathers.annualData}
    </div>
  )
};

export default Weather