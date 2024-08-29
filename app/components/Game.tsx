import {
    Container, Stack, Box, Avatar, AvatarBadge, Text,
    Card, CardHeader, Heading, HStack, CardBody, StackDivider, Link, Tooltip
} from "@chakra-ui/react"

const Game = (props: { color: string }) => {
    return (
        <>
            <Box
                w={{ base: "100vw", md: "70vw" }}
                h={'100vh'}
                bg="blue.100"
                p={2}
            >
                {/* Chat or main interaction area */}
                <Box>
                    <h2>Chat / Interaction Area</h2>
                    {/* Add your chat UI or main content here */}
                </Box>
            </Box>
        </>
    )
}

export default Game;