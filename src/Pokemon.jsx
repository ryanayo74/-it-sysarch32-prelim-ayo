import React from 'react';

function Pokemon({ pokemon, language }) {
  const { id, name, type, base, image } = pokemon;

  const getNameByLanguage = () => {
    const selectedLanguage = language || 'english';
    return name[selectedLanguage];
  };

  return (
    <div className="Card">
      <img className="box-image" src={image} alt={name.english} />
      <h2>[{id}] {getNameByLanguage()} </h2>
      <p>Type: {type}</p>
      <div className="Pokemon_Details">
        <div>
          <p>HP: {base.HP} </p>
          <p>Attack: {base.Attack} </p>
          <p>Defense: {base.Defense} </p>
        </div>
        <div>
          <p>Speed: {base.Speed}</p>
          <p>Special Attack: {base['Sp. Attack']}</p>
          <p>Special Defense: {base['Sp. Defense']}</p>
        </div>
      </div>
    </div>
  );
}

export default Pokemon;
