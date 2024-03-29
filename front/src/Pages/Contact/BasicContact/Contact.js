import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useRef } from 'react';
import axios from 'axios';
import ContactComponent from '../../../Components/Contact/Contact';

function Contact() {
  const nameInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const msgInputRef = useRef(null);
  const form = useRef(null);

  // function to send message to db
  const sendData = async (name, phone, email, message) => {
    try {
      await axios.post(`${process.env.REACT_APP_API}/contact`, {
        subject: 'Contact',
        name: name,
        phone: phone,
        email: email,
        message: message
      });
    } catch (error) {
      console.log(error);
    }
  };

  // check every input and send message to db
  const submit = (e) => {
    e.preventDefault();
    
    const name = nameInputRef.current.value;
    const phone = phoneInputRef.current.value;
    const email = emailInputRef.current.value;
    const message = msgInputRef.current.value;
  
    const validationResult = checkInputs(name, phone, email, message);
  
    if (validationResult === "empty") {
      toast.warn('Veuillez remplir tous les champs');
    } else if (validationResult === "email") {
      toast.error('L\'adresse e-mail n\'est pas valide');
    } else if (validationResult === "phone") {
      toast.error('Le numéro de téléphone n\'est pas valide');
    } else {
      // Les données sont valides, envoyez le message en bdd
      sendData(name, phone, email, message);
      form.current.reset();
      toast.success('Votre message a bien été envoyé');
    }
  }

  return (
    <ContactComponent 
      submit={submit} 
      form={form} 
      nameInputRef={nameInputRef} 
      phoneInputRef={phoneInputRef}
      emailInputRef={emailInputRef}
      msgInputRef={msgInputRef}
      isCustom={false}
    />
  );
}

function checkInputs(name, phone, email, message) {
  if (email.trim() === '' || phone.trim() === '' || message.trim() === '' || name.trim() === '') {
    return "empty";
  } else if(!validateEmail(email)) {
      return "email";
  } else if(!validatePhone(phone)) {
      return "phone";
  }
  else {
    return true;
  }
}

function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/u;
  return regex.test(email);
}

function validatePhone(phone) {
  const regex = /^[0-9]{10}$/u;
  return regex.test(phone);
}

export default Contact;