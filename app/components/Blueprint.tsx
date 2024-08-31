import {
    Flex, Container, HStack, VStack, Box,
    Button, Text, Heading, Input, Divider, Select,
    useColorModeValue, useColorMode,
    Tr, Th, Table, Thead, Tbody, Td,
    InputGroup, InputRightElement, InputLeftAddon
} from "@chakra-ui/react";
import { ArrowRightIcon, AtSignIcon, CheckIcon, ChevronRightIcon, LinkIcon, MoonIcon, RepeatIcon, SunIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";

import '../assets/blueprint.sass'
import { socials } from "../variables";
import { getAllCities, getCitiesWithinRadius } from "./routes";
import type { City, Play } from '../types'

interface Props {
    color: string;
    city: City;
    progress: Play;
    updateCity: Function;
    updateName: Function;
}

const Blueprint = (props: Props) => {

    const [player, setPlayer] = useState('');
    const [nameInput, setNameInput] = useState('');

    const [cities, setCities] = useState({});
    const [pickCity, setPickCity] = useState<string>('');
    const [pickCountry, setPickCountry] = useState<string>('');

    const [gameCity, setGameCity] = useState<City>();
    const [closeCities, setCloseCities] = useState([]);

    const handleCountryChange = (e) => {
        setPickCountry(e.target.value);
        setPickCity('');
    };

    const handleCityChange = (e) => {
        setPickCity(e.target.value);
        const cityObject = cities[pickCountry].find(city => city.name === e.target.value);
        setGameCity(cityObject || null);
        props.updateCity(cityObject || null);
    };

    const shuffleGameCity = () => {
        const allCountries = Object.keys(cities);
        const shufflecountry = allCountries[Math.floor(Math.random() * allCountries.length)];
        const shufflecity = cities[shufflecountry][Math.floor(Math.random() * cities[shufflecountry].length)];
        setPickCountry(shufflecountry)
        setPickCity(shufflecity.name)
        setGameCity(shufflecity)
        props.updateCity(shufflecity)
    }

    const mapCity = (country: string, city: string) => {
        const cityObject = cities[country].find(ccity => ccity.name === city);
        setPickCountry(country)
        setPickCity(city)
        setGameCity(cityObject)
        props.updateCity(cityObject)
    }

    const { colorMode, toggleColorMode } = useColorMode();

    useEffect(() => {
        const fetchCities = async () => {
            const allCities = await getAllCities();
            setCities(allCities);
        };
        fetchCities();
    }, []);

    useEffect(() => {
        props.updateName(player)
    }, [player]);

    useEffect(() => {
        if (props.city.name == '' && props.city.lat != 0 && props.city.lng != 0) {
            const fetchCities = async () => {
                const nearbyCities = await getCitiesWithinRadius(props.city.lat, props.city.lng, 1000);
                setCloseCities(nearbyCities);
            };
            fetchCities();
        }
    }, [props.city])

    const getLink = (key: string) => {
        window.open(socials[key], "_blank", "noreferrer,noopener");
    }

    const startGame = () => {

    }

    return (
        <>
            <Box
                w={{ base: "100vw", md: "30vw" }}
                h={'100vh'}
                p={2}
                bg={useColorModeValue("gray.100", "gray.900")}
            >
                <Box>
                    <VStack>
                        <Container h={'10vh'} p={1} mb={2}>
                            <HStack gap={'0.2rm'} paddingBottom={1}>
                                <Heading as='h3' size='md' letterSpacing={1} color={props.color}>LLM Amazing Race</Heading>
                            </HStack>
                            <Text py={2}>Embark on a city text adventure.</Text>
                        </Container>
                        <Divider />
                        <Container h={'72vh'} p={2}>
                            <HStack spacing={3} align="stretch" mb={4}>
                                <InputGroup size={'sm'}>
                                    <InputLeftAddon>Name:</InputLeftAddon>
                                    <Input
                                        placeholder={'Carmen Sandiago'}
                                        value={nameInput}
                                        onChange={(e) => setNameInput(e.target.value)}
                                        onKeyDown={(e) => (e.key === 'Enter' ? setPlayer(nameInput) : null)}
                                    />
                                    {player != nameInput &&
                                        <InputRightElement>
                                            <Button h='1.75rem' size='sm' leftIcon={<CheckIcon color='green.500' />}
                                                onClick={() => setPlayer(nameInput)}>
                                            </Button>
                                        </InputRightElement>
                                    }
                                </InputGroup>
                            </HStack>
                            <VStack spacing={2} mb={4} justifyContent={'center'} >
                                <Flex justifyContent="space-between" alignItems="center">
                                    <Text color={colorMode} mr={2}>Pick your destination </Text>
                                    <Button size={'sm'} leftIcon={<RepeatIcon />} onClick={shuffleGameCity}>
                                        Shuffle
                                    </Button>
                                </Flex>
                                <Select size={'sm'} placeholder={'Select Country'} value={pickCountry} onChange={handleCountryChange}>
                                    {Object.keys(cities).map(country => (
                                        <option key={country} value={country}>{country}</option>
                                    ))}
                                </Select>

                                <Select size={'sm'} placeholder={'Select City'} value={pickCity} onChange={handleCityChange} isDisabled={!pickCountry}>
                                    {pickCountry && cities[pickCountry].map(city => (
                                        <option key={city.id} value={city.name}>{city.name}</option>
                                    ))}
                                </Select>
                            </VStack>
                            <VStack>
                                <HStack>
                                    <Text align='left'>Explore Nearby Cities on the Map</Text>
                                    <ChevronRightIcon />
                                </HStack>
                                {closeCities &&
                                    (
                                        <Flex
                                            wrap="wrap"
                                        >

                                            {closeCities.slice(0, 10).map((ccity) => (
                                                <Button variant={'ghost'} size={'xs'} key={ccity.id}
                                                    colorScheme="teal" m={1} onClick={() => mapCity(ccity.country, ccity.name)}>
                                                    {ccity.name}
                                                </Button>
                                            ))}
                                        </Flex>
                                    )
                                }

                            </VStack>

                            {player != '' && gameCity.name != '' && 
                                (
                                    <VStack pt={2}>
                                    <Flex justifyContent="space-between" alignItems="center">
                                        <Text mr={2}>The world is waiting </Text>
                                        <Button size={'sm'} bgColor='teal' onClick={startGame} rightIcon={<ArrowRightIcon />}>Let's Go</Button>
                                    </Flex>
                                    </VStack>
                                )
                            }

                            {player != '' && props.progress.progress.length > 0 && (
                                <Table variant="simple" mt={4} size={'sm'}>
                                    <Thead>
                                        <Tr>
                                            <Th></Th>
                                            <Th>Level</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {props.progress.progress.map((stop, index) => (
                                            <Tr key={index}>
                                                <Td>{stop.level}</Td>
                                                <Td>{stop.task.name}</Td>
                                                <Td>{stop.task.attempts}</Td>
                                                <Td>{stop.task.time}</Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            )}
                        </Container>
                        <Divider />
                        <Container h="7vh" p={1}>
                            <Flex justifyContent="space-between" alignItems="center" padding={1}>
                                <Flex alignItems="center">
                                    <Button onClick={() => getLink('github')} leftIcon={<LinkIcon />} colorScheme='teal' variant='ghost' size='sm'>
                                        Github
                                    </Button>
                                    <Button onClick={() => getLink('linkedin')} leftIcon={<AtSignIcon />} colorScheme='teal' variant='ghost' size='sm'>
                                        LinkedIn
                                    </Button>
                                </Flex>
                                <Button size="sm" onClick={toggleColorMode}>
                                    {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                                </Button>
                            </Flex>
                        </Container>
                    </VStack>
                </Box>
            </Box>
        </>
    )
}

export default Blueprint;