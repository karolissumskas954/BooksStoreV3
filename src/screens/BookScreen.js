import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Animated } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS, FONTS, SIZES, icons } from '../../constants';
import { useFonts } from 'expo-font';
// import { db } from '../../firebase';
// import { auth } from '../../firebase';
// import uuid from 'react-native-uuid';

const BookScreen = ({ route, navigation }) => {

  const [loaded] = useFonts({
    Roboto_Regular: require('../../assets/fonts/Roboto-Regular.ttf'),
    Roboto_Bold: require('../../assets/fonts/Roboto-Bold.ttf'),
    Lufga_Bold: require('../../assets/fonts/Fontspring-DEMO-lufga-bold.otf'),
    Lufga_Regular: require('../../assets/fonts/Fontspring-DEMO-lufga-regular.otf'),
    Lufga_SemiBold: require('../../assets/fonts/Fontspring-DEMO-lufga-semibold.otf'),
    Lufga_Medium: require('../../assets/fonts/Fontspring-DEMO-lufga-medium.otf')
  });

  const {
    title,
    uri,
    author,
    description,
    language,
    pages,
    publisher,
    isbn,
    price } = route.params

  const LineDivider = () => {
    return (
      <View style={{ width: 1, paddingVertical: 5, }}>
        <View style={{ flex: 1, borderLeftColor: COLORS.white, borderLeftWidth: 1 }}>
        </View>
      </View>
    )
  }
  const [scrollViewWholeHeight, setscrollViewWholeHeight] = React.useState(1);
  const [scrollViewVisibleHeight, setscrollViewVisibleHeight] = React.useState(0);
  const indicator = new Animated.Value(0);

  function renderBookInfoSection() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={{ uri: uri }}
          resizeMode='cover'
          style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
        />
        {/* Color overlay */}
        <View style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: COLORS.background, opacity: 0.9 }}>
        </View>
        {/* Book cover  */}
        <View style={{ flex: 5, paddingTop: 60, alignItems: 'center' }}>
          <Image
            source={{ uri: uri }}
            resizeMode='contain'
            style={{ flex: 1, width: 180, height: 'auto' }}
          />
        </View>
        {/* Book name and author*/}
        <View style={{ flex: 1.8, alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
          <Text style={{ fontFamily: 'Lufga_Bold', fontSize: 24, color: COLORS.black }}> {title}</Text>
          <Text style={{ fontFamily: 'Lufga_Bold', fontSize: 20, color: COLORS.black }}>{author}</Text>
        </View>
        {/* Book info  */}
        <View style={{ flexDirection: 'column', paddingVertical: 20, margin: 14, borderRadius: 30, backgroundColor: "rgba(0,0,0,0.7)" }}>
          <View style={{ flexDirection: 'row' }}>
            {/* Price  */}
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={{ fontFamily: 'Lufga_Bold', fontSize: 18, color: COLORS.white }}>Price</Text>
              <Text style={{ fontFamily: 'Lufga_Regular', fontSize: 16, color: COLORS.white }}>{price}</Text>
            </View>
            <LineDivider />
            {/* Pages  */}
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={{ fontFamily: 'Lufga_Bold', fontSize: 18, color: COLORS.white }}>Pages</Text>
              <Text style={{ fontFamily: 'Lufga_Regular', fontSize: 16, color: COLORS.white }}>{pages}</Text>
            </View>
            <LineDivider />
            {/* Language */}
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={{ fontFamily: 'Lufga_Bold', fontSize: 18, color: COLORS.white }}>Language</Text>
              <Text style={{ fontFamily: 'Lufga_Regular', fontSize: 16, color: COLORS.white }}>{language}</Text>
            </View>
          </View>

        </View>
      </View>
    )
  }

  function renderBookDescription() {
    const indicatorSize = scrollViewWholeHeight > scrollViewVisibleHeight ?
      scrollViewVisibleHeight * scrollViewVisibleHeight / scrollViewWholeHeight :
      scrollViewVisibleHeight;
  
    const difference = scrollViewVisibleHeight > indicatorSize ?
      scrollViewVisibleHeight - indicatorSize : 1;
  
    return (
      <View style={{ flex: 1, flexDirection: 'row', paddingTop: 10, paddingHorizontal: 10, paddingBottom:20}}>
        {/* Description */}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingLeft: 10 }}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onContentSizeChange={(width, height) => {
            setscrollViewWholeHeight(height);
          }}
          onLayout={({ nativeEvent: { layout: { height } } }) => {
            setscrollViewVisibleHeight(height);
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: indicator } } }],
            { useNativeDriver: false }
          )}
        >
          <Text style={{ fontFamily: 'Lufga_Bold', fontSize: 22, color: COLORS.black, marginBottom: 10 }}>Description</Text>
          <Text style={{ fontFamily: 'Lufga_Regular', fontSize: 20, color: "#64676D" }}>{description}</Text>
        </ScrollView>
        {/* Custom scrollbar */}
        <View style={{ width: 4, height: '100%', backgroundColor: COLORS.white }}>
          <Animated.View
            style={{
              width: 4,
              height: indicatorSize,
              backgroundColor: '#7D7E84',
              transform: [
                {
                  translateY: Animated.multiply(indicator, scrollViewVisibleHeight / scrollViewWholeHeight).interpolate({
                    inputRange: [0, difference],
                    outputRange: [0, difference],
                    extrapolate: 'clamp'
                  })
                }
              ]
            }}
          />
        </View>
      </View>
    );
  }

  function renderBottomButton() {
    const [color, setColor] = useState("#25282F")
    return (
      <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
        {/* BookMark */}
        <View style={{marginLeft: 24}}>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.black,
              height: 55,
              width: 55,
              borderRadius: 75,
              marginRight: 5
            }}
            onPress={() => navigation.goBack()}
          >
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
              <Image
                source={icons.back_icon}
                style={{ width: 20, height: 20, tintColor: COLORS.white }}
              />
            </View>
          </TouchableOpacity>
        </View>
        {/* Buy book  */}
        <TouchableOpacity
          style={{ flex: 1,height: 55, backgroundColor: COLORS.white, marginHorizontal: 8, borderRadius: 30, alignItems: 'center', justifyContent: 'center', marginRight: 24 ,borderWidth: 2}}
        // onPress={()=> writeData()}
        >
          <Text style={{ fontFamily: 'Lufga_Bold', fontSize: 24, color: COLORS.black }}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      {/* Book Cover */}
      <View style={{ flex: 4 }}>
        {renderBookInfoSection()}
      </View>

      {/* Describtion */}
      <View style={{ flex: 2 }}>
        {renderBookDescription()}
      </View>

      <View style={{ height: 70 }}>
        {renderBottomButton()}
      </View>
    </View>
  )
}
export default BookScreen
const styles = StyleSheet.create({})