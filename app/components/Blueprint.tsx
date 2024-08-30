import {
    Flex, Container, HStack, VStack, Box,
    Button, Text, Heading, Input, Divider,
    useColorModeValue, useColorMode,
    Tr, Th, Table, Thead, Tbody, Td,
    InputGroup, InputRightElement, InputLeftAddon
} from "@chakra-ui/react";
import { ArrowRightIcon, AtSignIcon, CheckIcon, LinkIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useState } from "react";

import '../assets/blueprint.sass'
import type { City, Play } from '../types'
import { socials } from "../variables";

interface Props {
    color: string;
    city: City;
    progress: Play
}

const Blueprint = (props: Props) => {

    const [player, setPlayer] = useState('');
    const [nameInput, setNameInput] = useState('');

    const { colorMode, toggleColorMode } = useColorMode();

    const getLink = (key: string) => {
        window.open(socials[key], "_blank", "noreferrer,noopener");
    }

    const startGame = () => {

    }

    return (
        <>
            <Box
                w={{ base: "100vw", md: "25vw" }}
                h={'100vh'}
                p={2}
                bg={useColorModeValue("gray.100", "gray.900")}
            >
                <Box>
                    <VStack>
                        <Container h={'10vh'} p={1} mb={2}>
                            <HStack gap={'0.2rm'} paddingBottom={2}>
                                <Heading as='h3' size='md' letterSpacing={1} color={props.color}>LLM Amazing Race</Heading>
                            </HStack>
                            <Text py={2}>
                                Embark on a city text adventure.
                            </Text>
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
                                <Text color={colorMode}>Where would you go?</Text>
                                
                            </VStack>

                            {player != '' &&
                                (
                                    <HStack spacing={2} mb={4} >
                                        <Text>The world is waiting. </Text>
                                        <Button size={'sm'} onClick={startGame} rightIcon={<ArrowRightIcon></ArrowRightIcon>}>Let's Go</Button>
                                    </HStack>
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