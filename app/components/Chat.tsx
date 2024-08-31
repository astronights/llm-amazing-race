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

import { City } from "../types";
import Map from './Map';


interface Props {
    color: string;
    name: string;
    city: City;
    updateCoor: Function;
}

const Chat = (props: Props) => {

    const [ref, { width }] = useMeasure();
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
                                    {`Hello ${props.name}`}
                                </Heading>
                            </HStack>
                            <HStack>
                                <Text py={2}>
                                    Where in the world will you travel to today?
                                </Text>

                            </HStack>

                        </Container>
                        <Divider />
                        <Container h={'72vh'} p={2} justifyContent={'center'}>
                            <Map width={width} color={bgColor} mode={colorMode}
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