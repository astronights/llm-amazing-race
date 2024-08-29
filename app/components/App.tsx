import '../assets/app.sass';
import Game from './Game';
import Rules from './Rules';
import Multiplayer from './Multiplayer';
import { useState } from 'react';
import { Flex } from '@chakra-ui/react';


const App = () => {
  // blue, cyan, gray, green, orange, pink, purple, red, teal, yellow
  const color = "teal";
  const [page, setPage] = useState("game");


  return (
    <>
        <Flex>
            <Multiplayer color={color}/>
            <Game color={color} />
        </Flex>
    </>
  );
}

export default App;