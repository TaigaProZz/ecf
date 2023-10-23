import './Contact.scss';

function ContactComponent (props) {

  return (
    <div className="contact-container">
      <form ref={props.form} className='contact-form'>
        <h1 className='form-title'>Formulaire de contact</h1>
        <div className='name-row row'>
          <label htmlFor="name">Nom prénom :</label>
          <input ref={props.nameInputRef} type='text' id="name" placeholder='Entrez votre nom prénom'></input>
        </div>
        <div className='phone-row row'>
          <label htmlFor="phone">Téléphone :</label>
          <input ref={props.phoneInputRef} type='tel' id="phone" placeholder='Entrez votre numéro de téléphone'></input>
        </div>
        <div className='email-row row'>
          <label htmlFor="email">Email :</label>
          <input ref={props.emailInputRef} type='email' id="email" placeholder='Entrez votre email'></input>
        </div>
        { // check if form is for car
          props.isCustom ? (
            <div className='row'>
              <label htmlFor="car-contact-car">Voiture:</label>
              <textarea disabled ref={props.msgInputRef} id='car-contact-car' placeholder={props.element.title + ' réf: ' + props.id}></textarea>
            </div>
          ) : null
        }
        <div className='msg-row row'>
          <label htmlFor="message">Message:</label>
          <textarea ref={props.msgInputRef} id='message' placeholder='Entrez votre message'></textarea>
        </div>
        <div className='center'>
          <button className='home-button' type='submit' onClick={props.submit}>Envoyer</button>
        </div>
      </form>
    </div>
  );  
}


export default ContactComponent;