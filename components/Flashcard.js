import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Animated, ScrollView, TouchableOpacity } from 'react-native';

// Default Flashcard Data
const initialFlashcardsData = [
  { question: 'What is the capital of France?', answer: 'Paris' },
  { question: 'What is 2 + 2?', answer: '4' },
  { question: 'Who wrote "Romeo and Juliet"?', answer: 'William Shakespeare' },
];

const Flashcard = () => {
  // State for flip animation, flashcards, and form inputs
  const [flipAnimation] = useState(new Animated.Value(0)); // Flip animation state
  const [showAnswers, setShowAnswers] = useState(initialFlashcardsData.map(() => false)); // Answer visibility state
  const [flashcards, setFlashcards] = useState(initialFlashcardsData); // Flashcard data state

  // State for the user's question and answer input
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  // Toggle flip animation on card click
  const flipCard = (index) => {
    Animated.timing(flipAnimation, {
      toValue: showAnswers[index] ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    setShowAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[index] = !newAnswers[index]; // Toggle answer visibility
      return newAnswers;
    });
  };

  // Function to handle form submission (adding new flashcard)
  const addFlashcard = () => {
    if (newQuestion.trim() && newAnswer.trim()) {
      const newFlashcard = { question: newQuestion, answer: newAnswer };
      setFlashcards([...flashcards, newFlashcard]);
      setNewQuestion(''); // Clear the input fields
      setNewAnswer('');
    }
  };

  // Interpolation for rotation (flip effect)
  const rotateY = 
  ((index)=>{flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  })});

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Input Form for Adding New Flashcards */}
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
        <TouchableOpacity onPress={addFlashcard} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Flashcard</Text>
        </TouchableOpacity>
      </View>

      {/* Displaying the Flashcards */}
      {flashcards.map((card, index) => (
        <View key={index} style={styles.cardContainer}>
          <Animated.View
            style={[
              styles.card,
              {
                transform: [{ rotateY:[index] }], // Rotate Y for flip effect
              },
            ]}
          >
            <TouchableOpacity onPress={() => flipCard(index)}>
              <Text style={styles.text}>
                {showAnswers[index] ? card.answer : card.question}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      ))}
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: '#F2F7F6', // Light background color
  },
  formContainer: {
    marginBottom: 30,
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10, // Elevation for Android
    marginBottom: 40,
  },
  input: {
    height: 40,
    borderColor: '#007BFF',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: '#007BFF',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  cardContainer: {
    marginBottom: 20,
    width: 320,
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#007BFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
    padding: 20,
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
    fontFamily: 'Roboto',
    lineHeight: 28,
  },
  cardText: {
    writingDirection: 'rtl', // RTL text for the card content
  },
});

export default Flashcard;
