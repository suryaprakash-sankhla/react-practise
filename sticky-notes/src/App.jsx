import React, { useState } from 'react'

const App = () => {

  const [title, settitle] = useState('');
  const [details, setDetails] = useState('');
  const [task, setTask] = useState([])

  const inputChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      settitle(value);
    } else {
      setDetails(value);
    }
  }


  const submitHandler = (e) => {
    e.preventDefault();

    const copyTask = [...task];
    copyTask.push({ title, details });

    setTask(copyTask);

    settitle('');
    setDetails('');
  }

  const deleteNote = (idx) => {
    const copyTask = [...task]
    copyTask.splice(idx, 1);
    console.log(idx);
    setTask(copyTask);
  }

  return (
    <div className='h-screen lg:flex w-full bg-orange-200 text-amber-900'>
      <form onSubmit={submitHandler} className='flex flex-col lg:w-1/2 items-start gap-5 p-10 '>
        <h1 className='text-4xl font-bold '>Add Notes</h1>
        <input
          type="text"
          placeholder='Enter Notes title'
          name='title'
          value={title}
          onChange={inputChange}
          className='font-medium outline-none w-full px-5 py-2 border-2 rounded-2xl' />

        <textarea
          type="text"
          placeholder='Write Details'
          name='details'
          value={details}
          onChange={inputChange}
          className='h-40  font-medium outline-none w-full px-5 py-2 border-2 rounded-2xl' />

        <button

          className='mx-auto w-1/3 px-5 py-2 border-2 rounded-2xl active:scale-95 bg-orange-200 text-amber-800 font-bold'>
          Add Notes
        </button>

      </form>
      <div className='lg:border-l-2 max-lg:border-t-2 lg:w-1/2  p-10'>
        <h1 className='text-4xl font-bold '>Recent Notes</h1>
        <div className='flex h-[90%] flex-wrap  gap-4 mt-5 overflow-auto no-scrollbar'>
          {task.map(function (e, idx) {
            return (
              <div key={idx} className=' bg-cover bg-[url("https://static.vecteezy.com/system/resources/previews/037/152/677/non_2x/sticky-note-paper-background-free-png.png")] rounded-2xl h-52 w-42 p-4 flex flex-col justify-between'>
                <div className='p-4 flex flex-col items-center justify-center'>
                  <h3 className='text-amber-900 text-xl font-bold font-mono leading-tight mt-1'>{e.title}</h3>
                  <p className='text-amber-900 mt-1 font-mono'>{e.details}</p>
                </div>
                <button
                  onClick={() => {
                    deleteNote(idx);
                  }}
                  className='w-full cursor-pointer active:scale-95 bg-amber-900 rounded-2xl text-yellow-100'>Delete</button>
              </div>
            )
          })}



        </div>
      </div>
    </div>
  )
}

export default App