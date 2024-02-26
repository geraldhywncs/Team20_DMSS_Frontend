import React from 'react'

function GraphBar({height}) {
  return (
    <React.Fragment>
        <div className='bar-chartContainer'>
        <span className="bar" style={{ height: `${height}%` }}>
                100
            </span>
            <span>
                Month
            </span>
        </div>

    </React.Fragment>
  )
}

const mockData= {

}

export default GraphBar