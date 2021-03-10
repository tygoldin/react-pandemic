class Board {
	constructor(){
		this.cities = [];
		this.playerDeck = [];
		this.playerDiscardPile = [];
		this.infectionDeck = [];
		this.infectionDiscardPile = [];
		this.players = [];
		this.cured = {blue: false, red: false, black: false, yellow: false}
		this.eradicated = {blue: false, red: false, black: false, yellow: false};
		this.turn = 0;
		this.outbreaks = 0;
		this.diseaseCubes = {blue: 24, red: 24, black: 24, yellow: 24};
		this.researchStations = 6;
	}
}



class City {
	constructor(name, color, population, researchStation){
		this.name = name;
		this.color = color;
		this.population = population;
		this.researchStation = researchStation;
		this.infectionCubes = 0;
		this.adjacentCities = [];
	}

	addCubes(infectionCubes){
		if (this.infectionCubes == 3){
			return false;
		}

		this.infectionCubes = this.infectionCubes + infectionCubes;

		return true;
	}

	removeCubes(infectionCubes){
		if (this.infectionCubes == 0){
			return false;
		} else if (infectionCubes == 3){
			this.infectionCubes = 0;
		} else {
			this.infectionCubes = this.infectionCubes - infectionCubes;
		}

		return true;
	}

	placeResearchStation(){
		if (this.researchStation == true){
			return false;
		}
		
		this.researchStation = true;
		
		return true;
	}

	setAdjacentCities(cityArray){
		this.adjacentCities = this.adjacentCities.concat(cityArray);
	}
}

class Player {
	constructor(name, color){
		this.name = name;
		this.color = color;
		this.city = null;
		this.cards = [];
	}

	drive(city){
		if (this.city.adjacentCities.includes(city)){
			this.city = city;
			return true;
		}
		return false;
	}

	directFlight(city){
		var resultDeck = [];
		for (var i = 0; i < this.cards.length; i++){
			if (this.cards[i] instanceof CityCard){
				if (Object.is(this.cards[i].city, city)){
					this.city = city;
				} else {
					resultDeck.push(this.cards[i]);
				}
			} else {
				resultDeck.push(this.cards[i]);
			}
		}

		if (resultDeck.length == this.cards.length){
			return false;
		} else {
			this.cards = resultDeck;
			return true;
		}
	}

	charterFlight(city){
		var resultDeck = [];
		for (var i = 0; i < this.cards.length; i++){
			if (this.cards[i] instanceof CityCard){
				if (Object.is(this.cards[i].city, this.city)){
					this.city = city;
				} else {
					resultDeck.push(this.cards[i]);
				}
			} else {
				resultDeck.push(this.cards[i]);
			}
		}

		if (resultDeck.length == this.cards.length){
			return false;
		} else {
			this.cards = resultDeck;
			return true;
		}
	}

	shuttleFlight(city){
		if (this.city.researchStation == true && city.researchStation == true){
			this.city = city;
			return true;
		}
		return false;
	}

	buildResearchStation(board){
		if (board.researchStations == 0){
			return false;
		}
		var resultDeck = [];
		for (var i = 0; i < this.cards.length; i++){
			if (this.cards[i] instanceof CityCard){
				if (Object.is(this.cards[i].city, this.city) && this.city.placeResearchStation()){
					board.researchStations = board.researchStations - 1;
				} else {
					resultDeck.push(this.cards[i]);
				}
			} else {
				resultDeck.push(this.cards[i]);
			}
		}

		if (resultDeck.length == this.cards.length){
			return false;
		} else {
			this.cards = resultDeck;
			return true;
		}
	}

	treat(){
		return this.city.removeCubes(1);
	}

	giveCityCard(player, card){
		var resultDeck = [];
		if (this.cards.includes(card) && Object.is(this.city, card.city) && Object.is(player.city, card.city)){
			player.cards.push(card);
			for (var i = 0; i < this.cards.length; i++){
				if (!Object.is(this.cards[i], card)){
					resultDeck.push(this.cards[i]);
				}
			}
			this.cards = resultDeck;
			return true;
		} else {
			return false;
		}
	}

	takeCityCard(player, card){
		var resultDeck = [];
		if(player.cards.includes(card) && Object.is(this.city, card.city) && Object.is(player.city, card.city)){
			this.cards.push(card);
			for (var i = 0; i < player.cards.length; i++){
				if (!Object.is(player.cards[i], card)){
					resultDeck.push(player.cards[i]);
				}
			}
			player.cards = resultDeck;
			return true;
		} else {
			return false;
		}
	}

	cure(color, board){
		if (board.cured[color] == true){
			return false;
		}
		var cureCards = [];
		var resultDeck = [];
		for(var i = 0; i < this.cards.length; i++){
			if(this.cards[i] instanceof CityCard && this.cards[i].city.color == color){
				cureCards.push(this.cards[i]);
			} else {
				resultDeck.push(this.cards[i]);
			}
		}
		if(cureCards.length == 5){
			this.cards = resultDeck;
			board.cured[color] = true;
			return true;
		}
		return false;
	}

}

class Medic extends Player {
	constructor(name, color){
		super(name, color);
	}

	treat(){
		return this.city.removeCubes(3);
	}
}

class Researcher extends Player {
	constructor(name, color){
		super(name, color);
	}

	giveCityCard(player, card){
		var resultDeck = [];
		if(this.cards.includes(card)){
			player.cards.push(card);
			for (var i = 0; i < this.cards.length; i++){
				if (!Object.is(this.cards[i], card)){
					resultDeck.push(this.cards[i]);
				}
			}
			this.cards = resultDeck;
			return true;
		} else {
			return false;
		}
	}
}

class Scientist extends Player {
	constructor(name, color){
		super(name, color);
	}
	cure(color, board){
		if (board.cured[color] == true){
			return false;
		}
		var cureCards = [];
		var resultDeck = [];
		for(var i = 0; i < this.cards.length; i++){
			if(this.cards[i] instanceof CityCard && this.cards[i].city.color == color){
				cureCards.push(this.cards[i]);
			} else {
				resultDeck.push(this.cards[i]);
			}
		}
		if(cureCards.length == 4){
			this.cards = resultDeck;
			board.cured[color] = true;
			return true;
		}
		return false;
	}
}

class Dispatcher extends Player {
	constructor(name, color){
		super(name, color);
	}
}


class InfectionCard {
	constructor(city){
		this.city = city;
	}
}

class PlayerCard {
	constructor(){

	}
}

class CityCard extends PlayerCard {
	constructor(city){
		super();
		this.city = city;
	}
	play(){

	}
}

class EpidemicCard extends PlayerCard {
	constructor(){
		super();
	}
}

class EventCard extends PlayerCard {
	constructor(){
		super();
	}
	use(){

	}
}

exports.Board = Board;
exports.City = City;
exports.Player = Player;
exports.Medic = Medic;
exports.Researcher = Researcher;
exports.Dispatcher = Dispatcher;
exports.InfectionCard = InfectionCard;
exports.PlayerCard = PlayerCard;
exports.CityCard = CityCard;
exports.EpidemicCard = EpidemicCard;
exports.EventCard = EventCard;