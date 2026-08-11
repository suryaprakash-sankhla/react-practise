import React from 'react'
import RightCard from './RightCard'

const Rightcontent = (props) => {
   
  return (
      <div id="right" className='overflow-auto rounderd-4xl p-6 h-full w-2/3 flex gap-10 flex-nowrap '>
      {props.users.map(function (elm, idx) {
        
        return <RightCard key={idx} img={elm.img} id={elm.id} tag={elm.tag} intro={elm.intro} />
      })}
      </div>
  )
}

export default Rightcontent