import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import TrackItem from './TrackItem';
import { ITrack } from '@/functions/types';

interface TrackListProps {
    musicFiles: ITrack[];
    playSound: (uri: string) => void;
}

const TrackList: React.FC<TrackListProps> = ({ musicFiles, playSound }) => (
    <FlatList
        data={musicFiles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <TrackItem track={item} playSound={playSound} />
        )}
        contentContainerStyle={styles.container}
        style={styles.trackList}
    />
);

const styles = StyleSheet.create({
    container: {
        paddingBottom: 20,
    },
    trackList: {
        width: '100%',
        paddingHorizontal: 10,
    },
});

export default TrackList;
