import CommsBox from './CommsBox/CommsBox';
import CommentBox from './SendComms/SendComms';
import './Comms.scss'

function SectionComms() {
  return (
      <section className="darkHomeSection">
        <div className='sectionCommsContainer'>
          <div className="header">
            <h1 className="subTitle">Car l'avis de nos clients comptent...</h1>
          </div>
          <div className="boxs">
            <CommsBox title="Je suis un titre" text="Je suis le commentaire" />
            <CommsBox title="Je suis un titre" text="Je suis le commentaire" />
            <CommsBox title="Je suis un titre" text="Je suis le commentaire" />
          </div>
          <div className="sendCommsBox">
            <CommentBox />
          </div>
        </div>
      </section>
  );
}

export default SectionComms;