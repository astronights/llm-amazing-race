import {
    Flex, Button, Drawer, DrawerBody, DrawerOverlay, DrawerContent, useColorModeValue,
    Stack, useColorMode, IconButton, useMediaQuery, useDisclosure, HStack, VStack, Link, Box, Text,
    Container,
    Heading,
    Input,
    Tr, Th, Table, Thead, Tbody, Td,
    Divider
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { useState } from "react";
const TbIcons = require("react-icons/tb");

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
    const [members, setMembers] = useState([]);

    const { colorMode, toggleColorMode } = useColorMode();

    const linkedin = () => {
        window.open(`https://www.linkedin.com/in/shubhankar-agrawal/`, "_blank", "noreferrer,noopener");
    };
    const github = () => {
        window.open(`https://github.com/astronights`, "_blank", "noreferrer,noopener");
    };

    const TbLetterComponents = 'LLM AMAZING RACE'.split('').map(
        (letter) => letter == ' ' ? TbIcons['TbSeparator'] : TbIcons[`TbLetter${letter}`]);

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
                                {TbLetterComponents.map((Component, index) => {
                                    if (Component.name === "TbSeparator") {
                                        return <Component key={index} color={'transparent'} />;
                                    } else {
                                        return <Component key={index} color={colors[props.color]} />
                                    }
                                }
                                )}
                            </HStack>
                            <Text py={2}>
                                Embark on a city text adventure.
                            </Text>
                        </Container>
                        <Divider />
                        <Container h={'72vh'}  p={2}>
                            <Heading size="md" mb={3}>Setup Game</Heading>

                            <HStack spacing={4} mb={4}>
                                <Button onClick={() => {}}>Create Game</Button>
                                <Button onClick={() => {}}>Join Game</Button>
                            </HStack>

                                <HStack spacing={3} align="stretch">
                                    <Input
                                        placeholder={'Game Code'}
                                        value={gameCode}
                                        onChange={(e) => setGameCode(e.target.value)}
                                        isReadOnly={true}
                                    />
                                    <Button colorScheme="green" onClick={() => {}}>
                                        Join
                                    </Button>
                                </HStack>

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
                    {/* <Flex
                        bg={useColorModeValue("gray.100", "gray.900")}
                        px={4}
                        h={16}
                        boxShadow={"none"}
                        zIndex="sticky"
                        position="fixed"
                        as="header"
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        w="25%"
                    >
                        <HStack gap={'0.3rm'}>
                            {TbLetterComponents.map((Component, index) => {
                                if (Component.name === "TbSeparator") {
                                    return <Component key={index} color={'transparent'} />;
                                } else {
                                    return <Component key={index} color={colors[props.color]} />
                                }
                            }
                            )}
                        </HStack>
                    </Flex>
                    <Box
                        bg={useColorModeValue("gray.100", "gray.900")}
                        // px={4}
                        h={16}
                        // boxShadow={"none"}
                        zIndex="sticky"
                        position="fixed"
                        as="footer"
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        w="25%"
                    >
                        <Button onClick={toggleColorMode}>
                            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                        </Button>
                    </Box>*/}
                </Box>
            </Box>
        </>
    )
}

export default Multiplayer;