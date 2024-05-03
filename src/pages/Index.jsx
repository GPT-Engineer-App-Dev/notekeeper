import { useState } from 'react';
import { Box, Button, Container, Flex, Input, Link, Text, Textarea, useColorModeValue, VStack } from '@chakra-ui/react';
import { FaPlus, FaTrash } from 'react-icons/fa';

const Note = ({ note, onDelete, onEdit }) => {
  return (
    <Box p={4} shadow="md" borderWidth="1px" borderRadius="lg" bg={useColorModeValue('gray.100', 'gray.700')}>
      <Flex justifyContent="space-between">
        <Text fontWeight="bold">{note.title}</Text>
        <Button onClick={() => onDelete(note.id)} size="sm" colorScheme="red">
          <FaTrash />
        </Button>
      </Flex>
      <Text mt={4}>{note.content}</Text>
    </Box>
  );
};

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  const addNote = () => {
    if (newNote.title || newNote.content) {
      const noteToAdd = { ...newNote, id: Date.now() };
      setNotes([...notes, noteToAdd]);
      setNewNote({ title: '', content: '' });
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <Container maxW="container.xl" py={5}>
      <VStack spacing={4} align="stretch">
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg" bg={useColorModeValue('gray.200', 'gray.600')}>
          <Flex mb={2}>
            <Input
              placeholder="Title"
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            />
            <Button ml={2} onClick={addNote} colorScheme="blue">
              <FaPlus />
            </Button>
          </Flex>
          <Textarea
            placeholder="Take a note..."
            value={newNote.content}
            onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
          />
        </Box>
        {notes.map(note => (
          <Note key={note.id} note={note} onDelete={deleteNote} onEdit={() => {}} />
        ))}
      </VStack>
      <Box as="footer" py={4} mt={10} textAlign="center" borderTopWidth="1px">
        <Text fontSize="sm">© 2023 Note App, Inc.</Text>
        <Link href="/privacy-policy" color="blue.500" fontSize="sm">Privacy Policy</Link>
      </Box>
    </Container>
  );
};

export default Index;