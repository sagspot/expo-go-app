import { useRouter } from 'expo-router';
import { Button, Stack, Text, VStack, View } from 'native-base';
import { ImageBackground, StyleSheet } from 'react-native';
import BgImage from '../../../assets/images/busy-street.jpg';

const LandingScreen = () => {
  const { push } = useRouter();

  return (
    <>
      <Stack flex={1} borderTopRadius={50} overflow="hidden">
        <ImageBackground source={BgImage} style={styles.image}>
          <View
            style={StyleSheet.absoluteFillObject}
            bg="primary.400:alpha.80"
          />

          <VStack
            maxW="xs"
            h="full"
            flex={1}
            justifyContent="center"
            p={8}
            space="xl"
          >
            <Text
              fontWeight="600"
              fontSize={48}
              color="white"
              lineHeight="xs"
              maxW={220}
            >
              The landing screen
            </Text>

            <Text color="white" fontSize={16} fontWeight="600" lineHeight="md">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem,
              dignissimos?
            </Text>

            <VStack space={2.5}>
              <Button
                onPress={() => push('/signup')}
                _text={{ color: 'black' }}
                colorScheme="whiteAlpha"
                size="lg"
              >
                NEW ACCOUNT
              </Button>
              <Button
                onPress={() => push('/signin')}
                maxW={116}
                _text={{ color: 'white' }}
                colorScheme="whiteAlpha"
                variant="outline"
                size="lg"
              >
                LOGIN
              </Button>
            </VStack>
          </VStack>
        </ImageBackground>
      </Stack>
    </>
  );
};

const styles = StyleSheet.create({
  image: { flex: 1, resizeMode: 'cover', justifyContent: 'center' },
});

export default LandingScreen;
