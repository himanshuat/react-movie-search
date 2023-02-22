import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

function Rating(props) {
    const rating = parseInt(props.rating);

    const ratingStyles = {
        position: 'absolute', 
        left: '1rem', 
        top: '1rem', 
        p: .5,
        borderRadius: 'full', 
        bg: 'blackAlpha.700'
    }
    
    return (
        <CircularProgress filter={'brightness(1.15)'} color={getColor(rating)} value={rating} size={props.size} sx={ratingStyles}>
            <CircularProgressLabel color={'whiteAlpha.700'}>{rating + '%'}</CircularProgressLabel>
        </CircularProgress>
    );
}

function getColor(value) {
    if (value >= 70) {
        return 'green.600';
    }
    else if (value >= 50) {
        return 'orange.300';
    }
    else {
        return 'red.600';
    }
}

export default Rating;