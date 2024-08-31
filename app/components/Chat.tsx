import {
    Container, Stack, Box, Avatar, AvatarBadge, Text,
    Card, CardHeader, Heading, HStack, CardBody, StackDivider, Link, Tooltip,
    useColorModeValue,
    Button,
    Divider,
    VStack,
    useToken,
    useColorMode,
    Input
} from "@chakra-ui/react"
import { useMeasure } from "react-use";

import { City, Play } from "../types";
import Map from './Map';
import { useEffect, useState } from "react";
import { getPuzzle } from "./routes";


interface Props {
    color: string;
    status: boolean;
    progress: Play;
    city: City;
    updateCoor: Function;
}

const Chat = (props: Props) => {

    const [ref, { width, height }] = useMeasure();
    const { colorMode } = useColorMode();
    const bgColor = useToken('colors', useColorModeValue("gray.200", "gray.800"))

    const [puzzle, setPuzzle] = useState({});
    const [response, setResponse] = useState('');

    useEffect(() => {
        if (props.status && props.city.name != '') {
            const fetchPuzzle = async () => {
                const gamePuzzle = await getPuzzle(props.city.name, props.city.lat, props.city.lng);
                console.log(gamePuzzle);
                setPuzzle(gamePuzzle);
            };
            fetchPuzzle();
        }
    }, [props.status])

    const sendMessage = () => {

    }

    return (
        <>
            <Box
                w={{ base: "100vw", md: "70vw" }}
                h={'100vh'}
                bg={useColorModeValue("gray.200", "gray.800")}
                p={2}
                ref={ref}
            >
                <Box>
                    <VStack>
                        <Container h={'10vh'} p={1} mb={2} ml={0}>
                            <HStack paddingBottom={1} justifyContent="flex-start">
                                <Heading as='h3' size='md' letterSpacing={1} color={props.color}>
                                    {`Hello ${props.progress.name}`}
                                </Heading>
                            </HStack>
                            <HStack>
                                <Text py={2}>
                                    Pack your bags and get ready for an adventure!
                                </Text>

                            </HStack>

                        </Container>
                        <Divider />
                        <Container h={'72vh'} p={2} justifyContent={'center'}>
                            {props.status ? (
                                <></>
                            ) : (
                                <Map width={width} height={height}
                                    color={bgColor} mode={colorMode}
                                    lat={props.city.lat} lng={props.city.lng}
                                    updateCoor={props.updateCoor}
                                />
                            )}

                        </Container>
                        <Divider />
                        <Container h="7vh" p={1} ml={2} mr={2}>
                            <HStack>
                                <Input size={'sm'}
                                    placeholder={'Talk to the GPT'}
                                    value={response}
                                    onChange={(e) => setResponse(e.target.value)}
                                    onKeyDown={(e) => (e.key === 'Enter' ? sendMessage() : null)}
                                    disabled={!props.status}
                                />
                                <Button size='sm' color={'teal'} onClick={() => sendMessage()} disabled={!props.status}>Validate</Button>
                                <Button size='sm' onClick={() => setResponse('')} disabled={!props.status}>Clear</Button>
                            </HStack>
                        </Container>
                    </VStack>
                </Box>
            </Box>
        </>
    )
}

export default Chat;