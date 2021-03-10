const {City, InfectionCard, PlayerCard, CityCard} = require('./class.js');

exports.addCities = function(board){
	let Atlanta, Montreal, StPetersburg, Chicago, NewYork, London, SanFrancisco, Washington, Madrid, Paris, Milan, Essen, Riyadh;
	let Karachi, Moscow, Istanbul, Cairo, Baghdad, Kolkata, Chennai, Algiers, Delhi, Tehran, Mumbai;
	let Beijing, Sydney, Osaka, Seoul, HongKong, Jakarta, Shanghai, Bangkok, Tokyo, Taipei, HoChiMinhCity, Manila;
	let BuenosAires, Kinshasa, Lagos, SaoPaulo, LosAngeles, Miami, MexicoCity, Johannesburg, Bogota, Lima, Santiago, Khartoum;

	// Constructing Blue Cities

	Atlanta = new City("Atlanta", "blue",4715000, "United States", true,[Chicago,Washington,Miami]);
	Montreal = new City("Montréal", "blue", 3429000, "Canada", false,[Chicago,NewYork,Washington]);
	StPetersburg = new City("St. Petersburg", "blue", 4879000, "Russia", false, [Essen,Istanbul,Moscow]);
	Chicago = new City("Chicago", "blue", 9121000, "United States", false,[SanFrancisco,LosAngeles,MexicoCity,Atlanta,Montreal]);
	NewYork = new City("New York", "blue", 20464000, "United States", false,[Montreal,Washington,London,Madrid]);
	London = new City("London", "blue", 8586000, "United Kingdom", false,[NewYork,Madrid,Paris,Essen]);
	SanFrancisco = new City("San Francisco", "blue", 5864000, "United States", false,[Tokyo, Manila, LosAngeles,Chicago]);
	Washington = new City("Washington", "blue", 4679000, "United States", false,[Atlanta,Miami,NewYork,Montreal]);
	Madrid = new City("Madrid", "blue", 5427000, "Spain", false,[NewYork,London,Algiers,SaoPaulo,Paris]);
	Paris = new City("Paris", "blue", 10755000, "France", false,[London,Essen,Milan,Algiers,Madrid]);
	Milan = new City("Milan", "blue", 5232000, "Italy", false,[Essen,Paris,Istanbul]);
	Essen = new City("Essen", "blue", 575000, "Germany", false,[London,Paris,Milan,StPetersburg]);


	// Constructing Black Cities

	Karachi = new City("Karachi", "black", 20711000, "Pakistan", false, [Tehran,Delhi,Mumbai,Riyadh,Baghdad]);
	Moscow = new City("Moscow", "black", 15512000, "Russia", false,[StPetersburg,Istanbul,Tehran]);
	Istanbul = new City("Istanbul", "black", 13576000, "Turkey", false,[StPetersburg,Moscow,Baghdad,Cairo,Milan,Algiers]);
	Cairo = new City("Cairo", "black", 14718000, "Egypt", false,[Algiers,Istanbul,Baghdad,Riyadh,Khartoum]);
	Baghdad = new City("Baghdad", "black", 6204000, "Iraq", false,[Istanbul,Tehran,Karachi,Riyadh,Cairo]);
	Kolkata = new City("Kolkata", "black", 14374000, "India", false,[Delhi,HongKong,Bangkok,Chennai]);
	Chennai = new City("Chennai", "black", 8865000, "India", false,[Mumbai,Delhi,Kolkata,Bangkok,Jakarta]);
	Algiers = new City("Algiers", "black",2946000, "Algeria", false,[Madrid,Paris,Istanbul,Cairo]);
	Delhi = new City("Delhi", "black", 22242000, "India", false,[Tehran,Karachi,Mumbai,Chennai,Kolkata]);
	Tehran = new City("Tehran", "black", 7419000, "Iran", false,[Moscow,Baghdad,Karachi,Delhi]);
	Mumbai = new City("Mumbai", "black", 16910000, "India", false,[Karachi,Delhi,Chennai]);
	Riyadh = new City("Riyadh", "black", 5037000, "Saudi Arabia", false, [Cairo,Baghdad,Karachi]);

	// Constructing Red Cities

	Beijing = new City("Beijing", "red", 17311000, "People's Republic of China", false,[Seoul,Shanghai]);
	Sydney = new City("Sydney", "red", 3785000, "Australia", false,[Jakarta,Manila,LosAngeles]);
	Osaka = new City("Osaka", "red", 2871000, "Japan", false,[Tokyo,Taipei]);
	Seoul = new City("Seoul", "red", 22547000, "South Korea", false,[Beijing,Shanghai,Tokyo]);
	HongKong = new City("Hong Kong", "red", 7106000, "People's Republic of China", false,[Shanghai,Taipei,Manila,HoChiMinhCity,Bangkok,Kolkata]);
	Jakarta = new City("Jakarta", "red", 26063000, "Indonesia", false,[Chennai,Bangkok,HoChiMinhCity,Sydney]);
	Shanghai = new City("Shanghai", "red", 13482000, "People's Republic of China", false,[Beijing,Seoul,Tokyo,Taipei,HongKong]);
	Bangkok = new City("Bangkok", "red", 7151000, "Thailand", false,[Kolkata,HongKong,HoChiMinhCity,Jakarta,Chennai]);
	Tokyo = new City("Tokyo", "red", 13189000, "Japan", false,[Seoul,SanFrancisco,Osaka,Shanghai]);
	Taipei = new City("Taipei", "red", 8338000, "Taiwan", false,[Shanghai,Osaka,Manila,HongKong]);
	HoChiMinhCity = new City("Ho Chi Minh City", "red", 8314000, "Vietnam", false,[Bangkok,HongKong,Manila,Jakarta]);
	Manila = new City("Manila", "red", 20767000, "Philippines", false,[Taipei,SanFrancisco,Sydney,HoChiMinhCity]);

	// Constructing Yellow Cities

	BuenosAires = new City("Buenos Aires", "yellow", 13639000, "Argentina", false,[Bogota,SaoPaulo]);
	Kinshasa = new City("Kinshasa", "yellow", 9046000, "Democratic Republic of the Congo", false,[Lagos,Khartoum,Johannesburg]);
	Lagos = new City("Lagos", "yellow", 11547000, "Nigeria", false,[SaoPaulo,Kinshasa,Khartoum]);
	SaoPaulo = new City("São Paulo", "yellow", 20186000, "Brazil", false,[Bogota,BuenosAires,Madrid,Lagos]);
	LosAngeles = new City("Los Angeles", "yellow", 14900000, "United States", false,[SanFrancisco,Sydney,MexicoCity,Chicago]);
	Miami = new City("Miami", "yellow", 5582000, "United States", false,[Atlanta,Washington,Bogota,MexicoCity]);
	MexicoCity = new City("MexicoCity", "yellow", 19463000, "Mexico", false,[LosAngeles,Chicago,Miami,Bogota,Lima]);
	Johannesburg = new City("Johannesburg", "yellow", 3888000, "South Africa", false,[Kinshasa,Khartoum]);
	Bogota = new City("Bogotá", "yellow", 8702000, "Colombia", false,[MexicoCity,Miami,SaoPaulo,BuenosAires,Lima]);
	Lima = new City("Lima", "yellow", 9121000, "Peru", false,[MexicoCity,Bogota,Santiago]);
	Santiago = new City("Santiago", "yellow", 6015000, "Chile", false,[Lima]);
	Khartoum = new City("Khartoum", "yellow", 4887000, "Sudan", false,[Cairo,Johannesburg,Kinshasa,Lagos]);

	// Constructing Blue City Cards

	let AtlantaCityCard = new CityCard(Atlanta);
	let MontrealCityCard = new CityCard(Montreal);
	let StPetersburgCityCard = new CityCard(StPetersburg);
	let ChicagoCityCard = new CityCard(Chicago);
	let NewYorkCityCard = new CityCard(NewYork);
	let LondonCityCard = new CityCard(London);
	let SanFranciscoCityCard = new CityCard(SanFrancisco);
	let WashingtonCityCard = new CityCard(Washington);
	let MadridCityCard = new CityCard(Madrid);
	let ParisCityCard = new CityCard(Paris);
	let MilanCityCard = new CityCard(Milan);
	let EssenCityCard = new CityCard(Essen);

	// Constructing Black City Cards

	let KarachiCityCard = new CityCard(Karachi);
	let MoscowCityCard = new CityCard(Moscow);
	let IstanbulCityCard = new CityCard(Istanbul);
	let CairoCityCard = new CityCard(Cairo);
	let BaghdadCityCard = new CityCard(Baghdad);
	let KolkataCityCard = new CityCard(Kolkata);
	let ChennaiCityCard = new CityCard(Chennai);
	let AlgiersCityCard = new CityCard(Algiers);
	let DelhiCityCard = new CityCard(Delhi);
	let TehranCityCard = new CityCard(Tehran);
	let MumbaiCityCard = new CityCard(Mumbai);
	let RiyadhCityCard = new CityCard(Riyadh);

	// Constructing Red City Cards

	let BeijingCityCard = new CityCard(Beijing);
	let SydneyCityCard = new CityCard(Sydney);
	let OsakaCityCard = new CityCard(Osaka);
	let SeoulCityCard = new CityCard(Seoul);
	let HongKongCityCard = new CityCard(HongKong);
	let JakartaCityCard = new CityCard(Jakarta);
	let ShanghaiCityCard = new CityCard(Shanghai);
	let BangkokCityCard = new CityCard(Bangkok);
	let TokyoCityCard = new CityCard(Tokyo);
	let TaipeiCityCard = new CityCard(Taipei);
	let HoChiMinhCityCityCard = new CityCard(HoChiMinhCity);
	let ManilaCityCard = new CityCard(Manila);

	// Constructing Yellow City Cards

	let BuenosAiresCityCard = new CityCard(BuenosAires);
	let KinshasaCityCard = new CityCard(Kinshasa);
	let LagosCityCard = new CityCard(Lagos);
	let SaoPauloCityCard = new CityCard(SaoPaulo);
	let LosAngelesCityCard = new CityCard(LosAngeles);
	let MiamiCityCard = new CityCard(Miami);
	let MexicoCityCityCard = new CityCard(MexicoCity);
	let JohannesburgCityCard = new CityCard(Johannesburg);
	let BogotaCityCard = new CityCard(Bogota);
	let LimaCityCard = new CityCard(Lima);
	let SantiagoCityCard = new CityCard(Santiago);
	let KhartoumCityCard = new CityCard(Khartoum);

	// Constructing Blue Infection Cards

	let AtlantaInfectionCard = new InfectionCard(Atlanta);
	let MontrealInfectionCard = new InfectionCard(Montreal);
	let StPetersburgInfectionCard = new InfectionCard(StPetersburg);
	let ChicagoInfectionCard = new InfectionCard(Chicago);
	let NewYorkInfectionCard = new InfectionCard(NewYork);
	let LondonInfectionCard = new InfectionCard(London);
	let SanFranciscoInfectionCard = new InfectionCard(SanFrancisco);
	let WashingtonInfectionCard = new InfectionCard(Washington);
	let MadridInfectionCard = new InfectionCard(Madrid);
	let ParisInfectionCard = new InfectionCard(Paris);
	let MilanInfectionCard = new InfectionCard(Milan);
	let EssenInfectionCard = new InfectionCard(Essen);

	// Constructing Black City Cards

	let KarachiInfectionCard = new InfectionCard(Karachi);
	let MoscowInfectionCard = new InfectionCard(Moscow);
	let IstanbulInfectionCard = new InfectionCard(Istanbul);
	let CairoInfectionCard = new InfectionCard(Cairo);
	let BaghdadInfectionCard = new InfectionCard(Baghdad);
	let KolkataInfectionCard = new InfectionCard(Kolkata);
	let ChennaiInfectionCard = new InfectionCard(Chennai);
	let AlgiersInfectionCard = new InfectionCard(Algiers);
	let DelhiInfectionCard = new InfectionCard(Delhi);
	let TehranInfectionCard = new InfectionCard(Tehran);
	let MumbaiInfectionCard = new InfectionCard(Mumbai);
	let RiyadhInfectionCard = new InfectionCard(Riyadh);

	// Constructing Red City Cards

	let BeijingInfectionCard = new InfectionCard(Beijing);
	let SydneyInfectionCard = new InfectionCard(Sydney);
	let OsakaInfectionCard = new InfectionCard(Osaka);
	let SeoulInfectionCard = new InfectionCard(Seoul);
	let HongKongInfectionCard = new InfectionCard(HongKong);
	let JakartaInfectionCard = new InfectionCard(Jakarta);
	let ShanghaiInfectionCard = new InfectionCard(Shanghai);
	let BangkokInfectionCard = new InfectionCard(Bangkok);
	let TokyoInfectionCard = new InfectionCard(Tokyo);
	let TaipeiInfectionCard = new InfectionCard(Taipei);
	let HoChiMinhCityInfectionCard = new InfectionCard(HoChiMinhCity);
	let ManilaInfectionCard = new InfectionCard(Manila);

	// Constructing Yellow City Cards

	let BuenosAiresInfectionCard = new InfectionCard(BuenosAires);
	let KinshasaInfectionCard = new InfectionCard(Kinshasa);
	let LagosInfectionCard = new InfectionCard(Lagos);
	let SaoPauloInfectionCard = new InfectionCard(SaoPaulo);
	let LosAngelesInfectionCard = new InfectionCard(LosAngeles);
	let MiamiInfectionCard = new InfectionCard(Miami);
	let MexicoCityInfectionCard = new InfectionCard(MexicoCity);
	let JohannesburgInfectionCard = new InfectionCard(Johannesburg);
	let BogotaInfectionCard = new InfectionCard(Bogota);
	let LimaInfectionCard = new InfectionCard(Lima);
	let SantiagoInfectionCard = new InfectionCard(Santiago);
	let KhartoumInfectionCard = new InfectionCard(Khartoum);


	let cities = [Atlanta, Montreal, StPetersburg, Chicago, NewYork, London, SanFrancisco, Washington, Madrid, Paris, Milan, Essen, Riyadh];
	cities = cities.concat([Karachi, Moscow, Istanbul, Cairo, Baghdad, Kolkata, Chennai, Algiers, Delhi, Tehran, Mumbai]);
	cities = cities.concat([Beijing, Sydney, Osaka, Seoul, HongKong, Jakarta, Shanghai, Bangkok, Tokyo, Taipei, HoChiMinhCity, Manila]);
	cities = cities.concat([BuenosAires, Kinshasa, Lagos, SaoPaulo, LosAngeles, Miami, MexicoCity, Johannesburg, Bogota, Lima, Santiago, Khartoum]);

	let cityCards = [AtlantaCityCard, MontrealCityCard, StPetersburgCityCard, ChicagoCityCard, NewYorkCityCard, LondonCityCard, SanFranciscoCityCard, WashingtonCityCard, MadridCityCard, ParisCityCard, MilanCityCard, EssenCityCard, RiyadhCityCard];
	cityCards = cityCards.concat([KarachiCityCard, MoscowCityCard, IstanbulCityCard, CairoCityCard, BaghdadCityCard, KolkataCityCard, ChennaiCityCard, AlgiersCityCard, DelhiCityCard, TehranCityCard, MumbaiCityCard]);
	cityCards = cityCards.concat([BeijingCityCard, SydneyCityCard, OsakaCityCard, SeoulCityCard, HongKongCityCard, JakartaCityCard, ShanghaiCityCard, BangkokCityCard, TokyoCityCard, TaipeiCityCard, HoChiMinhCityCityCard, ManilaCityCard]);
	cityCards = cityCards.concat([BuenosAiresCityCard, KinshasaCityCard, LagosCityCard, SaoPauloCityCard, LosAngelesCityCard, MiamiCityCard, MexicoCityCityCard, JohannesburgCityCard, BogotaCityCard, LimaCityCard, SantiagoCityCard, KhartoumCityCard]);


	let infectionCards = [AtlantaInfectionCard, MontrealInfectionCard, StPetersburgInfectionCard, ChicagoInfectionCard, NewYorkInfectionCard, LondonInfectionCard, SanFranciscoInfectionCard, WashingtonInfectionCard, MadridInfectionCard, ParisInfectionCard, MilanInfectionCard, EssenInfectionCard, RiyadhInfectionCard];
	infectionCards = infectionCards.concat([KarachiInfectionCard, MoscowInfectionCard, IstanbulInfectionCard, CairoInfectionCard, BaghdadInfectionCard, KolkataInfectionCard, ChennaiInfectionCard, AlgiersInfectionCard, DelhiInfectionCard, TehranInfectionCard, MumbaiInfectionCard]);
	infectionCards = infectionCards.concat([BeijingInfectionCard, SydneyInfectionCard, OsakaInfectionCard, SeoulInfectionCard, HongKongInfectionCard, JakartaInfectionCard, ShanghaiInfectionCard, BangkokInfectionCard, TokyoInfectionCard, TaipeiInfectionCard, HoChiMinhCityInfectionCard, ManilaInfectionCard]);
	infectionCards = infectionCards.concat([BuenosAiresInfectionCard, KinshasaInfectionCard, LagosInfectionCard, SaoPauloInfectionCard, LosAngelesInfectionCard, MiamiInfectionCard, MexicoCityInfectionCard, JohannesburgInfectionCard, BogotaInfectionCard, LimaInfectionCard, SantiagoInfectionCard, KhartoumInfectionCard]);

	board.cities = board.cities.concat(cities);
	board.playerDeck = board.playerDeck.concat(cityCards);
	board.infectionDeck = board.infectionDeck.concat(infectionCards);
}