import React from 'react';
import { Image, StyleSheet } from 'react-native';

interface CoverImageProps {
    uri: string | null;
}

const CoverImage: React.FC<CoverImageProps> = ({ uri }) => (
    uri ? (
        <Image
            source={{ uri }}
            style={styles.coverImage}
            resizeMode="cover"
        />
    ) : null
);

const styles = StyleSheet.create({
    coverImage: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
        borderColor: '#ccc',
        borderWidth: 1,
    },
});

export default CoverImage;
