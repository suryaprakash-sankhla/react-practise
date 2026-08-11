import React from 'react'
import Section1 from './components/section1/Section1'
import Section2 from './components/section2/Section2'

const App = () => {

  const users = [
    {
      id:'1',
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmVzc2lvbmFsfGVufDB8fDB8fHww',
      intro: 'Aisha is a creative graphic designer who loves digital art.',
      tag: 'Satisfied'
    },
    {
      id: '2',
      img: 'https://plus.unsplash.com/premium_photo-1661769159995-f3af0089875f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      intro: 'Neha is a marketing student who enjoys public speaking.',
      tag: 'Undeserved'
    },
    {
      id: '3',
      img: 'https://images.unsplash.com/photo-1498758536662-35b82cd15e29?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      intro: 'Rahul is a web developer who loves coding.',
      tag: 'Underbanked'
    },
    {
      id: '4',
      img: 'https://media.istockphoto.com/id/2148327938/photo/woman-uses-laptop-successful-curly-haired-hispanic-or-brazilian-woman-in-stylish-elegant.jpg?s=2048x2048&w=is&k=20&c=VmWm0a2x9MOvDjMvQOYc2GSOZaDcT1pa2jO2C7YJv2c=',
      intro: 'Anjali is a web developer who loves coding.',
      tag: 'Selected'
    }
  ]

  return (
    <div>
      <Section1 users={users} />

    </div>
  )
}

export default App