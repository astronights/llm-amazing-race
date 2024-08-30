import {
    Flex, Button, Drawer, DrawerBody, DrawerOverlay, DrawerContent, useColorModeValue,
    Stack, useColorMode, IconButton, useMediaQuery, useDisclosure, HStack, VStack, Link, Box, Text,
    Container,
    Heading,
    Input,
    Tr, Th, Table, Thead, Tbody, Td,
    Divider
} from "@chakra-ui/react";
import '../assets/multiplayer.sass'
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { useState } from "react";

interface Props {
    color: string;
    updatePage?: any;
}

const Multiplayer = (props: Props) => {

    const colors = {
        "blue": "#3182CE",
        "cyan": "#00B5D8",
        "gray": "#718096",
        "green": "#38A169",
        "orange": "#DD6B20",
        "pink": "#D53F8C",
        "purple": "#805AD5",
        "red": "#E53E3E",
        "teal": "#319795",
        "yellow": "#D69E2E"
    };

    const [gameCode, setGameCode] = useState('');
    const [role, setRole] = useState('');
    const [roomName, setRoomName] = useState('');
    const [members, setMembers] = useState([]);

    const { colorMode, toggleColorMode } = useColorMode();

    const linkedin = () => {
        window.open(`https://www.linkedin.com/in/shubhankar-agrawal/`, "_blank", "noreferrer,noopener");
    };
    const github = () => {
        window.open(`https://github.com/astronights`, "_blank", "noreferrer,noopener");
    };

    const updateRole = (val: string) => {
        setRole(val);
    }

    const createGame = () => {
        setGameCode('test-code');
        //TODO: Start Socket
    }

    const joinGame = () => {
        setRole('player');
        //TODO: Connect to Socket
    }

    const copyCode = () => {
        navigator.clipboard.writeText(gameCode);
    }

    return (
        <>
            <Box
                w={{ base: "100vw", md: "30vw" }}
                h={'100vh'}
                p={2}
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

                            <HStack spacing={2} mb={4} justifyContent={'center'}>
                                <Button onClick={() => updateRole('host')}>Create Game</Button>
                                <Button onClick={() => updateRole('player')}>Join Game</Button>
                            </HStack>

                            {role != '' &&
                                (<HStack spacing={3} align="stretch">
                                    <Input
                                        placeholder={role == 'host' ? 'Room Name' : 'Game Code'}
                                        value={role == 'host' ? roomName : gameCode}
                                        onChange={(e) => role == 'host' ? setRoomName(e.target.value) : setGameCode(e.target.value)}
                                    />
                                    <Button colorScheme="green" onClick={role == 'host' ? createGame : joinGame}>
                                        {role == 'host' ? 'Start' : 'Join'}
                                    </Button>
                                </HStack>)
                            }

                            {members.length > 0 && (
                                <Table variant="simple" mt={4}>
                                    <Thead>
                                        <Tr>
                                            <Th>Members</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {members.map((member, index) => (
                                            <Tr key={index}>
                                                <Td>{member}</Td>
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
                                    <FaGithub
                                        style={{ cursor: 'pointer' }}
                                        onClick={github}
                                        size={20}
                                    />
                                    <FaLinkedin
                                        style={{ cursor: 'pointer', marginLeft: '10px' }}
                                        onClick={linkedin}
                                        size={20}
                                    />
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