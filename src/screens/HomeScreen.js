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
        Lufga_Bold: require('../../assets/fonts/Fontspring-DEMO-lufga-bold.otf')
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


    const [blogs, setBlogs] = useState([])
    const navigation = useNavigation()
    const [categories, setCategory] = React.useState(categoriesData);
    const [selectedCategory, setSelectedCategory] = React.useState(0);




    function renderHeader(profile) {
        return (
          <View style={{
            flex: 1,
            flexDirection: 'row',
            paddingHorizontal: SIZES.padding,
            alignItems: 'center'
          }}>
            {/* Greetings */}
            <View style={{ flex: 1 }}>
              <View style={{ marginRight: SIZES.padding }}>
                <Text style={{ fontFamily: 'Lufga_Bold', fontSize: 22, color: COLORS.black}}>Welcome</Text>
                {/* <Text style={{ fontFamily: 'Roboto_Bold', fontSize: 22, color: COLORS.tone }}>{profile}</Text> */}
              </View>
            </View>
            {/* Log out */}
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.primary,
                height: 40,
                paddingLeft: 3,
                paddingRight: SIZES.radius,
                borderRadius: 20
              }}
            //   onPress={handleSignOut}
            >
              <View
                style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
              >
                <View style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 25, backgroundColor: COLORS.tone }}>
                  <Image
                    source={icons.logout_icon}
                    resizeMode="contain"
                    style={{ width: 20, height: 20, marginLeft: 5, tintColor: COLORS.white }}
                  />
                </View>
                <Text style={{ marginLeft: SIZES.base, color: COLORS.white, fontFamily: 'Roboto_Regular', fontSize: 16, }}>Log Out</Text>
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

      function renderButtonSection() {
        return (
          <View
            style={{ flex: 1, justifyContent: 'center', padding: SIZES.padding }}
          >
            <StatusBar barStyle="light-content" />
            <View style={{ flexDirection: 'row', height: 70, backgroundColor: COLORS.primary, borderRadius: SIZES.radius }}>
              {/* Add book */}
              <TouchableOpacity
                testID='addButton'
                style={{ flex: 1 }}
                // onPress={() => navigation.replace("AtCounter")}
                >
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <Image
                    source={icons.add_icon}
                    resizeMode="contain"
                    style={{ width: 25, height: 25, tintColor: COLORS.white }}
                  />
                  <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontFamily: 'Roboto_Regular', fontSize: 14, color: COLORS.white }}>  Check Out</Text>
                    <Text style={{ fontFamily: 'Roboto_Regular', fontSize: 14, color: COLORS.white }}>  €{totPri}</Text>
                  </View>
                </View>
              </TouchableOpacity>
              {/* Line Divider */}
              <LineDivider />
              {/* all books */}
              <TouchableOpacity
                testID='allBooksButton'
                style={{ flex: 1 }}
                // onPress={() => navigation.replace("More")}
                >
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <Image
                    source={icons.book_icon}
                    resizeMode="contain"
                    style={{ width: 25, height: 25, tintColor: COLORS.white }}
                  />
                  <Text style={{ fontFamily: 'Roboto_Regular', fontSize: 14, color: COLORS.white }}>  All Books</Text>
                </View>
              </TouchableOpacity>
              {/* Line Divider */}
              <LineDivider />
              {/* Scanner */}
              <TouchableOpacity
                testID='scanButton'
                style={{ flex: 1 }}
                // onPress={() => navigation.navigate("Scan")}
                >
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <Image
                    source={icons.scan_icon}
                    resizeMode="contain"
                    style={{ width: 30, height: 30, tintColor: COLORS.white }}
                  />
                  <Text style={{ fontFamily: 'Roboto_Regular', fontSize: 14, color: COLORS.white }}> Scan book</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )
      }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
        <View style={{ height: 200 }}>
          {renderHeader('User')}
          {renderButtonSection()}
        </View>
        {/* Body section */}
        <ScrollView style={{ margintop: 12 }}>
          {/* My Books section */}
          <View>
            {/* {renderMyBookSection()} */}
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