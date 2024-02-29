import React, { useState } from "react";
import { ChakraProvider, Box, VStack, Grid, theme, Text, Button, Input, InputGroup, InputLeftElement, Divider, useToast, IconButton, Stack } from "@chakra-ui/react";
import { FaUsers, FaComments, FaPlus, FaPaperPlane } from "react-icons/fa";

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();

  const sendMessage = () => {
    if (inputValue.trim() !== "") {
      setMessages([...messages, { text: inputValue, sender: "You" }]);
      setInputValue("");
    } else {
      toast({
        title: "Cannot send empty message.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <VStack spacing={8}>
            <Text fontSize="3xl" fontWeight="bold">
              Work Together Dashboard
            </Text>
            <Stack direction={{ base: "column", md: "row" }} spacing={4} align="center">
              <Button leftIcon={<FaUsers />} colorScheme="teal" variant="solid">
                Team
              </Button>
              <Button leftIcon={<FaComments />} colorScheme="blue" variant="outline">
                Chat
              </Button>
              <Button leftIcon={<FaPlus />} colorScheme="green" variant="ghost">
                Add Task
              </Button>
            </Stack>
            <Divider />
            <Box bg="gray.100" w="100%" p={4} color="black" borderRadius="md" overflowY="auto" maxH="400px">
              <VStack spacing={4} align="stretch">
                {messages.map((message, index) => (
                  <Box key={index} bg="teal.500" color="white" p={3} borderRadius="md">
                    <Text fontWeight="bold">{message.sender}</Text>
                    <Text>{message.text}</Text>
                  </Box>
                ))}
              </VStack>
            </Box>
            <InputGroup size="md">
              <InputLeftElement pointerEvents="none" children={<FaComments color="gray.300" />} />
              <Input
                pr="4.5rem"
                type="text"
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
              />
              <IconButton colorScheme="blue" icon={<FaPaperPlane />} ml={2} onClick={sendMessage} />
            </InputGroup>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};

export default Index;
