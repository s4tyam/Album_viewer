
import './Main.css';
import {React , useState ,useEffect} from 'react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Box,
  Text

} from '@chakra-ui/react';
import Card from 'react-bootstrap/Card';
import { Heading } from '@chakra-ui/react'

import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import axios from 'axios'
const CLIENT_ID = "Your spotify client id";
const CLIENT_SECRET = "your spotify secret key/id";

function Main() {
  const [query,setQuery] = useState("");
  const [accessToken , setAccessToken]= useState("");
  const [works,setWorks] = useState([]);
  useEffect(()=>{ 
    // auth api
    const authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
    };
    
    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then((result) => result.json())
      .then((data) => setAccessToken(data.access_token))
      .catch((error) => console.error(error));

  

  },[])
  //searching albums on query
  const handleSubmit= async ()=>{
    var artistParameters = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    };
    
    var artistId = await fetch('https://api.spotify.com/v1/search?q=' + query + '&type=artist', artistParameters)
      .then(response => response.json())
      .then(data => {return data.artists.items[0].id})
      .catch(error => console.error(error));


      const albums = await fetch('https://api.spotify.com/v1/artists/' + artistId + '/albums', artistParameters)
      .then(response => response.json())
      .then(data => {
        console.log(data.items)
        setWorks(data.items)
      })
      .catch(error => console.error(error));
    
  }
  return (
    <div className="App">
    <Box maxW='22rem'>
  <Heading mb={4}>Search for the most recent album upload by your favourite aritst.</Heading>
  <Text fontSize='sm'>
    helping you find your favourite tunes 
  </Text>
  
</Box>
      <FormControl>
  <Input
    type="text"
    placeholder="Type your favourite artist name here"
    size="lg"
    onChange={(e) => setQuery(e.target.value)}
  />

  <Button
    colorScheme="blue"
    size="sm"
    variant="outline"
    onClick={handleSubmit}
    top={0}
  >
    Submit
  </Button>
</FormControl>

  <div className='cards'>
  <Container>
       <Row className="mx-2 row row-cols-4" padding={4} >
       {works.map((album, i) => (
  <Card key={i} style={{ width: '19rem' ,margin:"1rem",d:"flex",flexDirection:"column" }}>
    <Card.Img src={album.images[0].url} variant='top'/>
    <Card.Body>
      <Card.Title>{album.name}</Card.Title>
    </Card.Body>
  </Card>
))}

       </Row>
      </Container>
  </div>

    </div>
  );
}

export default Main;
