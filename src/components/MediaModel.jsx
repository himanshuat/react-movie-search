import { ModalOverlay, ModalContent, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { Button, Flex, Image, Text, Heading, useColorMode, Spinner } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

import { useEffect, useState } from 'react';
import Rating from './Rating';

const imgBaseUrl = 'https://image.tmdb.org/t/p/w500';

function MediaModel(props) {
    const { colorMode } = useColorMode();
    const { isFav, add, remove, media: mediaProp } = props;
    const [media, setMedia] = useState(null);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/${mediaProp.media_type}/${mediaProp.id}?api_key=5dcf7f28a88be0edc01bbbde06f024ab`)
            .then(res => res.json())
            .then(data => {
                setMedia(data);
            })
    }, [])

    return (
        <>
            <ModalOverlay />
            <ModalContent
                p={4}
                bg={colorMode === 'light' ? 'whiteAlpha.900' : 'blackAlpha.900'}
            >
                <ModalCloseButton />
                {media === null ?
                    <Spinner color='red.500' position={'absolute'} top={'50%'} left={'50%'} size={'lg'} />
                    : <ModalBody>
                        <Flex position={'relative'} gap={6} flexDirection={{ base: 'column', lg: 'row' }}>
                            <Image
                                display={{ base: 'none', lg: 'inline-block' }}
                                src={imgBaseUrl + media.poster_path}
                                alt={media.title}
                                borderRadius='lg'
                                fallbackSrc={`https://via.placeholder.com/500X750?text=${media.title || media.name}`}
                            />
                            <Image
                                display={{ base: 'inline-block', lg: 'none' }}
                                src={imgBaseUrl + media.backdrop_path}
                                alt={media.title}
                                borderRadius='lg'
                                fallbackSrc={`https://via.placeholder.com/500X281?text=${media.title || media.name}`}
                            />
                            <Flex flexDirection={'column'} gap={4} p={4}>
                                <Rating rating={media.vote_average * 10} size={'50px'} />
                                <Heading as={'h1'} size={'xl'}>{media.title || media.name}</Heading>
                                <Flex color={'gray.500'} alignItems={'center'} wrap={'wrap'} gap={2}>
                                    <Text as={'p'} border={'2px solid'} fontSize={'xs'} px={1} py={0} borderRadius={'full'}>{media.adult ? 'A' : 'U'}</Text>
                                    <Text as={'p'}>{media.genres.map(item => item.name).sort().join(' / ')}</Text>
                                    <Text as={'p'}>{media.runtime && `${parseInt(media.runtime / 60)}h ${media.runtime % 60}m`}</Text>
                                </Flex>
                                <Button
                                    colorScheme={'red'}
                                    variant={'outline'}
                                    letterSpacing={'1px'}
                                    onClick={isFav ? () => remove(mediaProp) : () => add(mediaProp)}
                                    size={'xs'} p={6}
                                    alignSelf={'start'}
                                >
                                    {isFav ? <StarIcon color={'yellow.300'} /> : <StarIcon />}
                                    <Text as={'span'} ml={3}>{isFav ? 'Remove from favorites' : 'Add to favorites'}</Text>
                                </Button>
                                <Text as={'p'}><b>Overview: </b>{media.overview}</Text>
                                <Heading as={'h2'} color={'gray.500'} size={'md'}>"{media.tagline}"</Heading>
                                <Text as={'p'}>
                                    <b>{media.release_date ? 'Release Date: ' : 'First Aired: '}</b>
                                    {(media.release_date && media.release_date.split('-').reverse().join('/')) || (media.first_air_date && media.first_air_date.split('-').reverse().join('/'))}
                                </Text>
                                <p><b>Budget: </b>{media.budget <= 0 ? 'Not available' : media.budget}</p>
                                <p><b>Revenue: </b>{media.revenue <= 0 ? 'Not available' : media.revenue}</p>
                                <p><b>Languages: </b>{media.spoken_languages.map(item => item.name).join(' / ')}</p>
                            </Flex>
                        </Flex>
                    </ModalBody>}
            </ModalContent>
        </>
    );
}

export default MediaModel;