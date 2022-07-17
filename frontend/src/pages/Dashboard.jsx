import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import PurchaseForm from '../components/purchaseForm'
import '../index.css'



function Dashboard() {
  const navigate = useNavigate()
  const {user} = useSelector((state) => state.auth)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])
  
  return (
    <>
      <div className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <h3>Add a New License</h3>
      </div>
      
      <PurchaseForm/>
    </>
  )
}

export default Dashboard