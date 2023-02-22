import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Flex, Heading, IconButton, useColorMode } from "@chakra-ui/react";

function Navbar() {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Flex as={'nav'} alignItems="center" justifyContent="space-between" p={6}>
            <Heading color={'red.500'} size={'xl'} letterSpacing={'2px'} fontWeight={'400'}>Movie Search</Heading>
            <IconButton
                bg={''}
                borderRadius={'full'}
                onClick={toggleColorMode}
                color={'red.500'}
                icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
            />
        </Flex>
    )
}

export default Navbar;