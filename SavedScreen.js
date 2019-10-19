/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  View, TouchableHighlight,
  Text,
  StatusBar, FlatList,
} from 'react-native';
import Warna from './components/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { ScrollView } from 'react-native-gesture-handler';
import BottomNavigation, {
  FullTab,
  Badge,
} from 'react-native-material-bottom-navigation';

class SavedScreen extends React.Component {
  static navigationOptions = {
    title: 'Link Niaga',
    headerStyle: {
      backgroundColor: Warna.primary394,
    },
    headerTintColor: Warna.white,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  state = {
    activeTab: 'gudang'
  }

  handleTabPress = (newTab) => {
    switch (newTab.key) {
      case "etalase": 
        this.props.navigation.navigate('Etalase');
        break;
      case "reseller": 
        this.props.navigation.navigate('Reseller');
        break;      
      case "transaksi": 
        this.props.navigation.navigate('Transaksi');
        break;
    }
  }

  tabs = [
    {
      key: 'gudang',
      icon: 'home',
      iconType: 'AntDesign',
      label: 'Gudang',
      labelStyle: '#ffffff',
      barColor: Warna.primarydark002,
      pressColor: 'rgba(255, 255, 255, 0.16)', // warna ripple
      badgeCount: 1,
      isActive: true,
    },
    {
      key: 'etalase',
      icon: 'tago',
      iconType: 'AntDesign',
      label: 'Etalase',
      labelStyle: '#bdbdbd',
      barColor: Warna.primarydark002,
      pressColor: 'rgba(255, 255, 255, 0.16)',
      badgeCount: 2,
      isActive: false,
    },
    {
      key: 'reseller',
      icon: 'users',
      iconType: 'Feather',
      label: 'Reseller',
      labelStyle: '#bdbdbd',
      barColor: Warna.primarydark002,
      pressColor: 'rgba(255, 255, 255, 0.16)',
      badgeCount: 3,
      isActive: false,
    },
    {
      key: 'transaksi',
      icon: 'shoppingcart',
      label: 'Transaksi',
      labelStyle: '#bdbdbd',
      barColor: Warna.primarydark002,
      pressColor: 'rgba(255, 255, 255, 0.16)',
      badgeCount: 4,
      isActive: false,
      iconType: 'AntDesign',
    }
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
  
  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{ flex: 1, backgroundColor: Warna.lighte8e }}>
          <ScrollView>
            <FlatList
              data={[
                {
                  id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
                  title: 'G-Shock Military',
                  desc: 'Kotak aja, Black',
                  info: 'danger',
                },
                {
                  id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
                  title: 'Entrasol Gold',
                  desc: '500 gr. Coklat',
                  info: 'warning',
                },
                {
                  id: '58694a0f-3da1-471f-bd96-145571e29d72',
                  title: 'Paper Toy',
                  desc: 'Besar, yellow',
                  info: 'success',
                },
              ]}
              renderItem={({item, separators}) => (
                <View style={{ paddingVertical: 10, backgroundColor: 'white', justifyContent: 'space-evenly',
                  flexDirection: 'row', alignItems: 'center' }}
                >
                 <View style={{flex: 3}}>
                    <Text style={{ fontSize: 16 }}>{item.title}</Text>
                    <Text style={{ fontSize: 12 }}>{item.desc}</Text>
                    <View style={{justifyContent: 'space-evenly', flexDirection: 'row', alignItems: 'center'}}>
                      <View style={{ flex: 1 }}>
                        <Text>Ritel: <Text style={{ color: 'red' }}>All area</Text></Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text>Reseller: <Text style={{ color: 'red' }}>Close</Text></Text>
                      </View>
                    </View>
                    <View style={{justifyContent: 'space-evenly', flexDirection: 'row', alignItems: 'center'}}>
                      <View style={{ flex: 1 }}>
                        <Text>Marketing: <Text style={{ color: 'red' }}>Konsinyasi</Text></Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text>Stok: <Text style={{ color: 'red' }}>1000</Text></Text>
                      </View>
                    </View>
                  </View>
                  <TouchableHighlight
                    onPress={() => this._onPress(item)}
                    onShowUnderlay={separators.highlight}
                    onHideUnderlay={separators.unhighlight}
                    style={{flex:1}}
                  >
                    <View>
                      {(item.info === 'danger') ? 
                        <Feather size={24} color='red' name="alert-circle" style={{ textAlign: 'right', marginRight: 12 }} /> : null }
                      {(item.info === 'warning') ? 
                        <AntDesign size={24} color='yellow' name="warning" style={{ textAlign: 'right', marginRight: 12 }} /> : null }
                      {(item.info === 'success') ? 
                        <AntDesign size={24} color='green' name="checksquareo" style={{ textAlign: 'right', marginRight: 12 }} /> : null }
                    </View>
                  </TouchableHighlight>
                </View>
              )}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={() => (
                <View style={{justifyContent: 'space-evenly', flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{flex: 1, borderTopWidth: 1, borderTopColor: Warna.white}} />
                  <View style={{ flex: 4, borderTopWidth: 1, borderTopColor: Warna.lighte8e }} />
                </View>
              )}
            />
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