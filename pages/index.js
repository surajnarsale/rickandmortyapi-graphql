import Head from 'next/head';
import { gql } from '@apollo/client';
import client from '../apollo-client';

export default function Home({ characters }) {
	console.log(characters);
	return (
		<div>
			{characters.map((character) => (
				<h1 key={character.name}>{character.name}</h1>
			))}
		</div>
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
					}
				}
			}
		`,
	});

	return {
		props: {
			characters: data.characters.results.slice(0, 4),
		},
	};
}
