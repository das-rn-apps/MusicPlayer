export const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export const getFormattedFilename = (filename: string) => {
    return filename.length > 30 ? `${filename.slice(0, 27)}...` : filename;
};
