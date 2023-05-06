import React from "react";
import "./Card.css";

export const PokemonCard = ({ pokemon }) => {
	return (
		<div className="card">
			<div className="cardImg">
				<img src={pokemon.sprites.front_default} alt="" />
			</div>
			<h3 className="cardName">{pokemon.name}</h3>
			<div className="cardTypes">
				<div className="cardType">
					Type :
					{pokemon.types.map((type) => {
						return (
							<span className="typeName" key={type.type.name}>
								{type.type.name}
							</span>
						);
					})}
				</div>
			</div>
			<div className="cardInfo">
				<div className="cardData">
					<p className="title">weight : {pokemon.weight / 10}kg</p>
				</div>
				<div className="cardData">
					<p className="title">height : {pokemon.height / 10}m</p>
				</div>
				<div className="cardData">
					<p className="title">ability : {pokemon.abilities[0].ability.name}</p>
				</div>
			</div>
		</div>
	);
};

export default PokemonCard;
