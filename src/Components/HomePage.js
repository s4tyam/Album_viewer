import React, { useEffect } from "react";
import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel
} from "@chakra-ui/react";
import Login from "./Login";
import Signup from "./SignUp"
import { useHistory } from "react-router-dom";
import './Home.css'
function HomePage() {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if(user) {
      history.push("/search")
    }
  },[history])
  return (
    
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="pink"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text
          alignContent="center"
          fontSize="4xl"
          fontFamily="Work sans"
          color="black"
        >
         Album Viewer
        </Text>
      </Box>
      <Box
        bg="pink"
        w="100%"
        p={4}
        borderRadius="lg"
        borderWidth="1px"
        COLOR="black"
      >
        <Tabs variant="soft-rounded">
          <TabList mb="1 em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
   
  );
}

export default HomePage;