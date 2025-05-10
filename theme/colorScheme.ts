import { useColorScheme} from "react-native";
import {useState, useEffect} from 'react';

import AsyncStorage from "@react-native-async-storage/async-storage";


type  ThemeType = 'light' | 'dark';

export const useTheme = () => {
    const systemTheme= useColorScheme();
    const [theme, setTheme]= useState<ThemeType>('light');
    const [isReady, setIsReady] = useState<boolean>(false);


    useEffect(() => {
        const loadStoredTheme  = async () => {
            const storedTheme = await AsyncStorage.getItem('theme');
            if (storedTheme) {
                setTheme(storedTheme as ThemeType);
            } else {
                setTheme(systemTheme === 'dark' ? 'dark' : 'light')
            }
            setIsReady(true)
        };
        loadStoredTheme();
    }, [systemTheme])

    const toggleTheme = async () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        await AsyncStorage.setItem('theme', newTheme);
    };
    
    return {theme, toggleTheme, isReady};
};

