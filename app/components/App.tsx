import Chat from './Chat';
import SetUp from './Setup';
import { Flex } from '@chakra-ui/react';

import '../assets/app.sass';
import type { City, Play } from '../types';
import { useState } from 'react';


let location: City = {
    name: '',
    lat: 0.0,
    lng: 0.0
}

let play: Play = {
    name: '',
    progress: [],
    start: 0,
    end: 0
}

const App = () => {
    // blue, cyan, gray, green, orange, pink, purple, red, teal, yellow
    const color = "teal";

    const [city, setCity] = useState(location);
    const [progress, setProgress] = useState(play);

    return (
        <>
            <Flex>
                <SetUp color={color} city={city} progress={play}/>
                <Chat color={color} name={progress.name} city={city} />
            </Flex>
        </>
    );
}

export default App;