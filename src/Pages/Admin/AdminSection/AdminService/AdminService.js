import './AdminService.scss'
import { BsPlusSquare } from 'react-icons/bs'

function AdminServices () {

  return ( 
    <div className='admin-service-container'>
    <header>
        <button className='add-service-btn'>Ajouter un service <BsPlusSquare size={30}/></button>
    </header>
    <div className='admin-service-container'>
      <div className='admin-service'>
        <div className='admin-service-title'>
          <h3>Service 1</h3>
          <button className='admin-service-btn'>Modifier</button>
          <button className='admin-service-btn'>Supprimer</button>
        </div>
        <div className='admin-service-content'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
        </div>
      </div>
      <div className='admin-service'>
        <div className='admin-service-title'>
          <h3>Service 2</h3>
          <button className='admin-service-btn'>Modifier</button>
          <button className='admin-service-btn'>Supprimer</button>
        </div>
        <div className='admin-service-content'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
        </div>
      </div>
    </div>
  </div>

    )
} 

export default AdminServices;