import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Audio } from 'expo-av';
import { randomNum } from '@/functions/randomNumber';
import { useLocalSearchParams } from 'expo-router';
import { useColorSchemeContext } from "@/hooks/ColorSchemeContext";

const SongPlayerScreen: React.FC = () => {
    const { uri, title, artist, coverImage } = useLocalSearchParams();
    const { colors } = useColorSchemeContext();

    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const loadAndPlaySound = async () => {
            if (!uri) {
                Alert.alert('Error', 'No audio URI provided.');
                return;
            }

            try {
                const { sound: newSound } = await Audio.Sound.createAsync({ uri });
                setSound(newSound);
                await newSound.playAsync();
                setIsPlaying(true);
            } catch (error) {
                Alert.alert('Error', 'Could not load the audio file. Please try again later.');
            }
        };

        loadAndPlaySound();

        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [uri]);

    const handlePlayPause = async () => {
        if (sound) {
            if (isPlaying) {
                await sound.pauseAsync(); // Pause the sound
            } else {
                await sound.playAsync(); // Play the sound
            }
            setIsPlaying(!isPlaying); // Toggle playing state
        }
    };

    const coverImageUri = Array.isArray(coverImage) ? coverImage[0] : coverImage;

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Image
                source={{ uri: coverImageUri || `https://picsum.photos/${randomNum()}` }}
                style={styles.coverImage}
            />
            <Text style={[styles.title, { color: colors.text }]}>{title || 'Unknown Title'}</Text>
            <Text style={[styles.artist, { color: colors.primary }]}>{artist || 'Unknown Artist'}</Text>

            <TouchableOpacity onPress={handlePlayPause} style={[styles.playPauseButton, { backgroundColor: colors.icon }]}>
                <Text style={styles.playPauseButtonText}>
                    {isPlaying ? 'Pause' : 'Play'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingTop: 50, // More space at the top
    },
    coverImage: {
        width: '95%',
        height: 400,
        borderRadius: 15, // Slightly larger radius for a smoother look
        marginBottom: 20,
        borderColor: '#ccc', // Light border
        borderWidth: 1,
        shadowColor: '#000', // Shadow settings
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3, // For Android shadow
    },
    title: {
        fontSize: 26, // Increased font size
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center', // Center text
    },
    artist: {
        fontSize: 20, // Increased font size
        marginBottom: 30,
        textAlign: 'center', // Center text
    },
    playPauseButton: {
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        alignItems: 'center', // Center text in button
        justifyContent: 'center',
        elevation: 4, // Elevation for shadow on button
    },
    playPauseButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default SongPlayerScreen;
