// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react'

// 2. Add your color mode config
const config = {
	initialColorMode: 'dark',
	useSystemColorMode: false,
}

const fonts = {
	body: `'Heebo', sans-serif`,
	heading: `'Righteous', cursive`
}

// 3. extend the theme
const theme = extendTheme({ config, fonts })

export default theme;