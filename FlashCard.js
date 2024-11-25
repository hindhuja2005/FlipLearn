import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const FlashCard = ({ card, onDelete }) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardText}>{card.question}</Text>
      <Text style={styles.cardAnswer}>{card.answer}</Text>
      
      {/* Delete Button */}
      <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 280,
    height: 180,
    backgroundColor: '#F8D9D6', // Soft pastel pink
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
    shadowColor: '#B0A1A7',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5, // For Android shadow
  },
  cardText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333', // Dark text for contrast
    textAlign: 'center',
    marginBottom: 10,
  },
  cardAnswer: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#888888', // Lighter gray for the answer text
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: '#FF6347', // Tomato red for the delete button
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FlashCard