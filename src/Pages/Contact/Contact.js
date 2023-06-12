

const style = {
  height: '80vh',
  border : 'solid 1px white',
  borderRadius : '10px',
  backgroundColor: '#3F4458',
  color : 'white',
  marginTop : '5vh',
}

function Contact() {
  return (
    <div>
      <div style= {style}>
        <div className='center' style={{width:'50vh'}}>
          <h1 className='hCenter'>Formulaire de contact</h1>

          <div className="mb-3" controlId="formBasicEmail">
            <div>Email address</div>
            <div type="email" placeholder="Entrez votre email" />
          </div>

          <div className="mb-3" controlId="formBasicTeDxt">
            <div>Nom Prénom</div>
            <div type="text" placeholder="Entrez votre nom " />
          </div>

          <div className='hCenter'>
            <div variant="primary" type="submit">
              Envoyer
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;