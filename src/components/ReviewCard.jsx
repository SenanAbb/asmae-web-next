import { AiFillStar } from 'react-icons/ai';

const ReviewCard = ({ review }) => {
  return (
    <article className="review-card">
      <div className="review-card-header">
        <div className="reviewer-profile">
          <div className="profile-image-container">
            <img
              src={review.image || '/placeholder.svg'}
              alt={review.name}
              className="profile-image"
            />
            <div className="google-badge">
              <img src="/icons/google-icon.webp" alt="Google" className="google-icon" />
            </div>
          </div>
          <div className="reviewer-info">
            <h3 className="reviewer-name">{review.name}</h3>
            <div className="rating-stars">
              {Array.from({ length: 5 }, (_, index) => (
                <AiFillStar key={index} className={`star ${index < review.rating ? 'filled' : 'empty'}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="review-content">
        <p className="review-text">{review.description}</p>
        <div className="review-decoration"></div>
      </div>
    </article>
  );
};

export default ReviewCard;
