// expo-music-info.d.ts
declare module 'expo-music-info' {
    export function getMusicInfoAsync(
        uri: string,
        options: {
            title?: boolean;
            artist?: boolean;
            album?: boolean;
            genre?: boolean;
            picture?: boolean;
        }
    ): Promise<{
        title?: string;
        artist?: string;
        album?: string;
        genre?: string;
        picture?: string;
    }>;
}
