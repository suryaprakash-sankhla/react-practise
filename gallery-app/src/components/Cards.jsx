import React from 'react'

const Cards = (props) => {
  return (
      <div>
          <a href={props.elm.url} target='_blank'>
              <div className='h-40 w-44 bg-gray-950 rounded-xl overflow-hidden'>
                  <img src={props.elm.download_url} alt="" className='h-full w-full object-cover ' />
              </div>
              <h2 className='font-bold text-lg'>{props.elm.author}</h2>
          </a>
    </div>
  )
}

export default Cards