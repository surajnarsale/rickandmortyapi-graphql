import Head from 'next/head';
import { gql } from '@apollo/client';
import client from '../apollo-client';
import Card from '../components/Card';

export default function Home({ characters }) {
	console.log(characters);
	return (
		<>
			<main className="bg-gray-100 h-full md:h-screen w-full">
				<section className="container mx-auto px-0 md:px-4 py-4">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-items-center gap-4">
						{characters.map((character) => {
							return (
								<Card
									title={character.name}
									likes={2}
									order={character.id}
									image={character.image}
								/>
							);
						})}
					</div>
				</section>
			</main>
		</>
	);
}

export async function getStaticProps() {
	const { data } = await client.query({
		query: gql`
			query {
				characters {
					results {
						id
						name
						image
						location {
							name
						}
					}
				}
			}
		`,
	});

	return {
		props: {
			characters: data.characters.results,
		},
	};
}

// export default function Home({ characters }) {
// 	console.log(characters);
// 	return (
// 		<>
// 			<div>
// 				{characters.map((character) => (
// 					<h1 key={character.name}>{character.name}</h1>
// 				))}
// 			</div>
// 			<Card
// 				title={`Rogue's Rise`}
// 				likes={Math.floor(Math.random() * (50 - 0) + 0)}
// 				order={2}
// 				image={'https://bit.ly/3BQdTqk'}
// 			/>
// 		</>
// 	);
// }
