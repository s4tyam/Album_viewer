import React, { useState } from "react";
import { VStack, FormControl } from "@chakra-ui/react";
import { FormLabel, InputGroup } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { InputRightElement } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useToast } from '@chakra-ui/react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';


const Signup = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confpassword, setConfpassword] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();
  
  const handleClick = () => {
    setShow(!show);
  };
  

  const submithandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confpassword) {
      toast({
        title: 'Please fill all entries',
        status: 'error',
        duration: 6000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }
    if (password !== confpassword) {
      toast({
        title: 'Passwords do not match',
        status: 'error',
        duration: 6000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post("/api/user", { name, email, password }, config);
      toast({
        title: 'Registration successful',
        status: 'success',
        duration: 6000,
        isClosable: true,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/search");
    } catch (err) {
      toast({
        title: 'Error occurred',
        status: 'error',
        duration: 6000,
        isClosable: true,
      });
      setLoading(false);
    }
  };
  
  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name:</FormLabel>
        <Input
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email:</FormLabel>
        <Input
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password:</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width={"4.5rem"}>
            <Button size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="confpassword" isRequired>
        <FormLabel>Confirm Password:</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm Your Password"
            value={confpassword}
            onChange={(e) => setConfpassword(e.target.value)}
          />
          <InputRightElement width={"4.5rem"}>
            <Button size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button color="blue" width="100%" type='submit' onClick={submithandler} isLoading={loading}>
        Submit
      </Button>
    </VStack>
  );
};

export default Signup;