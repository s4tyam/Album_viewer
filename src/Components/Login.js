import React, { useState } from 'react';
import { Input, FormControl, FormLabel, InputGroup, InputRightElement, VStack, Button } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const handleClick = () => {
    setShow(!show);
  };

  
  const submithandler = async () => {
    setLoading(true);
    if (  !email || !password ) {
      toast({
        title: 'Please fill all entries',
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
      const { data } = await axios.post("http://localhost:5000/api/user/login", {  email, password }, config);
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
    <div>
      <VStack spacing="7px">
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input placeholder="Enter Your email" onChange={(e) => setEmail(e.target.value)} />
        </FormControl>

        <FormControl id="password" isRequired>
          <FormLabel>Password:</FormLabel>
          <InputGroup>
            <Input
              type={show ? 'text' : 'password'}
              placeholder="Enter Your Password."
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement>
              <Button onClick={handleClick}>{show ? 'Hide' : 'Show'}</Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button color="blue" width="100%" type="submit" onClick={submithandler} isLoading={loading}>
          Submit
        </Button>
      </VStack>
    </div>
  );
};

export default Login;