import { useEffect, useState } from 'react';
import { FlatList, Image, TouchableOpacity, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';
import { AdCard, AdCardProps } from '../../components/AdCard';

import { GameParams } from '../../@types/navigation';

import logoImg from '../../assets/logo-nlw-esports.png';

import { styles } from './styles';
import { THEME } from '../../theme';

export function Game() {
  const [ads, setAds] = useState<AdCardProps[]>([]);

  useEffect(() => {
    fetch(`http://10.0.0.106:3333/games/${game.id}/ads`)
    .then(response => response.json())
    .then(data => setAds(data))
  }, []);

  const route = useRoute();
  const game = route.params as GameParams;

  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name='chevron-thin-left'
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image 
            source={logoImg}
            style={styles.logo}
          />

          <View style={styles.right}/>
        </View>

        <Image source={{uri: game.bannerUrl}} style={styles.cover} resizeMode='cover'/>
        
        <Heading
          title={game.title}
          subtitle='Conecte-se e comece a jogar!'
        />

        <FlatList
          data={ads}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <AdCard data={item} onConnect={() => {}}/>
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={[ads.length > 0 ? styles.contentList : styles.emptyListContent]}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>Não há anúncios publicados ainda :(</Text>
          )}
        />
      </SafeAreaView>
    </Background>
  );
}