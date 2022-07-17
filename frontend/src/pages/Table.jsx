import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import TableForm from '../components/tableForm'
import '../index.css'
import Spinner from '../components/Spinner'


function Table() {
  const {user} = useSelector((state) => state.auth)
  let navigate = useNavigate();
  const {isLoading, isError, message} = useSelector((state) => state.purchases)

  useEffect(() => {

    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login')
    }
  
  }, [user, navigate, isError, message] )

  return (
    <>
      <div className='heading'>
        <h1>License Table</h1>
      </div>
    
      <TableForm/>
    </>
  )
}

export default Table