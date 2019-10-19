/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar, FlatList,
} from 'react-native';
import Warna from './components/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import BottomNavigation, {
  FullTab,
  Badge, 
} from 'react-native-material-bottom-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import { ListItem, Left, Right, Body, Button } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';

class SavedScreen extends React.Component {
  static navigationOptions = {
    title: 'Hongkong Flight Info',
    headerStyle: {
      backgroundColor: Warna.primary394,
    },
    headerTintColor: Warna.white,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  state = {
    flightData: [],
    activeTab: 'savedflight'
  }

  handleTabPress = (newTab) => {
    switch (newTab.key) {
      case "dailyflight": 
        this.props.navigation.navigate('Home');
        break;
    }
  }

  tabs = [
    {
      key: 'dailyflight',
      icon: 'calendar',
      iconType: 'AntDesign',
      label: 'Daily Flight',
      labelStyle: '#ffffff',
      barColor: Warna.primarydark002,
      pressColor: 'rgba(255, 255, 255, 0.16)',
      badgeCount: 0,
      isActive: true,
    },
    {
      key: 'savedflight',
      icon: 'save',
      iconType: 'AntDesign',
      label: 'Saved Flight',
      labelStyle: '#bdbdbd',
      barColor: Warna.primarydark002,
      pressColor: 'rgba(255, 255, 255, 0.16)',
      badgeCount: 2, // TODO get saved flight push notification
      isActive: false,
    },
  ];

  renderBadge = badgeCount => () =>{
    return <Badge>{badgeCount}</Badge>;
  }

  renderIcon = (iconName) => () => {
    if (iconName === 'users' ) {
      return <Feather size={20} color='#bdbdbd' name={iconName} />;
    }
    if (iconName === 'home') {
      return <AntDesign size={24} color={ Warna.white } name={iconName} />;
    }
    return <AntDesign size={20} color='#bdbdbd' name={iconName} />;
  }

  renderTab = ({ tab, isActive }) => {
    return (
      <FullTab
        showBadge={tab.badgeCount > 0}
        renderBadge={this.renderBadge(tab.badgeCount)}
        key={tab.key}
        isActive={isActive}
        label={tab.label}
        renderIcon={this.renderIcon(tab.icon)}
      />
    );
  }

  info = (info) => {
    return (
      <View style={{
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      }}
      >
        <Text style={{
          fontSize: 32,
        }}>{info}</Text>
      </View>
    );
  }
  
  async componentDidMount() {
    const savedFlightStr = await AsyncStorage.getItem('@flightID');
    if(savedFlightStr !== null) {
      const savedFlights = await JSON.parse(savedFlightStr);
      this.setState({flightData: [savedFlights]});
    }
  }

  render() {
    const flightData = this.state.flightData; 
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{ flex: 1, backgroundColor: Warna.lighte8e }}>
          <ScrollView>
            <FlatList
              data={flightData}
              renderItem={({ item }) => 
                <ListItem thumbnail style={{ backgroundColor: 'white' }}>
                  <Left>
                    <Text> {item.stand} </Text>
                  </Left>
                  <Body>
                    <Text>Time: {item.time} {item.statusCode} {item.status}</Text>
                    <Text note numberOfLines={3}>Terminal: {item.terminal} &nbsp;&nbsp;Baggage: {item.baggage} &nbsp;&nbsp;
                    Hall: {item.hall} &nbsp;&nbsp;Origin: {item.origin[0]} </Text>
                  </Body>
                  <Right />
                </ListItem>
              }
              keyExtractor={item => item.flight[0].no}
              style={{ backgroundColor: 'white' }}
            />
            <Button
              warning
              block
              style={{ marginHorizontal: 25, marginVertical: 25  }}
              onPress={async () => {
                try {
                  await AsyncStorage.clear();
                  this.setState({ flightData: []});
                } catch(e) {
                  console.log(e);
                }
              }}
            >
              <Text>Clear Saved Flight</Text>
            </Button>
          </ScrollView>
          <View>
            <BottomNavigation
              activeTab={this.state.activeTab}
              onTabPress={this.handleTabPress}
              renderTab={this.renderTab}
              tabs={this.tabs}
            />
          </View>
        </SafeAreaView>
      </Fragment>
    );
  }
}

export default SavedScreen;