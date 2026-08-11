import React from 'react'
import Leftcontent from './Leftcontent'
import Rightcontent from './Rightcontent'

const Page1content = (props) => {
  return (
      <div className='pt-6 pb-16 px-18 items-center  h-[90vh] flex gap-10'>
          <Leftcontent />
      <Rightcontent users={ props.users} />
    </div>
  )
}

export default Page1content