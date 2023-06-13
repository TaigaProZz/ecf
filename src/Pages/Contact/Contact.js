import './Contact.scss';

function Contact() {
  return (
    <div className="container center">
      <div className='form'>
        <h1 className='center'>Formulaire de contact</h1>
        <div className='name-row row'>
          <p>Nom prénom :</p>
          <input id='name-input' className='center'></input>
        </div>
        <div className='phone-row row'>
          <p>Téléphone :</p>
          <input id='phone-input'></input>
        </div>
        <div className='email-row row'>
          <p>Email :</p>
          <input id='email-input'></input>
        </div>
        <div className='msg-row row'>
          <p>Message:</p>
          <input id='msg-input'></input>
        </div>
        <div className='center'>
          <div className='btn' type="submit">Envoyer</div>
        </div>
      </div>  
    </div>
  );
}

export default Contact;