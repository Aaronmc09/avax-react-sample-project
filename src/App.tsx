import React from 'react';
import './App.css';
import 'axios'
import axios from "axios";
import {Box, Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";

type CardProps = {
    name: string;
    image: string;
}

type Ratings = Array<number>

type APIItem = {
    a: [
        number,
        number,
        Ratings,
        string
    ]
}

const BasicCard: React.FC<any> = (props: CardProps) => {
    const {name, image} = props
    return (
        <Card sx={{minWidth: 275}}>
            <CardMedia
                component="img"
                height="194"
                image={image}
                alt="NFT IMAGE"
            />
            <CardContent>
                <Typography variant="h5" component="div">
                    {name}
                </Typography>
                <Typography sx={{mb: 1.5}} color="text.secondary">
                    AVAXRARITY
                </Typography>
                <Typography variant="body2">
                    AvaxRarity Sample project
                    <br/>
                    {'"a benevolent smile"'}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" fullWidth>CHECK PRICES</Button>
            </CardActions>
        </Card>
    );
}

const App: React.FC<any> = (): any => {
    const [metadata, setMetadata] = React.useState([] as Array<number>)
    const [loading, setLoading] = React.useState(true)

    const getMetadata = async () => {
        const url = 'https://ragepit.dev/api/mongo/el33tio/filter'
        await axios.get(url).then((response) => {
            const indexArray: Array<number> = response.data.metadata.map((item: APIItem) => {
                return item.a[1]
            })
            indexArray.sort((a, b) => a - b)
            setMetadata(indexArray.slice(0, 48))
            setLoading(false)
        })
    }

    React.useEffect(() => {
        getMetadata().then()
    }, [])

    return (
        <div className="App">
            <header className="App-header">
                {loading && (
                    <p>
                        Loading...
                    </p>
                )}
                {!loading && (
                    <p>
                        Top 48 NFTs
                    </p>
                )}
                <Box sx={{display: 'flex', flexWrap: 'wrap'}} justifyContent={"space-evenly"}>
                    {metadata.map((item, index) => {
                        const APIkey = 'QmX38tiHLs1P2A7DPzDDUH1BEsK8JfCavrjiwouw3APjPd'
                        const name = 'El33t.io #' + item.toString()
                        const image = 'https://gateway.ipfs.io/ipfs/' + APIkey + '/' + item.toString() + '.png'

                        const cardProps: CardProps = {
                            name: name,
                            image: image
                        }

                        return (
                            <Box key={index} padding={2}>
                                <BasicCard {...cardProps} />
                            </Box>
                        )
                    })}
                </Box>
            </header>
        </div>
    );
};

export default App;
