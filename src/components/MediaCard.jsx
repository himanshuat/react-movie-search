import { Card, Flex, GridItem, Heading, Image, IconButton, Stack, Text } from "@chakra-ui/react";
import { Modal, useDisclosure } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

import Rating from "./Rating";
import MediaModel from "./MediaModel";

const imgBaseUrl = 'https://image.tmdb.org/t/p/w500';

function MediaCard(props) {
    const { media, add, remove, isFav } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <GridItem>
            <Card p={3} height={'100%'}>
                <Image
                    display={{ base: 'none', md: 'inline-block' }}
                    src={imgBaseUrl + media.poster_path}
                    alt={media.title}
                    borderRadius='lg'
                    fallbackSrc={`https://via.placeholder.com/500X750?text=${media.title || media.name}`}
                />
                <Image
                    display={{ base: 'inline-block', md: 'none' }}
                    src={imgBaseUrl + media.backdrop_path}
                    alt={media.title}
                    borderRadius='lg'
                    fallbackSrc={`https://via.placeholder.com/500X281?text=${media.title || media.name}`}
                />
                <Rating rating={media.vote_average * 10} size={'35px'} />
                <Stack mt='3' spacing='2'>
                    <Heading fontWeight={'500'} letterSpacing={'1px'} onClick={onOpen} cursor={'pointer'} size='sm' noOfLines={1}>{media.title || media.name}</Heading>
                    <Flex justifyContent={'space-between'} color={'gray.500'} fontSize={'xs'}>
                        <Text fontWeight={'600'}>
                            {(media.release_date && media.release_date.substring(0, 4)) || (media.first_air_date && media.first_air_date.substring(0, 4))}
                        </Text>
                        <IconButton
                            onClick={isFav ? () => remove(media) : () => add(media)}
                            size={'xs'}
                            icon={isFav ? <StarIcon color={'yellow.300'} /> : <StarIcon />}
                        />
                    </Flex>
                </Stack>
            </Card>

            <Modal isOpen={isOpen} size={'full'} motionPreset='slideInBottom' onClose={onClose}>
                <MediaModel isFav={isFav} media={media} add={add} remove={remove} />
            </Modal>
        </GridItem>
    )
}

export default MediaCard;