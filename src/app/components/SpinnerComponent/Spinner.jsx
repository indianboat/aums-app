"use client";

const Spinner = ({className=""}) => {
  return (
  <>
    <div className={`spinner-box ${className}`}>
      <span className='spinner-circle1'></span>
      <span className='spinner-circle2'></span>
    </div>
  </>
  )
}

export default Spinner;