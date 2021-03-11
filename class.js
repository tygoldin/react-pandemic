class Board {
	constructor(){
		this.cities = [];
		this.playerDeck = [];
		this.playerDiscardPile = [];
		this.infectionDeck = [];
		this.infectionDiscardPile = [];
		this.epidemicDiscardPile = [];
		this.players = [];
		this.cured = {blue: false, red: false, black: false, yellow: false}
		this.eradicated = {blue: false, red: false, black: false, yellow: false};
		this.actionsLeft = 4;
		this.outbreaks = 0;
		this.diseaseCubes = {blue: 24, red: 24, black: 24, yellow: 24};
		this.researchStations = 5;
		this.infectionRates = [2,2,2,3,3,4,4];
	}

	// initial start up
	startGame(numberPlayers, epidemicCards){
		// adds Cities, CityCards, and InfectionCards
		cities.addCities(this);

		// set up players, will need to ask for input to React
		var players = [];
		for(var i = 0; i < numberPlayers; i++){
			players.push(new Medic(i, "blue"));
			players[i].city = this.cities[0];
		}
		this.players = players;

		

		// shuffles Infection Deck and Player Deck
		this.infectionDeck = this.shuffle(this.infectionDeck);
		this.playerDeck = this.shuffle(this.playerDeck);

		// infects starting cities
		for (var i = 0; i < 9; i++){

			let infectedCity = this.infectionDeck.pop();
			this.infectionDiscardPile.push(infectedCity);

			if(i < 3) {
				infectedCity.city.addCubes(1, this);
			} else if (i < 6) {
				infectedCity.city.addCubes(2, this);
			} else {
				infectedCity.city.addCubes(3, this);
			}
		}


		// give cards to players based on number of players
		for (var i = 0; i < players.length; i++){
			for (var j = 0; j < Math.ceil(8 / players.length); j++){
				this.players[i].cards.push(this.playerDeck.pop());
			}
		}

		// place and shuffle Epidemic Cards
		let index = 0;
		let arrayLength = this.playerDeck.length;
		let resultPlayerDeck = [];
		let chunk_size = this.playerDeck.length / epidemicCards;
		for (index = 0; index < arrayLength; index += chunk_size){
			let myChunk = this.playerDeck.slice(index, index+chunk_size);
			myChunk.push(new EpidemicCard());
			this.shuffle(myChunk);
			resultPlayerDeck = resultPlayerDeck.concat(myChunk);
		}

		this.playerDeck = resultPlayerDeck;

		this.actionsLeft = this.players[0].totalActions;

	}

	// current player moves
	move (player, city){
		// Dispatcher can move anyone, including to other player cities
		if (player[0] instanceof Dispatcher){
			for (var i = 0; i < this.players.length; i++){
				if (this.players[i].city == city){
					this.player.city = city;
					this.decrementAction();
					return true;
				}
			}
			if (player.drive(city) || player.shuttleFlight(city)){
				this.decrementAction();
				return true;
			}
		}

		// Checks if player's turn
		if (Object.is(player, this.players[0])){
			if (player.drive(city) || player.directFlight(city) || player.charterFlight(city) || player.shuttleFlight(city)){
				this.decrementAction();
				return true;
			}
		}

		return false;
	}

	// cure disease
	cure (player, color) {
		if (Object.is(player, this.players[0])){
			if(player.cure(color, this)){
				this.decrementAction();
				return true;
			}
		}
		return false;
	}

	// current player treats
	treat(player){
		if (Object.is(player, this.players[0])){
			if(player.treat()){
				this.decrementAction();
				return true;
			}
		}
		return false;
	}

	// current player builds research station
	buildResearchStation(player){
		if (Object.is(player, this.players[0])){
			if(player.buildResearchStation(this)){
				this.decrementAction();
				return true;
			}
		}
		return false;
	}

	// current player gives city card
	giveCityCard(player1, player2, cityCard){
		if (Object.is(player1, this.players[0])){
			if(player1.giveCityCard(player2, cityCard)){
				this.decrementAction();
				return true;
			}
		}
		return false;
	}

	// current player takes city card
	takeCityCard(player1, player2, cityCard){
		if (Object.is(player1, this.players[0])){
			if(player1.takeCityCard(player2, cityCard)){
				this.decrementAction();
				return true;
			}
		}
		return false;
	}

	// this.decrement action helper function
	decrementAction(){
		this.actionsLeft = this.actionsLeft - 1;
		if (this.actionsLeft == 0){
			endTurn();
		}
	}


	// called at the end of the turn
	endTurn(){
		// collect two player cards
		for (var i = 0; i < 2; i++){

			let card = this.playerDeck.pop();

			// if Epidemic Card pulled, push card into discard pile and do Epidemic Event Logic

			if (card instanceof EpidemicCard){
				this.epidemicDiscardPile.push(card);
				this.epidemic();
			} else {
				this.players[0].cards.push(card);
			}

		}

		// infection step
		for (var i = 0; i < this.infectionRates[this.epidemicDiscardPile.length]; i++){
			var infectedCity = this.infectionDeck.pop();
			this.infectionDiscardPile.push(infectedCity);
			infectedCity.city.addCubes(1, this);
			// set outbreak counters back to zero
			for (var j = 0; j < this.cities.length; j++){
				this.cities[j].outbreaked = false;
			}
		}

		// change player turn
		this.players.push(this.players.shift());
		this.actionsLeft = this.players[0].totalActions;

	}

	// epidemic sequence
	epidemic(){
		let epidemicInfectCard = this.infectionDeck.shift();
		epidemicInfectCard.city.addCubes(3, this);
		this.infectionDiscardPile.push(epidemicInfectCard);
		this.shuffle(this.infectionDiscardPile);
		this.infectionDeck = this.infectionDeck.concat(this.infectionDiscardPile);
		this.infectionDiscardPile = [];

		for (var j = 0; j < this.cities.length; j++){
			this.cities[j].outbreaked = false;
		}
	}

	// helper shuffle function
	shuffle(array) {

 		var currentIndex = array.length, temporaryValue, randomIndex;

  		while (0 !== currentIndex) {

    		randomIndex = Math.floor(Math.random() * currentIndex);
   			currentIndex -= 1;

    		temporaryValue = array[currentIndex];
    		array[currentIndex] = array[randomIndex];
    		array[randomIndex] = temporaryValue;
  		}

  		return array;
	}

}



