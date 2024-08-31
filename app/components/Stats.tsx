import {
    Flex, Container, HStack, VStack, Box,
    Button, Text, Heading, Divider,
    useColorModeValue, useColorMode,
    Tr, Th, Table, Thead, Tbody, Td,
    Progress
} from "@chakra-ui/react";
import { ArrowRightIcon, AtSignIcon, LinkIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";

import '../assets/blueprint.sass'
import { socials } from "../variables";
import { getDescription } from "./routes";
import type { City, Play } from '../types'

interface Props {
    color: string;
    city: City;
    progress: Play;
    updateStatus: Function;
    updateCity: Function;
    updateName: Function;
}

const Stats = (props: Props) => {

    const [description, setDescription] = useState('');
    const { colorMode, toggleColorMode } = useColorMode();

    useEffect(() => {
        const fetchDescription = async () => {
            const desc = await getDescription(props.city.name, props.city.country)
            setDescription(desc)
        };
        fetchDescription();
    }, []);

    const updateGameState = () => {
        props.updateStatus(false);
    }

    const getLink = (key: string) => {
        window.open(socials[key], "_blank", "noreferrer,noopener");
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
                            <VStack spacing={1} align="stretch" mb={4}>
                                <Text fontSize={'sm'}>Hello {props.progress.name},</Text>
                                <Text fontSize={'sm'}>Welcome to {props.city.name}, {props.city.country}!</Text>
                                <Text fontSize={'sm'}>Here's a little bit about the city: </Text>
                                <Text fontSize={'sm'}>{description}</Text>
                            </VStack>

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
                            <VStack pt={2}>
                                <Flex justifyContent="space-between" alignItems="center">
                                    <Text mr={2}>A New Adventure ?</Text>
                                    <Button size={'sm'} bgColor='teal' onClick={updateGameState} rightIcon={<ArrowRightIcon />}>New Game</Button>
                                </Flex>
                            </VStack>
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
                </Box >
            </Box >
        </>
    )
}

export default Stats;