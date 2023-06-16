import './Admin.scss';
function Admin() {

  return (
    <div className="admin-container">
      <div className="admin-bar">
        <a href="/admin-service">
          <button>Services</button>
        </a>
        <a href="/admin-horaire">
          <button>Horaires</button>
        </a>
        <a href="/admin-employe">
          <button>Employés</button>
        </a>
        <a href="/admin-car">
          <button>Vente véhicules</button>
        </a>
        <a href="/admin-feedback">
          <button>Commentaires</button>
        </a>
      </div>
      <div className='admin-section-container'>

      </div>
    </div>

  )
}

export default Admin;