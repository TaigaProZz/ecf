import FeedbackList from './FeedbackList/FeedbackList';
import CommentBox from './SendFeedback/SendFeedback';
import './Feedback.scss'

function SectionFeedback() {
  return (
      <section className="darkHomeSection">
        <div className='sectionFeedbackContainer'>
          <div className="header">
            <h1 className="subTitle">Car l'avis de nos clients comptent...</h1>
          </div>
          <div className="boxs">
            <FeedbackList name="Jean Frounite" text="Pas ouf ..." grade='2' />
            <FeedbackList name="Patrick Loustique" text="J'adore ce garage omg !!! je vais laisser un long commentaire pour le référencement de la page et pouvoir faire découvrir à tous mes amis et au monde entier ce fabuleux garage ! J'adore la méchanique !" grade='5' />
            <FeedbackList name="Karine Pichonard" text="Je suis le commentaire" grade='3'/>
          </div>
          <div className="sendFeedbackList">
            <CommentBox />
          </div>
        </div>
      </section>
  );
}

export default SectionFeedback;