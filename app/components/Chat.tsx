import {
    Container, Stack, Box, Avatar, AvatarBadge, Text,
    Card, CardHeader, Heading, HStack, CardBody, StackDivider, Link, Tooltip,
    useColorModeValue,
    Button,
    Divider,
    VStack,
    useToken,
    useColorMode
} from "@chakra-ui/react"
import { useMeasure } from "react-use";

import { City, Play } from "../types";
import Map from './Map';


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
                            <Map width={width} height={height} color={bgColor} mode={colorMode}
                                lat={props.city.lat} lng={props.city.lng} updateCoor={props.updateCoor}
                            />
                        </Container>
                        <Divider />
                        <Container h="7vh" p={1}>
                        </Container>
                    </VStack>
                </Box>
            </Box>
        </>
    )
}

export default Chat;