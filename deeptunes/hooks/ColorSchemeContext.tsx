import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme as useSystemColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';

interface ColorSchemeContextType {
    colors: typeof Colors['light'] | typeof Colors['dark'];
    toggleColorScheme: () => void;
}

const ColorSchemeContext = createContext<ColorSchemeContextType | undefined>(undefined);

export const ColorSchemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const systemColorScheme = useSystemColorScheme();
    const [colorScheme, setColorScheme] = useState<'light' | 'dark'>(
        systemColorScheme === 'dark' ? 'dark' : 'light'
    );

    useEffect(() => {
        const loadColorScheme = async () => {
            const savedColorScheme = await AsyncStorage.getItem('colorScheme');
            if (savedColorScheme) {
                setColorScheme(savedColorScheme as 'light' | 'dark');
            }
        };
        loadColorScheme();
    }, []);

    useEffect(() => {
        const saveColorScheme = async () => {
            await AsyncStorage.setItem('colorScheme', colorScheme);
        };
        saveColorScheme();
    }, [colorScheme]);

    const colors = Colors[colorScheme];

    const toggleColorScheme = () => {
        setColorScheme((prevScheme) => (prevScheme === 'dark' ? 'light' : 'dark'));
    };

    return (
        <ColorSchemeContext.Provider value={{ colors, toggleColorScheme }}>
            {children}
        </ColorSchemeContext.Provider>
    );
};

export const useColorSchemeContext = () => {
    const context = useContext(ColorSchemeContext);
    if (context === undefined) {
        throw new Error('useColorSchemeContext must be used within a ColorSchemeProvider');
    }
    return context;
};
