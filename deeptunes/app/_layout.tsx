import * as React from 'react';
import { Slot } from 'expo-router';
import { ColorSchemeProvider } from '@/hooks/ColorSchemeContext';

export default function Root() {
    return (
        <ColorSchemeProvider>
            <Slot />
        </ColorSchemeProvider>
    );
}
