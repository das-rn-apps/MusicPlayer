import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type PlayerControlsProps = {
    playSound: (uri: string) => Promise<void>;
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
            onPress={isPlaying ? pauseSound : () => playSound('your-audio-uri-here')}
        />
        <MaterialIcons name="skip-next" size={36} color="black" />
    </View>
);

const styles = StyleSheet.create({
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        // padding: 10,
        margin: 10
    },
});

export default PlayerControls;
