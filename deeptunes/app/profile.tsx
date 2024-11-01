// app/SongPlayerScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { RouteProp, useRoute } from '@react-navigation/native';

type SongPlayerScreenParams = {
    SongPlayer: {
        uri: string;
        title: string;
        artist: string;
        coverImage?: string;
    };
};

type SongPlayerScreenRouteProp = RouteProp<SongPlayerScreenParams, 'SongPlayer'>;

const SongPlayerScreen: React.FC = () => {
    const route = useRoute<SongPlayerScreenRouteProp>();
    const { uri, title, artist, coverImage } = route.params;

    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        // Load and play the song when the component mounts
        const loadAndPlaySound = async () => {
            const { sound: newSound } = await Audio.Sound.createAsync({ uri });
            setSound(newSound);
            await newSound.playAsync();
            setIsPlaying(true);
        };

        loadAndPlaySound();

        // Unload sound when the component unmounts
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [uri]);

    const handlePlayPause = async () => {
        if (sound) {
            if (isPlaying) {
                await sound.pauseAsync();
            } else {
                await sound.playAsync();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <View style={styles.container}>
            {coverImage ? (
                <Image source={{ uri: coverImage }} style={styles.coverImage} />
            ) : (
                <View style={[styles.coverImage, styles.placeholder]}>
                    <Text style={styles.placeholderText}>No Cover Image</Text>
                </View>
            )}
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.artist}>{artist}</Text>

            <TouchableOpacity onPress={handlePlayPause} style={styles.playPauseButton}>
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
        backgroundColor: '#f0f0f0',
        padding: 20,
    },
    coverImage: {
        width: 250,
        height: 250,
        borderRadius: 10,
        marginBottom: 20,
    },
    placeholder: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#cccccc',
    },
    placeholderText: {
        color: '#888888',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    artist: {
        fontSize: 18,
        color: '#555',
        marginBottom: 30,
    },
    playPauseButton: {
        paddingVertical: 12,
        paddingHorizontal: 30,
        backgroundColor: '#1DB954',
        borderRadius: 25,
    },
    playPauseButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default SongPlayerScreen;
