import {
    Container, Stack, Box, Avatar, AvatarBadge, Text,
    Card, CardHeader, Heading, HStack, CardBody, StackDivider, Link, Tooltip,
    useColorModeValue,
    Button,
    Divider,
    VStack
} from "@chakra-ui/react"
import { City } from "../types";

interface Props {
    color: string;
    name: string;
    city: City
}

const Chat = (props: Props) => {

    return (
        <>
            <Box
                w={{ base: "100vw", md: "75vw" }}
                h={'100vh'}
                bg={useColorModeValue("gray.200", "gray.800")}
                p={2}
            >
                <Box>
                    <VStack>
                        <Container h={'10vh'} p={1} mb={2} ml={0}>
                            <HStack paddingBottom={2} justifyContent="flex-start">
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
                        <Container h={'72vh'} p={2}>

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