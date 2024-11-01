import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { Audio } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';
import PlayerControls from '@/components/PlayerControls';
import CoverImage from '@/components/CoverImage';
import TrackList from '@/components/TrackList';
import { ITrack } from '@/functions/types';
import { useFocusEffect } from '@react-navigation/native';
import { useColorSchemeContext } from "@/hooks/ColorSchemeContext";

const HomeScreen: React.FC = () => {
    const { colors } = useColorSchemeContext();
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [musicFiles, setMusicFiles] = useState<ITrack[]>([]);
    const [coverImage, setCoverImage] = useState<string | null>(null);
    const [isModalVisible, setModalVisible] = useState(false);

    const fetchMusicFiles = async () => {
        try {
            const { assets } = await MediaLibrary.getAssetsAsync({
                mediaType: ['audio'],
            });
            setMusicFiles(assets);
        } catch (error) {
            console.log('Error fetching music files:', error);
        }
    };

    useEffect(() => {
        const requestPermissions = async () => {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status === 'granted') {
                fetchMusicFiles();
            } else {
                console.log('Permission to access music library was denied');
            }
        };
        requestPermissions();
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchMusicFiles();
        }, [])
    );

    const playSound = async (uri: string) => {
        if (sound) {
            await sound.unloadAsync();
        }
        const { sound: newSound } = await Audio.Sound.createAsync({ uri });
        setSound(newSound);
        await newSound.playAsync();
        setIsPlaying(true);
        setModalVisible(true);
    };

    const pauseSound = async () => {
        if (sound) {
            await sound.pauseAsync();
            setIsPlaying(false);
            setModalVisible(false);
        }
    };

    useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.tint }]}>DeepTunes</Text>
            <CoverImage uri={coverImage} />
            <TrackList musicFiles={musicFiles} playSound={playSound} />
            <Modal
                transparent={true}
                animationType="slide"
                visible={isModalVisible}
                onRequestClose={() => {
                    pauseSound(); // Optional: Close modal on back press
                }}
            >
                <View style={styles.modalContainer}>
                    <PlayerControls
                        playSound={playSound}
                        pauseSound={pauseSound}
                        isPlaying={isPlaying}
                    />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        letterSpacing: 1,
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        position: "absolute",
        bottom: 10,
        width: '100%'
    },
});

export default HomeScreen;
