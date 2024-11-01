import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';
import TrackList from '@/components/TrackList';
import { ITrack } from '@/functions/types';
import { useFocusEffect } from '@react-navigation/native';
import { useColorSchemeContext } from "@/hooks/ColorSchemeContext";

const HomeScreen: React.FC = () => {
    const { colors } = useColorSchemeContext();
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [musicFiles, setMusicFiles] = useState<ITrack[]>([]);

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
            <TrackList musicFiles={musicFiles} playSound={playSound} />
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
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: 2,
    }
});

export default HomeScreen;
