export interface ITrack {
    albumId?: string;
    creationTime: number;
    duration: number;
    filename: string;
    height: number;
    id: string;
    mediaType: string;
    modificationTime: number;
    uri: string;
    width: number;
    coverUri?: string;
    artist?: string;
}

export interface TrackItemProps {
    track: ITrack
    playSound: (uri: string) => void;
}