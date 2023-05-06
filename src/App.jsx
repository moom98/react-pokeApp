import { useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon, getPokemon } from "./utils/Pokemon";
import PokemonCard from "./components/card/PokemonCard";
import Navbar from "./components/Navbar/Navbar";

function App() {
	const initialURL = "https://pokeapi.co/api/v2/pokemon/";

	const [loading, setLoading] = useState(true); // ローディング状態
	const [pokemonData, setPokemonData] = useState([]); // ポケモンの詳細情報
	const [nextUrl, setNextUrl] = useState(""); // 次のページのURL
	const [prevUrl, setPrevUrl] = useState(""); // 前のページのURL

	useEffect(() => {
		const fetchPokemonData = async () => {
			// すべてのポケモンデータを取得
			let res = await getAllPokemon(initialURL);
			// 各ポケモンの詳細情報を取得
			loadPokemon(res.results);

			// next/prevのURLを設定
			setNextUrl(res.next);
			setPrevUrl(res.previous);

			// すべてのポケモンデータを取得したらloadingを終了する
			setLoading(false);
		};
		fetchPokemonData();
	}, []);

	// すべてのポケモンの詳細情報を取得
	const loadPokemon = async (res) => {
		let _pokemonData = await Promise.all(
			// Promise.all()はPromiseオブジェクトを要素とする配列を受け取り、
			// その配列のすべてのPromiseが解決されるのを待ってから新しいPromiseを返す

			// res.resultsの各要素(pokemon)に対して、getAllPokemon()を実行し_pokemonDataに格納
			res.map(async (pokemon) => {
				let pokemonRecord = await getPokemon(pokemon.url);
				return pokemonRecord;
			})
		);
		setPokemonData(_pokemonData);
	};

	// 次のページのURLがあれば、そのURLからポケモンデータを取得
	const handleNextPage = async () => {
		setLoading(true);
		if (nextUrl) {
			let data = await getAllPokemon(nextUrl);
			await loadPokemon(data.results);

			//nextURL/prevURLを更新する
			setNextUrl(data.next);
			setPrevUrl(data.previous);

			setLoading(false);
		}
	};

	// 前のページのURLがあれば、そのURLからポケモンデータを取得
	const handlePrevPage = async () => {
		setLoading(true);
		if (prevUrl) {
			let data = await getAllPokemon(prevUrl);
			await loadPokemon(data.results);

			setNextUrl(data.next);
			setPrevUrl(data.previous);

			setLoading(false);
		}
	};

	return (
		<>
			<Navbar />
			<div className="App">
				{loading ? (
					<h1>Loading...</h1>
				) : (
					<>
						<div className="pokemonCardContainer">
							{pokemonData.map((pokemon, i) => {
								return <PokemonCard key={i} pokemon={pokemon} />;
							})}
						</div>
						<div className="buttonWrap">
							<button className="button" onClick={handlePrevPage}>
								Prev
							</button>
							<button className="button" onClick={handleNextPage}>
								Next
							</button>
						</div>
					</>
				)}
			</div>
		</>
	);
}

export default App;
