import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Define the props type for PlayerControls
type PlayerControlsProps = {
    playSound: (uri: string) => Promise<void>; // Update to accept a uri
    pauseSound: () => Promise<void>;
    isPlaying: boolean;
};

const PlayerControls: React.FC<PlayerControlsProps> = ({ playSound, pauseSound, isPlaying }) => (
    <View style={styles.controls}>
        <MaterialIcons name="skip-previous" size={36} color="black" />
        <MaterialIcons
            name={isPlaying ? "pause" : "play-arrow"}
            size={36}
            color="black"
            onPress={isPlaying ? pauseSound : () => playSound('your-audio-uri-here')} // Replace with actual URI
        />
        <MaterialIcons name="skip-next" size={36} color="black" />
    </View>
);

const styles = StyleSheet.create({
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '60%',
        padding: 20,
    },
});

export default PlayerControls;
