/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  ActivityIndicator, FlatList,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Warna from './components/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import BottomNavigation, {
  FullTab,
  Badge,
} from 'react-native-material-bottom-navigation';
import { DatePicker, Button, ListItem, Left, Right, Body, Icon } from 'native-base';
import Radio from './components/outline-radio';
import { Dropdown } from 'react-native-material-dropdown';
import AsyncStorage from '@react-native-community/async-storage';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.setDate = this.setDate.bind(this);
  }

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
    activeTab: 'dailyflight',
    date: new Date(),
    isArrival: true,
    lang: 'en',
    isCargo: false,
    isLoading: false,
    stringDate: '',
    flightData: [],
  }

  handleTabPress = (newTab) => {
    switch (newTab.key) {
      case "savedflight": 
        this.props.navigation.navigate('Saved');
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
   
  getFlight = () => {
    this.setState({ isLoading: true });
    fetch('https://www.hongkongairport.com/flightinfo-rest/rest/flights/past?date=' + 
      this.state.stringDate + '&arrival=' + this.state.isArrival + 
      '&lang=' + this.state.lang + '&cargo=' + this.state.isCargo)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({ flightData: responseJson[0].list });
          this.setState({ isLoading: false });
        })
        .catch((error) =>{
          console.error(error);
        });
  }

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
 
  setDate(newDate) {
    let month =  newDate.getMonth();
    if (month < 10 ) {
      month = '0' + month;
    }
    let date = newDate.getDate();
    if (date < 10){
      date = '0' + date;
    }
    const stringDate = newDate.getFullYear() + '-' + month + '-' + date;
    this.setState({ date: newDate, stringDate });
  }
  
  setArrival(isArrival) {
    this.setState({ isArrival });
  }

  onLang = (lang) => {
    this.setState({ lang });
  }

  render() {
    const lang = [
      { value: 'en', label: 'English' },
      { value: 'zh_HK', label: 'Hongkong' },
      { value: 'zh_CN', label: 'Cantonese' },
    ];
    const flightData = this.state.flightData;
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{ flex: 1, backgroundColor: Warna.lighte8e }}>
          <ScrollView>
            <View style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'stretch',
              backgroundColor: Warna.lighte8e 
            }}>
              <View style={{ padding: 15, borderRadius: 8, elevation: 2, margin: 10, backgroundColor: 'white' }}>
                <Text style={{ fontSize: 24, color: 'black' }}>Options:</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 15 }}>
                  <Text style={{ marginLeft: 10, marginTop: 3 }}>Flight Date</Text>
                  <DatePicker
                    defaultDate={new Date()}
                    maximumDate={new Date()}
                    locale={"en"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"default"}
                    placeHolderText="Flight Date"
                    textStyle={{ color: "green", borderBottomWidth: 1, padding: 0, marginHorizontal: 15 }}
                    placeHolderTextStyle={{ color: "#d3d3d3", borderBottomWidth: 1, padding: 0, marginHorizontal: 15 }}
                    onDateChange={this.setDate}
                    disabled={false}
                  />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 15 }}>
                  <Text style={{ marginLeft: 10, marginRight: 15 }}>Flight Type</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Radio
                      label="Arrival"
                      checked={this.state.isArrival}
                      onPress={() => this.setState({ isArrival: true })}
                    />
                    <Text style={{ marginHorizontal: 20}}>&nbsp;</Text>
                    <Radio
                      label="Departure"
                      checked={!this.state.isArrival}
                      onPress={() => this.setState({ isArrival: false })}
                    />
                  </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 15 }}>
                  <Text style={{ marginLeft: 10, marginRight: 15, marginTop: 3 }}>Language</Text>
                  <View style={{ flex: 3 }}>
                    <Dropdown
                      data={lang}
                      fontSize={14}
                      style={{}}
                      itemTextStyle={{}}
                      dropdownPosition={-4}
                      onChangeText={this.onLang}
                      dropdownOffset={{ top: 0, left: 0 }}
                    />
                  </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 15 }}>
                  <Text style={{ marginLeft: 10, marginRight: 15 }}>Load Type</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Radio
                      label="Passenger"
                      checked={!this.state.isCargo}
                      onPress={() => this.setState({ isCargo: false })}
                    />
                    <Text style={{ marginHorizontal: 20}}>&nbsp;</Text>
                    <Radio
                      label="Cargo"
                      checked={this.state.isCargo}
                      onPress={() => this.setState({ isCargo: true })}
                    />
                  </View>
                </View>
                <View style={{ marginTop: 15 }}>
                  <Button
                    block
                    onPress={this.getFlight}
                  >
                    <Text style={{ color: 'white' }}>Search</Text>
                  </Button>
                </View>                
              </View>              
              {(this.state.isLoading)
                ? 
                  (
                    <View style={{flex: 1, padding: 20}}>
                      <ActivityIndicator/>
                    </View>
                  )
                : <Text />
              }
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
                    <Right>
                      <Icon active name="save" type="AntDesign" style={{ color: '#2a2a2a' }} 
                        onPress={async () => {
                          await AsyncStorage.setItem('@flightID', JSON.stringify(item));
                          // TODO push more flights
                          // TODO ripple button
                        }}
                      />
                    </Right>
                  </ListItem>
                }
                keyExtractor={item => item.flight[0].no}
                style={{ backgroundColor: 'white' }}
              />
            </View>
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

export default HomeScreen;