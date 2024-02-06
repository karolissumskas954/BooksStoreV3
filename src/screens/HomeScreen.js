import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Button,
  FlatList,
  Item,
  ScrollView,
  SafeAreaView,
  StatusBar,
  LogBox
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { COLORS, FONTS, SIZES, icons } from '../../constants';
import { useFonts } from 'expo-font';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/core';

LogBox.ignoreLogs(['fontFamily "Roboto-Regular" is not a system font and has not been loaded through Font.loadAsync.']);
LogBox.ignoreLogs(['fontFamily "Roboto-Bold" is not a system font and has not been loaded through Font.loadAsync.'])
const HomeScreen = () => {

  const [deleteModal, setDeleteModal] = useState(false)
  const [selItem, setSetItem] = useState('')
  const [totPri, setTotPri] = useState(0)
  const [loaded] = useFonts({
    Roboto_Regular: require('../../assets/fonts/Roboto-Regular.ttf'),
    Roboto_Bold: require('../../assets/fonts/Roboto-Bold.ttf'),
    Lufga_Bold: require('../../assets/fonts/Fontspring-DEMO-lufga-bold.otf'),
    Lufga_Regular: require('../../assets/fonts/Fontspring-DEMO-lufga-regular.otf'),
    Lufga_SemiBold: require('../../assets/fonts/Fontspring-DEMO-lufga-semibold.otf'),
    Lufga_Medium: require('../../assets/fonts/Fontspring-DEMO-lufga-medium.otf')
  });

  const categoriesData = [
    {
      id: 0,
      categoryName: "Best Seller",
    },
    {
      id: 1,
      categoryName: "The Latest"
    },
    {
      id: 2,
      categoryName: "Coming Soon"
    },
  ];


  const [blogs, setBlogs] = useState([
    {
      author: 'Katsuhiro',
      pages: '296',
      title: 'Akira, Vol. 2',
      price: '€33,00',
      uri: 'https://www.fujidream.lt/wp-content/uploads/2022/04/91O9TUYe9L-600x856.jpg'
    },
    {
      author: 'Kentaro Miura',
      pages: '224',
      title: 'Berserk, Vol. 26',
      price: '€12,29',
      uri: 'https://www.fujidream.lt/wp-content/uploads/2021/08/91LR4w9B-hL-e1627763254808-600x848.jpg'
    },
    {
      author: 'Gege Akutami',
      pages: '200',
      title: 'Jujutsu Kaisen, Vol. 0',
      price: '€10,29',
      uri: 'https://www.fujidream.lt/wp-content/uploads/2021/08/81EFJlUUAuL-600x900.jpg'
    },

  ])
  const navigation = useNavigation()
  const [categories, setCategory] = React.useState(categoriesData);
  const [selectedCategory, setSelectedCategory] = React.useState(0);

  function renderHeader(profile) {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: SIZES.padding,
        // backgroundColor: COLORS.lightRed ,
        justifyContent: 'space-between'
      }}>
        {/* Greetings */}
        <View style={{ flex: 1 }}>
          <View style={{ marginRight: SIZES.padding }}>
            <Text style={{ fontFamily: 'Lufga_SemiBold', fontSize: 30, color: COLORS.black }}>Books 003</Text>
            <Text style={{ fontFamily: 'Lufga_Regular', fontSize: 18, color: COLORS.darkGray ,paddingLeft: 2}}>Book Store</Text>
          </View>
        </View>
        {/* Log out */}
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.black,
            height: 55,
            width: 55,
            borderRadius: 75,
            marginRight: 5
          }}
        //   onPress={handleSignOut}
        >
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={icons.user_icon}
              style={{ width: 20, height: 20, tintColor: COLORS.white }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.white,
            height: 55,
            width: 55,
            borderRadius: 75,

          }}
        //   onPress={handleSignOut}
        >
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={icons.cart_icon}
              style={{ width: 20, height: 20, tintColor: COLORS.black }}
            />
          </View>
        </TouchableOpacity>

      </View>
    )
  }

  const LineDivider = () => {
    return (
      <View style={{ width: 1, paddingVertical: 18, }}>
        <View style={{ flex: 1, borderLeftColor: COLORS.tone, borderLeftWidth: 1 }}>
        </View>
      </View>
    )
  }

  function renderMyBookSection() {
    return (
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View style={{ paddingHorizontal: 24, flexDirection: 'row' }}>
        </View>
        {/* Books */}
        <View style={{ flex: 1, alignItems: 'center', paddingBottom: 10, shadowColor: '#000',
                  shadowOffset: {width: -2, height: 4},
                  shadowOpacity: 0.29,
                  shadowRadius: 4.65,
                }}>
          <FlatList
            data={blogs}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <View style={{ flex: 1, marginLeft: 24, marginRight: 22}}
                >
                  <Image
                    source={{ uri: item.uri }}
                    resizeMode="cover"
                    style={{ width: SIZES.width - 55, height: 500, borderRadius: 30, zIndex: 1}} />
                  <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 150, backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: 2, borderRadius: 30 }}>
                    <View style={{flexDirection: 'row', paddingLeft: 16, paddingRight: 16, justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                      <View style={{ flex: 1, flexDirection: 'column'}}>
                        <Text style={{ color: COLORS.white, fontFamily: 'Lufga_SemiBold', fontSize: 24 }}>{item.title}</Text>
                      </View>
                      <TouchableOpacity
                        style={{
                          height: 55,
                          width: 55,
                          borderRadius: 75,
                          borderColor: COLORS.white,
                          borderWidth: 1, 
                        }}
                      //   onPress={handleSignOut}
                      >
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                          <Image
                            source={icons.plus_icon}
                            style={{ width: 20, height: 20, tintColor: COLORS.white }}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style ={{ flexDirection: 'row', paddingLeft: 16, paddingRight: 16,  justifyContent: 'center', alignItems: 'center', marginTop:8}}>
                      <View style={{ flex: 1, flexDirection: 'column'}}>
                      <Text style={{ color: COLORS.white, fontFamily: 'Lufga_Regular', fontSize: 16 }}>Author</Text>
                      <Text style={{ color: COLORS.white, fontFamily: 'Lufga_SemiBold', fontSize: 18 }}>{item.author}</Text>
                      </View>
                      <View style={{ flex: 1, flexDirection: 'column' }}>
                      <Text style={{ color: COLORS.white, fontFamily: 'Lufga_Regular', fontSize: 16 }}>Price</Text>
                      <Text style={{ color: COLORS.white, fontFamily: 'Lufga_SemiBold', fontSize: 18 }}>{item.price}</Text>
                      </View>
                      <TouchableOpacity
                        style={{
                          backgroundColor: COLORS.white,
                          height: 55,
                          width: 55,
                          borderRadius: 75,
                        }}
                      //   onPress={handleSignOut}
                      >
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                          <Image
                            source={icons.arrow_icon}
                            style={{ width: 20, height: 20, tintColor: COLORS.black }}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )
            }}
          />
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background, }}>
      {/* <StatusBar barStyle="light-content" /> */}
      <View style={{ height: 90, marginTop: 20, }}>
        {renderHeader('User')}
        {/* {renderButtonSection()} */}
      </View>
      {/* Body section */}
      <ScrollView style={{ margintop: 12 }}>
        {/* My Books section */}
        <View>
          {renderMyBookSection()}
        </View>
        {/* Category section */}
        <View style={{ marginTop: 24 }}>
          <View>
            {/* {renderCategoryHeader()} */}
          </View>
          <View>
            {/* {renderCategoryData()} */}
          </View>
          <View style={{ padding: 8, marginLeft: 12 }}>
            <TouchableOpacity
              testID='moreButton'
              onPress={() => navigation.replace("More")}
            >
              <Text style={{ ...FONTS.body3, color: COLORS.lightGray, alignSelf: 'flex-start', textDecorationLine: 'underline' }}> More Books</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})