import { Button, Flex, Input, InputGroup, InputLeftElement, useToast, Spinner } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

import { useEffect, useState } from 'react';
import Navbar from "./components/Navbar";
import MediaCard from './components/MediaCard';
import MediaGrid from './components/MediaGrid';

// const url = `https://api.themoviedb.org/3/search/movie?api_key=5dcf7f28a88be0edc01bbbde06f024ab&language=en-US&query=${query}&page=1&include_adult=false`;

function App() {
	const toast = useToast();
	const [trending, setTrending] = useState(null);
	const [favIds, setFavIds] = useState([]);
	const [favorites, setFavorites] = useState([]);
	const [searchVal, setSearchVal] = useState('');
	const [searchResults, setSearchResults] = useState([]);

	useEffect(() => {
		fetch('https://api.themoviedb.org/3/trending/all/day?api_key=5dcf7f28a88be0edc01bbbde06f024ab')
			.then(res => res.json())
			.then(data => {
				setTrending(data.results);
			})
	}, [])

	function displayToast(title, description) {
		toast({
			title: title,
			description: description,
			status: 'success',
			duration: 2000,
			isClosable: true,
		})
	}

	function addToFavs(data) {
		setFavIds([data.id, ...favIds]);
		setFavorites([data, ...favorites]);
		displayToast('Added to favorites', data.title || data.name);
	}

	function removeFromFavs(data) {
		setFavIds(favIds.filter(item => item !== data.id));
		setFavorites(favorites.filter(item => item.id !== data.id));
		displayToast('Removed from favorites', data.title || data.name);
	}

	function handleChange(event) {
		setSearchVal(event.target.value);
	}

	function getMediaCard(item) {
		return (
			<MediaCard
				key={item.id} media={item}
				add={addToFavs} remove={removeFromFavs}
				isFav={favIds.indexOf(item.id) > -1}
			/>
		);
	}

	function searchMovies() {
		fetch(`https://api.themoviedb.org/3/search/multi?api_key=5dcf7f28a88be0edc01bbbde06f024ab&query=${searchVal}`)
			.then(res => res.json())
			.then(data => {
				setSearchResults(data.results.filter(item => item.media_type !== 'person'));
				setSearchVal('');
			})
	}

	return (
		<>
			<Navbar />
			<Tabs isFitted isLazy colorScheme={'red'} color={'red.500'}>
				<TabList>
					<Tab>Trending</Tab>
					<Tab isDisabled={favIds.length === 0}>Favorites</Tab>
					<Tab>Search</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						{trending === null ? <Spinner color='red.500' position={'absolute'} top={'50%'} left={'50%'} size={'lg'} />
							: <MediaGrid>{trending.map(item => getMediaCard(item))}</MediaGrid>
						}
					</TabPanel>

					<TabPanel>
						<MediaGrid>{favorites.map(item => getMediaCard(item))}</MediaGrid>
					</TabPanel>

					<TabPanel>
						<Flex mx={'auto'} mt={4} gap={4} w={'min(720px, 90%)'}>
							<InputGroup colorScheme={'red'}>
								<InputLeftElement pointerEvents="none" height={'full'} children={<SearchIcon />} />
								<Input size={'lg'} value={searchVal} onChange={handleChange} placeholder={'Search for Movies and TV shows'} />
							</InputGroup>
							<Button onClick={searchMovies} size={'lg'}>Search</Button>
						</Flex>

						<MediaGrid>{searchResults.map(item => getMediaCard(item))}</MediaGrid>
					</TabPanel>
				</TabPanels>
			</Tabs>

		</>
	);
}

export default App;
