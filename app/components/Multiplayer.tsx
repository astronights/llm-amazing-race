import {
    Flex, Container, HStack, VStack, Box,
    Button, Text, Heading, Input, Divider,
    useColorModeValue, useColorMode,
    Tr, Th, Table, Thead, Tbody, Td,
    InputGroup, InputLeftElement,
    InputRightElement,
    InputLeftAddon,
} from "@chakra-ui/react";
import { ArrowRightIcon, AtSignIcon, CheckIcon, LinkIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";

import '../assets/multiplayer.sass'
import socket from '../service/socket';
import { socials, Role } from '../service/variables';
import type { Game, Member, Room } from '../types.d.ts'

let user: Member = {
    sid: '',
    name: '',
    role: Role.OTHER,
    score: 0,
    level: 0
}

let area: Room = {
    id: '',
    name: '',
    created_at: Date.now()
}

let gameplay: Game = {
    room: area,
    members: [user],
    started: false
}

interface Props {
    color: string;
    updatePage?: any;
}

const Multiplayer = (props: Props) => {

    const [player, setPlayer] = useState<Member>(user);
    const [room, setRoom] = useState<Room>(area);
    const [game, setGame] = useState<Game>(gameplay);

    const [nameInput, setNameInput] = useState('');
    const { colorMode, toggleColorMode } = useColorMode();

    const getLink = (key: string) => {
        window.open(socials[key], "_blank", "noreferrer,noopener");
    }

    const createGame = () => {
        socket.emit('createRoom', room.name);
    }

    useEffect(() => {
        socket.on('roomCreated', (room) => {
            console.log(room);
            setRoom({ id: room.id, name: room.name, created_at: Date.now() })

        });

        // socket.on('playerJoined', (players) => {
        //     setPlayers(players);
        // });

        return () => {
            socket.off('roomCreated');
            socket.off('playerJoined');
        };
    }, []);

    const joinGame = () => {
        // setRole('player');
        //TODO: Connect to Socket
    }

    const copyCode = () => {
        navigator.clipboard.writeText(room.id);
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
                            <HStack gap={'0.2rm'} paddingBottom={2}>
                                <Heading as='h3' size='md' letterSpacing={1} color={props.color}>LLM Amazing Race</Heading>
                            </HStack>
                            <Text py={2}>
                                Embark on a city text adventure.
                            </Text>
                        </Container>
                        <Divider />
                        <Container h={'72vh'} p={2}>
                            <Heading size="sm" mb={3}>Lobby</Heading>

                            {!game.started &&
                                (
                                    <HStack spacing={3} align="stretch" mb={4}>
                                        <InputGroup size={'sm'}>
                                            <InputLeftAddon>Who:</InputLeftAddon>
                                            <Input
                                                placeholder={'Carmen Sandiago 42'}
                                                value={nameInput}
                                                onChange={(e) => setNameInput(e.target.value)}
                                            />
                                            {player.name != nameInput &&
                                                <InputRightElement>
                                                    <Button h='1.75rem' size='sm' leftIcon={<CheckIcon color='green.500' />} onClick={() => setPlayer({ ...player, name: nameInput })}>
                                                    </Button>
                                                </InputRightElement>
                                            }
                                        </InputGroup>
                                    </HStack>
                                )
                            }

                            {player.name != '' &&
                                (
                                    <HStack spacing={2} mb={4} justifyContent={'center'}>
                                        <Button size={'sm'} onClick={() => setPlayer({ ...player, role: Role.HOST })}>Create Game</Button>
                                        <Button size={'sm'} onClick={() => setPlayer({ ...player, role: Role.PLAYER })}>Join Game</Button>
                                    </HStack>
                                )
                            }

                            {player.name != '' && player.role == Role.HOST && !game.started &&
                                (
                                    <HStack spacing={3} align="stretch">
                                        <Input size={'sm'}
                                            placeholder={'Room Name'}
                                            value={room.name}
                                            onChange={(e) => setRoom({ id: '', name: e.target.value, created_at: Date.now() })}
                                        />
                                        <Button size={'sm'} colorScheme="green" onClick={createGame}>Start</Button>
                                    </HStack>
                                )
                            }

                            {player.name != '' && player.role == Role.PLAYER && !game.started &&
                                (
                                    <HStack spacing={3} align="stretch">
                                        <Input size={'sm'}
                                            placeholder={'Room Code'}
                                            value={room.id}
                                            onChange={(e) => setRoom({ ...room, id: e.target.value })}
                                        />
                                        <Button size={'sm'} colorScheme="green" onClick={joinGame}>Join</Button>
                                    </HStack>
                                )
                            }

                            {player.name != '' && game.started && (
                                <Table variant="simple" mt={4}>
                                    <Thead>
                                        <Tr>
                                            <Th>Member</Th>
                                            <Th>Score</Th>
                                            <Th>Level</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {game.members.map((member, index) => (
                                            <Tr key={index}>
                                                <Td>{member.name}</Td>
                                                <Td>{member.score}</Td>
                                                <Td>{member.level}</Td>
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

export default Multiplayer;