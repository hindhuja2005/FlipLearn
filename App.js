import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, ImageBackground } from 'react-native';
import FlashCard from './FlashCard'; // Importing the FlashCard component

export default function App() {
  const [flashcards, setFlashcards] = useState([
    { question: "What is React Native?", answer: "A framework for building mobile apps using React." },
    { question: "What is useState?", answer: "A React Hook for managing state in functional components." },
  ]);
  
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  // Function to add a new flashcard
  const addFlashCard = () => {
    if (!newQuestion || !newAnswer) {
      Alert.alert('Error', 'Both question and answer are required!');
      return;
    }

    const newFlashcard = { question: newQuestion, answer: newAnswer };
    setFlashcards((prevCards) => [...prevCards, newFlashcard]);
    setNewQuestion(''); // Clear the input fields
    setNewAnswer('');
  };

  // Function to remove a flashcard by index
  const removeFlashCard = (index) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this flashcard?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            const updatedFlashcards = flashcards.filter((_, idx) => idx !== index);
            setFlashcards(updatedFlashcards); // Update the flashcards state
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Background Image */}
      <ImageBackground
        source={{ uri: 'https://www.schoolplanner.co.uk/wp-content/uploads/2020/01/page-colours-flashcard.jpg' }} // Replace with your image URL
        style={styles.backgroundImage}
      >
        <Text style={styles.header}>Flashcards App</Text>
        
        {/* Input Fields for Adding Flashcards */}
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter question"
            value={newQuestion}
            onChangeText={setNewQuestion}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter answer"
            value={newAnswer}
            onChangeText={setNewAnswer}
          />
          <TouchableOpacity style={styles.button} onPress={addFlashCard}>
            <Text style={styles.buttonText}>Add Flashcard</Text>
          </TouchableOpacity>
        </View>

        {/* Flashcards List */}
        <ScrollView contentContainerStyle={styles.cardsContainer}>
          {flashcards.map((card, index) => (
            <FlashCard 
              key={index} 
              card={card} 
              onDelete={() => removeFlashCard(index)} // Pass the remove function to FlashCard component
            />
          ))}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: 1,
  },
  formContainer: {
    width: '85%',
    marginBottom: 30,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 15,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Add transparency to input background for better contrast
    borderColor: '#e0e0e0',
    borderWidth: 1,
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  button: {
    backgroundColor: '#4e8ef7',
    padding: 15,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  cardsContainer: {
    flexGrow: 1,
    width: '100%',
    alignItems: 'center',
    paddingTop: 100,
    paddingBottom: 30,
  },
  card: {
    width: '90%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    marginHorizontal: '5%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    borderColor: '#ddd',
    borderWidth: 1,
    alignItems: 'center',
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});