import React from 'react';

function Card(props) {
  const [liked, setLiked] = React.useState(false);

  function handleClick() {
    props.onCardClick(props.card);
  }

  function likeClick() {
    setLiked(!liked)
  }

  return (
    <li className="element">
      <div className="element__image-container">
        <img onClick={handleClick} className="element__image" src={props.card.link} alt={props.card.name}></img>
      </div>
      <button className="element__trash" type="button" />
      <div className="element__text-box">
        <h4 className="element__name">{props.card.name}</h4>
        <div className="element__like-box">
          <button onClick={likeClick} className={`element__like ${liked && 'element__like_active'}`} type="button" />
          <p className='element__likes'>{props.likeCounter}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
