import '../Contact.scss';
import { useParams } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
// import { CARS } from '../../../Data/cars.js'
import axios from 'axios';

function Contact() {
  const params = useParams();
  const [element, setElement] = useState(null);
  const nameInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const msgInputRef = useRef(null);
  const form = useRef(null);

  // get infos of car from database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3307/api/cars/${params.id}`);
        const car = response.data;
        setElement(car[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [params.id]);

  // check if car is null
  if (!element) {
    return null; 
  }

  // function to send msg to database
  const sendData = async (subject, name, phone, email, message) => {
    try {
      await axios.post("http://localhost:3307/api/postcontact", {
        subject: subject,
        name: name,
        phone: phone,
        email: email,
        message: message
      });
    } catch (error) {
      console.log(error);
    }
  };

  // check every input, and send message to database
  const submit = (e) => {
    e.preventDefault();
    if (
      nameInputRef.current.value === '' ||
      phoneInputRef.current.value === '' ||
      emailInputRef.current.value === '' ||
      msgInputRef.current.value === ''
    ) {
      alert('Veuillez remplir tous les champs');
    } else {
      const subject = element.title + ' réf: ' + element.id;
      const name = nameInputRef.current.value;
      const phone = phoneInputRef.current.value;
      const email = emailInputRef.current.value;
      const message = msgInputRef.current.value;
      // envoyer le message en bdd
      sendData(subject, name, phone, email, message);

      form.current.reset();
      alert('Votre message a bien été envoyé');
    }
  }

  return (
    <div className="container center">
      <form ref={form} className='form'>
        <h1 className='center'>Formulaire de contact</h1>
        <div className='row'>
          <p>Nom prénom :</p>
          <input ref={nameInputRef} className='center' type='text' placeholder='Entrez votre nom prénom'></input>
        </div>
        <div className='row'>
          <p>Téléphone :</p>
          <input ref={phoneInputRef} type="tel" required pattern="[0-9]{10}" placeholder='Entrez votre numéro de téléphone'></input>
        </div>
        <div className='row'>
          <p>Email :</p>
          <input ref={emailInputRef} type='email' placeholder='Entrez votre email'></input>
        </div>
        <div className='row'>
          <p>Voiture:</p>
          <textarea disabled ref={msgInputRef} id='car-contact-car' placeholder={element.title + ' réf: ' + element.id}></textarea>
        </div>
        <div className='msg-row row'>
          <p>Message:</p>
          <textarea ref={msgInputRef} id='car-contact-msg' placeholder='Entrez votre message'></textarea>
        </div>
        <div className='center'>
          <button className='home-button' type='submit' onClick={submit}>Envoyer</button>
        </div>
      </form>  
    </div>
  );
}

export default Contact;