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



interface Props {
    game
}

const Chat = (props: Props) => {

    const bgColor = useToken('colors', useColorModeValue("gray.200", "gray.800"))

    

    return (
        <>
            <Box>
                Chat Streaming Messages Here
            </Box>
        </>
    )
}

export default Chat;