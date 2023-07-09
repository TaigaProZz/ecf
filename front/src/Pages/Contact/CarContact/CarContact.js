import '../Contact.scss';
import { useParams } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
// import { CARS } from '../../../Data/cars.js'
import axios from 'axios';
require('dotenv').config();

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
        const response = await axios.get(`ecf-node-serverr.vercel.app:${process.env.API_PORT}/car/${params.id}`);
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
      await axios.post(`ecf-node-serverr.vercel.app:${process.env.API_PORT}/contact`, {
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
    <div className="contact-container">
      <form ref={form} className='contact-form'>
        <h2 className='center'>Formulaire de contact</h2>
        <div className='row'>
          <label>Nom prénom :</label>
          <input ref={nameInputRef} type='text' placeholder='Entrez votre nom prénom'></input>
        </div>
        <div className='row'>
          <label>Téléphone :</label>
          <input ref={phoneInputRef} type='tel' placeholder='Entrez votre numéro de téléphone'></input>
        </div>
        <div className='row'>
          <label>Email :</label>
          <input ref={emailInputRef} type='email' placeholder='Entrez votre email'></input>
        </div>
        <div className='row'>
          <label>Voiture:</label>
          <textarea disabled ref={msgInputRef} id='car-contact-car' placeholder={element.title + ' réf: ' + element.id}></textarea>
        </div>
        <div className='msg-row row'>
          <label>Message:</label>
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