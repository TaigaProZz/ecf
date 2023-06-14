import './SendFeedback.scss';

function SendFeedback() {

  return (
    <div className="box">
      <form className=''>
        <div className="form-group inputBox">
          <label htmlFor="name">Nom :</label>
          <input type="text" id="name" name="name" className='inputName' placeholder="Votre nom" required></input>
        </div>
        
        <div className="form-group inputBox">
          <label htmlFor="message">Message :</label>
          <input id="message" name="message" className='inputMessage' placeholder="Votre message" required></input>
        </div>

        <div className='center'>
          <div className="form-group inputRadio">
            <label htmlFor="rating">Note :</label>
            <div className="rating">
              {[1, 2, 3, 4, 5].map((value) => (
                <label key={value}>
                  <input type="radio" name="rating" value={value} />
                  <span className="star"></span>
                </label>
              ))}
            </div>
          </div>
          <div >
              <button className='btn'>Envoyer</button>
            </div>
        </div>   
      </form>
    </div>
  );
};

export default SendFeedback;