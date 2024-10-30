import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';
// import { parseFile } from 'music-metadata';
import PlayerControls from '@/components/PlayerControls';

const HomeScreen: React.FC = () => {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [musicFiles, setMusicFiles] = useState<any[]>([]);
    const [coverImage, setCoverImage] = useState<string | null>(null);
    const [currentTrack, setCurrentTrack] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status === 'granted') {
                fetchMusicFiles();
            } else {
                console.log('Permission to access music library was denied');
            }
        })();
    }, []);

    const fetchMusicFiles = async () => {
        const { assets } = await MediaLibrary.getAssetsAsync({
            mediaType: ['audio'],
        });
        setMusicFiles(assets);
    };

    const playSound = async (uri: string) => {
        if (sound) {
            await sound.unloadAsync(); // Unload previous sound
        }

        const { sound: newSound } = await Audio.Sound.createAsync(
            { uri } // Use the file path
        );
        setSound(newSound);
        setCurrentTrack(uri);
        await newSound.playAsync();
        setIsPlaying(true);

        // Fetch and set cover image
        // fetchMetadata(uri);
    };

    const pauseSound = async () => {
        if (sound) {
            await sound.pauseAsync();
            setIsPlaying(false);
        }
    };

    // const fetchMetadata = async (uri: string) => {
    //     try {
    //         const metadata = await parseFile(uri); // Use parseFile to get metadata
    //         console.log("Fetched metadata:", metadata);

    //         // Check if cover image exists
    //         if (metadata.common.picture && metadata.common.picture.length > 0) {
    //             const base64Image = `data:${metadata.common.picture[0].format};base64,${metadata.common.picture[0].data.toString('base64')}`;
    //             setCoverImage(base64Image);
    //         } else {
    //             setCoverImage(null); // Reset if no cover image
    //         }
    //     } catch (error) {
    //         console.error("Failed to fetch audio metadata:", error);
    //     }
    // };

    useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Music Player</Text>
            {coverImage && (
                <Image
                    source={{ uri: coverImage }}
                    style={styles.coverImage}
                    resizeMode="cover"
                />
            )}
            <FlatList
                data={musicFiles}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => playSound(item.uri)}>
                        <Text style={styles.trackTitle}>{item.filename}</Text>
                    </TouchableOpacity>
                )}
                style={styles.trackList}
            />
            <PlayerControls
                playSound={playSound}
                pauseSound={pauseSound}
                isPlaying={isPlaying}
            />
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
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    coverImage: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    trackList: {
        width: '100%',
    },
    trackTitle: {
        fontSize: 18,
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
});

export default HomeScreen;
