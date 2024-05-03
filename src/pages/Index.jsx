import { useState } from 'react';
import { Box, Button, Container, Flex, Input, Link, Text, Textarea, useColorModeValue, VStack, Tag, TagLabel, TagCloseButton, IconButton } from '@chakra-ui/react';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

const Note = ({ note, onDelete, onEdit, onColorChange, onAddTag, onRemoveTag }) => {
  return (
    <Box p={4} shadow="md" borderWidth="1px" borderRadius="lg" bg={note.color || useColorModeValue('gray.100', 'gray.700')}>
      <Flex justifyContent="space-between">
        <Input defaultValue={note.title} isReadOnly={!note.isEditing} />
        <Flex>
          <IconButton onClick={() => onEdit(note.id)} size="sm" colorScheme="teal" icon={<FaEdit />} aria-label="Edit note" />
          <Button onClick={() => onDelete(note.id)} size="sm" colorScheme="red">
            <FaTrash />
          </Button>
        </Flex>
      </Flex>
      <Textarea defaultValue={note.content} isReadOnly={!note.isEditing} mt={4} />
      <Input type="color" value={note.color} onChange={(e) => onColorChange(note.id, e.target.value)} mt={4} />
      <Flex mt={4}>
        {note.tags.map((tag, index) => (
          <Tag size="lg" key={index} borderRadius="full">
            <TagLabel>{tag}</TagLabel>
            <TagCloseButton onClick={() => onRemoveTag(note.id, tag)} />
          </Tag>
        ))}
        <Input placeholder="Add a tag" onKeyPress={(e) => onAddTag(note.id, e.target.value)} />
      </Flex>
    </Box>
  );
};

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', content: '', tags: [], color: '', isEditing: false });

  const addNote = () => {
    if (newNote.title || newNote.content) {
      const noteToAdd = { ...newNote, id: Date.now() };
      setNotes([...notes, noteToAdd]);
      setNewNote({ title: '', content: '', tags: [], color: '', isEditing: false });
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const editNote = (id) => {
    setNotes(notes.map(note => {
      if (note.id === id) {
        return { ...note, isEditing: !note.isEditing };
      }
      return note;
    }));
  };

  const changeNoteColor = (id, color) => {
    setNotes(notes.map(note => {
      if (note.id === id) {
        return { ...note, color };
      }
      return note;
    }));
  };

  const addTag = (id, tag) => {
    setNotes(notes.map(note => {
      if (note.id === id && !note.tags.includes(tag)) {
        return { ...note, tags: [...note.tags, tag] };
      }
      return note;
    }));
  };

  const removeTag = (id, tagToRemove) => {
    setNotes(notes.map(note => {
      if (note.id === id) {
        return { ...note, tags: note.tags.filter(tag => tag !== tagToRemove) };
      }
      return note;
    }));
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
          <Note key={note.id} note={note} onDelete={deleteNote} onEdit={editNote} onColorChange={changeNoteColor} onAddTag={addTag} onRemoveTag={removeTag} />
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