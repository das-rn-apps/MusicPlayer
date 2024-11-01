import { formatDuration, getFormattedFilename } from '@/functions/format';
import { TrackItemProps } from '@/functions/types';
import { router } from 'expo-router';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
import { useColorSchemeContext } from '@/hooks/ColorSchemeContext';

const TrackItem: React.FC<TrackItemProps> = ({ track, playSound }) => {
    const { colors } = useColorSchemeContext();


    return (
        <TouchableOpacity
            onPress={() => playSound(track.uri)}
            accessible
            accessibilityLabel={`Play ${track.filename}`}
            style={styles.container}
        >
            <TouchableOpacity
                onPress={() => {
                    router.push('/profile');
                }}
                accessible
                accessibilityLabel="Go to profile"
            >
                <Image
                    source={{ uri: track.coverUri || 'https://via.placeholder.com/50' }}
                    style={styles.coverImage}
                />
            </TouchableOpacity>
            <View style={styles.textContainer}>
                <Text style={[styles.trackTitle, { color: colors.text }]}>
                    {getFormattedFilename(track.filename)}
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                    <Text style={[styles.artistName, { color: colors.primary }]}>
                        {track.artist || 'Unknown Artist'}
                    </Text>
                    <Text style={[styles.durationText, { color: colors.primary }]}>
                        {formatDuration(track.duration)}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        padding: 10,
        borderRadius: 5,
    },
    coverImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    trackTitle: {
        fontSize: 14,
        fontWeight: '600',
    },
    artistName: {
        fontSize: 10,
        marginTop: 2,
    },
    durationText: {
        fontSize: 9,
        marginTop: 2,
    },
});

export default TrackItem;
