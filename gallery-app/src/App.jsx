import { useEffect, useState } from 'react';
import axios from 'axios'
import Cards from './components/Cards'

const App = () => {

  const [user, setUser] = useState([]);
  const [page, setPage] = useState(1);
  
  useEffect(() => {
    getData();
  },[page])

  const getData = async () => {
    const response = await axios.get(`https://picsum.photos/v2/list?page=${page}&limit=100`);
    setUser(response.data);
  }

 
  let printUserData = <h3 className='absolute top-1/2 left-1/2'>Loading...</h3>
  if (user.length > 0) {
    printUserData = user.map((elm,idx) => {
      console.log(elm.download_url);
      return <div key={idx} >
        <Cards elm={elm} />
      </div>
    })
  }

  return (
    <div className='h-screen bg-black p-4 text-white overflow-auto flex flex-col justify-between' >
      
      <div className='flex flex-wrap  gap-5 p-2'>
        {printUserData}
      </div>
      <div className='flex items-center justify-center gap-5'>
        <button 
          
        onClick={()=>{
            if (page > 1) {
              setPage(page - 1);
              setUser([]);
            }
          }}
          style={{opacity: page ===1 ? 0.6 : 1}}
          className='bg-amber-400 active:scale-95  text-black rounded-xl font-bold m-2 py-2  px-6 text-xl'>
          Prev
        </button>
        <h2 className='font-bold text-xl'>
          Page {page}
        </h2>
        <button 
          onClick={() => {
            setUser([]);
            setPage(page + 1);
        }}
          className='bg-amber-400 active:scale-95  text-black rounded-xl font-bold m-2 py-2  px-6 text-xl'>
          Next
        </button>
      </div>
    </div>
  )
}

export default App
