import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'theme/colorScheme';

interface DashboardHeaderProps {
  name: string;
}

const DashboardHeader = ({ name }: DashboardHeaderProps) => {
  const { theme } = useTheme();

  return (
    <View className={theme === 'dark' ? 'bg-backgroundDark' : 'bg-backgroundLight'}>
      <View className="flex-row items-center justify-between px-4 py-5">
        {/* Name Section */}
        <View>
          <Text className={`font-inter-regular text-2xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            Hello,
          </Text>
          <Text className={`font-inter-bold text-2xl ${theme === 'dark' ? 'text-textDark' : 'text-textLight'}`}>
            {name}
          </Text>
        </View>

        {/* Notification Button with Badge */}
        <TouchableOpacity className="relative w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 items-center justify-center">
          <Ionicons 
            name="notifications-outline" 
            size={24} 
            color={theme === 'dark' ? '#F3F4F6' : '#1F2937'} 
          />
          <View className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DashboardHeader;