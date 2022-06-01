import React from 'react'

const Errors = ({errors}) => {
  return (
    <>
        <div className="bg-red-600 p-4 mt-10 max-w-screen-sm w-3/4 mx-auto gap-5 text-white font-semibold">
            <ul>
                {errors.errors.map((error,index)=>
                    <li key={index}>{error}</li>
                )}
            </ul>
        </div>
    </>
  )
}
export default Errors