class City {
	constructor(name, color, population, country, researchStation){
		this.name = name;
		this.color = color;
		this.population = population;
		this.country = country;
		this.researchStation = researchStation;
		this.infectionCubes = 0;
		this.adjacentCities = [];
		this.outbreaked = false;
	}

	addCubes(infectionCubes, board){

		// if City has outbreaked on this card pull, then it is exempt
		if(this.outbreaked){
			return false;
		}

		// this signifies that adding cubes to City causes outbreak
		if ((infectionCubes + this.infectionCubes) > 3){

			// calculates added cubes// calculates added cubes
			var addedCubes = 3 - this.infectionCubes;

			console.log("outbreak")
			// set max of 3 cubes on City
			this.infectionCubes = 3;

			board.outbreaks = board.outbreaks + 1;

			this.outbreaked = true;
			
			// infects adjacent Cities
			for (var i = 0; i < this.adjacentCities.length; i++){
				this.adjacentCities[i].addCubes(1, board);
			}
			
			board.diseaseCubes[this.color] = board.diseaseCubes[this.color] - addedCubes;
			return false;
		}

		this.infectionCubes = this.infectionCubes + infectionCubes;

		board.diseaseCubes[this.color] = board.diseaseCubes[this.color] - infectionCubes;

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
		this.totalActions = 4;
	}

	// move to adjacent city
	drive(city){

		if (this.city.adjacentCities.includes(city)){
			this.city = city;
			return true;
		}
		return false;
	}

	// use CityCard to fly to it
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

	// use CityCard of current city to fly anywhere
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

	// fly between research stations
	shuttleFlight(city){
		if (this.city.researchStation == true && city.researchStation == true){
			this.city = city;
			return true;
		}
		return false;
	}

	// build a research station by using CityCard
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

	// treat cubes from current city
	treat(){
		return this.city.removeCubes(1);
	}

	// give CityCard of current city to player on current city
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

	// take CityCard of current city from player on current city
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

	// cure disease
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

class Generalist extends Player {
	constructor(name, color){
		super(name, color);
		this.totalActions = 5;
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
const cities = require ('./cities.js');