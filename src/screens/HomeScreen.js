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
  LogBox,
  TextInput,
  Animated
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { COLORS, FONTS, SIZES, icons } from '../../constants';
import { useFonts } from 'expo-font';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/core';
import Carousel from 'react-native-reanimated-carousel';
import { LinearGradient } from 'expo-linear-gradient';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

LogBox.ignoreLogs(['fontFamily "Roboto-Regular" is not a system font and has not been loaded through Font.loadAsync.']);
LogBox.ignoreLogs(['fontFamily "Roboto-Bold" is not a system font and has not been loaded through Font.loadAsync.'])
const HomeScreen = ({}) => {

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
      categoryName: "Top Rated",
    },
    {
      id: 1,
      categoryName: "Popular Books"
    },
    {
      id: 2,
      categoryName: "Upcoming Books"
    },
  ];


  const [blogs, setBlogs] = useState([
    {
      author: 'Rick Rubin',
      pages: '250',
      title: 'The Creative Act : A Way of Being',
      price: '€21,25',
      uri: 'https://thumb.knygos-static.lt/G6R3hxv-7r8Lm3h1H8H19-JkJG8=/fit-in/0x800/images/books/5371823/9781838858636.jpg',
      language: 'English',
      description: "Many famed music producers are known for a particular sound that has its day and then ages out. Rick Rubin is known for something else: creating a space where artists of all different genres and traditions can home in on who they really are and what they really offer. He has made a practice of helping people transcend their self-imposed expectations in order to reconnect with a state of innocence from which the surprising becomes inevitable."
    },
    {
      author: 'Icy Sedgwick',
      pages: '192',
      title: 'Rebel Folklore',
      price: '€25,30',
      uri: 'https://m.media-amazon.com/images/I/81HqhBWmNGL._SL1500_.jpg',
      language: 'English',
      description: "Rebel Folklore gathers 50 of the darkest and most complicated folktale characters from around the world, showing readers why we should care about the rebels and misfits of ancient stories. Folktales were humble stories, passed down generations by those on the fringes of society: women, peasants, outcast groups. Across the world, these ancient stories are filled with strange characters, complicated figures who hold up a mirror to the world that dreamt them up. From outspoken women cast as witches to anti-authority figures denounced as criminals, flawed heroes to relatable villains, Rebel Folklore celebrates 50 of these misfits and what they mean for us today. Whether it's Muma Padurii, the Romanian forest witch who terrorizes trespassers to protect the environment, the Churel, who stalks unfaithful men on her backwards feet, or Robin Hood, everyone's favourite lawless activist, we can learn a lot from the rebels of days gone by: how to speak out, embrace our flaws, and be unashamedly ourselves - even if that means being a cannibalistic swamp witch."
    },
    {
      author: 'Madeleine Gray',
      pages: '386',
      title: 'Green Dot',
      price: '€18,00',
      uri: 'https://m.media-amazon.com/images/I/81AkR4qgEoL._SL1500_.jpg',
      language: 'English',
      description: "Rebel Folklore gathers 50 of the darkest and most complicated folktale characters from around the world, showing readers why we should care about the rebels and misfits of ancient stories. Folktales were humble stories, passed down generations by those on the fringes of society: women, peasants, outcast groups. Across the world, these ancient stories are filled with strange characters, complicated figures who hold up a mirror to the world that dreamt them up. From outspoken women cast as witches to anti-authority figures denounced as criminals, flawed heroes to relatable villains, Rebel Folklore celebrates 50 of these misfits and what they mean for us today. Whether it's Muma Padurii, the Romanian forest witch who terrorizes trespassers to protect the environment, the Churel, who stalks unfaithful men on her backwards feet, or Robin Hood, everyone's favourite lawless activist, we can learn a lot from the rebels of days gone by: how to speak out, embrace our flaws, and be unashamedly ourselves - even if that means being a cannibalistic swamp witch."
    },
    {
      author: 'Rebecca Yarros',
      pages: '620',
      title: 'Iron Flame',
      price: '€21,60',
      uri: 'https://m.media-amazon.com/images/I/912fTvsUKLL._SL1500_.jpg',
      language: 'English',
      description: "Rebel Folklore gathers 50 of the darkest and most complicated folktale characters from around the world, showing readers why we should care about the rebels and misfits of ancient stories. Folktales were humble stories, passed down generations by those on the fringes of society: women, peasants, outcast groups. Across the world, these ancient stories are filled with strange characters, complicated figures who hold up a mirror to the world that dreamt them up. From outspoken women cast as witches to anti-authority figures denounced as criminals, flawed heroes to relatable villains, Rebel Folklore celebrates 50 of these misfits and what they mean for us today. Whether it's Muma Padurii, the Romanian forest witch who terrorizes trespassers to protect the environment, the Churel, who stalks unfaithful men on her backwards feet, or Robin Hood, everyone's favourite lawless activist, we can learn a lot from the rebels of days gone by: how to speak out, embrace our flaws, and be unashamedly ourselves - even if that means being a cannibalistic swamp witch."
    },
    {
      author: 'David Shrier',
      pages: '250',
      title: 'Basic AI',
      price: '€16,00',
      uri: 'https://m.media-amazon.com/images/I/71d0LQqNrbL._SL1500_.jpg',
      language: 'English',
      description: "Rebel Folklore gathers 50 of the darkest and most complicated folktale characters from around the world, showing readers why we should care about the rebels and misfits of ancient stories. Folktales were humble stories, passed down generations by those on the fringes of society: women, peasants, outcast groups. Across the world, these ancient stories are filled with strange characters, complicated figures who hold up a mirror to the world that dreamt them up. From outspoken women cast as witches to anti-authority figures denounced as criminals, flawed heroes to relatable villains, Rebel Folklore celebrates 50 of these misfits and what they mean for us today. Whether it's Muma Padurii, the Romanian forest witch who terrorizes trespassers to protect the environment, the Churel, who stalks unfaithful men on her backwards feet, or Robin Hood, everyone's favourite lawless activist, we can learn a lot from the rebels of days gone by: how to speak out, embrace our flaws, and be unashamedly ourselves - even if that means being a cannibalistic swamp witch."
    },
    {
      author: 'Russell Norman',
      pages: '320',
      title: 'Brutto',
      price: '€35,00',
      uri: 'https://m.media-amazon.com/images/I/71mTm0CPoYL._SL1500_.jpg',
      language: 'English',
      description: "Rebel Folklore gathers 50 of the darkest and most complicated folktale characters from around the world, showing readers why we should care about the rebels and misfits of ancient stories. Folktales were humble stories, passed down generations by those on the fringes of society: women, peasants, outcast groups. Across the world, these ancient stories are filled with strange characters, complicated figures who hold up a mirror to the world that dreamt them up. From outspoken women cast as witches to anti-authority figures denounced as criminals, flawed heroes to relatable villains, Rebel Folklore celebrates 50 of these misfits and what they mean for us today. Whether it's Muma Padurii, the Romanian forest witch who terrorizes trespassers to protect the environment, the Churel, who stalks unfaithful men on her backwards feet, or Robin Hood, everyone's favourite lawless activist, we can learn a lot from the rebels of days gone by: how to speak out, embrace our flaws, and be unashamedly ourselves - even if that means being a cannibalistic swamp witch."
    },
    {
      author: 'Juan Gomez',
      pages: '500',
      title: 'Red Queen',
      price: '€11,70',
      uri: 'https://m.media-amazon.com/images/I/71IGFdWz4WL._SL1500_.jpg',
      language: 'English',
      description: "Rebel Folklore gathers 50 of the darkest and most complicated folktale characters from around the world, showing readers why we should care about the rebels and misfits of ancient stories. Folktales were humble stories, passed down generations by those on the fringes of society: women, peasants, outcast groups. Across the world, these ancient stories are filled with strange characters, complicated figures who hold up a mirror to the world that dreamt them up. From outspoken women cast as witches to anti-authority figures denounced as criminals, flawed heroes to relatable villains, Rebel Folklore celebrates 50 of these misfits and what they mean for us today. Whether it's Muma Padurii, the Romanian forest witch who terrorizes trespassers to protect the environment, the Churel, who stalks unfaithful men on her backwards feet, or Robin Hood, everyone's favourite lawless activist, we can learn a lot from the rebels of days gone by: how to speak out, embrace our flaws, and be unashamedly ourselves - even if that means being a cannibalistic swamp witch."
    },
    {
      author: 'Olivie Blake',
      pages: '560',
      title: 'The Atlas Paradox',
      price: '€11,70',
      uri: 'https://m.media-amazon.com/images/I/81ljNfBo4NL._SL1500_.jpg',
      language: 'English',
      description: "Rebel Folklore gathers 50 of the darkest and most complicated folktale characters from around the world, showing readers why we should care about the rebels and misfits of ancient stories. Folktales were humble stories, passed down generations by those on the fringes of society: women, peasants, outcast groups. Across the world, these ancient stories are filled with strange characters, complicated figures who hold up a mirror to the world that dreamt them up. From outspoken women cast as witches to anti-authority figures denounced as criminals, flawed heroes to relatable villains, Rebel Folklore celebrates 50 of these misfits and what they mean for us today. Whether it's Muma Padurii, the Romanian forest witch who terrorizes trespassers to protect the environment, the Churel, who stalks unfaithful men on her backwards feet, or Robin Hood, everyone's favourite lawless activist, we can learn a lot from the rebels of days gone by: how to speak out, embrace our flaws, and be unashamedly ourselves - even if that means being a cannibalistic swamp witch."
    },
    {
      author: 'Katsuhiro',
      pages: '296',
      title: 'Akira, Vol. 2',
      price: '€33,00',
      uri: 'https://www.fujidream.lt/wp-content/uploads/2022/04/91O9TUYe9L-600x856.jpg',
      language: 'English',
      description: "Rebel Folklore gathers 50 of the darkest and most complicated folktale characters from around the world, showing readers why we should care about the rebels and misfits of ancient stories. Folktales were humble stories, passed down generations by those on the fringes of society: women, peasants, outcast groups. Across the world, these ancient stories are filled with strange characters, complicated figures who hold up a mirror to the world that dreamt them up. From outspoken women cast as witches to anti-authority figures denounced as criminals, flawed heroes to relatable villains, Rebel Folklore celebrates 50 of these misfits and what they mean for us today. Whether it's Muma Padurii, the Romanian forest witch who terrorizes trespassers to protect the environment, the Churel, who stalks unfaithful men on her backwards feet, or Robin Hood, everyone's favourite lawless activist, we can learn a lot from the rebels of days gone by: how to speak out, embrace our flaws, and be unashamedly ourselves - even if that means being a cannibalistic swamp witch."
    },
    {
      author: 'Kentaro Miura',
      pages: '226',
      title: 'Berserk, Vol. 26',
      price: '€12,29',
      uri: 'https://www.fujidream.lt/wp-content/uploads/2021/08/91LR4w9B-hL-e1627763254808-600x848.jpg',
      language: 'English',
      description: "Rebel Folklore gathers 50 of the darkest and most complicated folktale characters from around the world, showing readers why we should care about the rebels and misfits of ancient stories. Folktales were humble stories, passed down generations by those on the fringes of society: women, peasants, outcast groups. Across the world, these ancient stories are filled with strange characters, complicated figures who hold up a mirror to the world that dreamt them up. From outspoken women cast as witches to anti-authority figures denounced as criminals, flawed heroes to relatable villains, Rebel Folklore celebrates 50 of these misfits and what they mean for us today. Whether it's Muma Padurii, the Romanian forest witch who terrorizes trespassers to protect the environment, the Churel, who stalks unfaithful men on her backwards feet, or Robin Hood, everyone's favourite lawless activist, we can learn a lot from the rebels of days gone by: how to speak out, embrace our flaws, and be unashamedly ourselves - even if that means being a cannibalistic swamp witch."
    },
    {
      author: 'Gege Akutami',
      pages: '200',
      title: 'Jujutsu Kaisen, Vol. 0',
      price: '€10,29',
      uri: 'https://www.fujidream.lt/wp-content/uploads/2021/08/81EFJlUUAuL-600x900.jpg',
      language: 'English',
      description: "Rebel Folklore gathers 50 of the darkest and most complicated folktale characters from around the world, showing readers why we should care about the rebels and misfits of ancient stories. Folktales were humble stories, passed down generations by those on the fringes of society: women, peasants, outcast groups. Across the world, these ancient stories are filled with strange characters, complicated figures who hold up a mirror to the world that dreamt them up. From outspoken women cast as witches to anti-authority figures denounced as criminals, flawed heroes to relatable villains, Rebel Folklore celebrates 50 of these misfits and what they mean for us today. Whether it's Muma Padurii, the Romanian forest witch who terrorizes trespassers to protect the environment, the Churel, who stalks unfaithful men on her backwards feet, or Robin Hood, everyone's favourite lawless activist, we can learn a lot from the rebels of days gone by: how to speak out, embrace our flaws, and be unashamedly ourselves - even if that means being a cannibalistic swamp witch."
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
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.white,
              height: 55,
              width: 55,
              borderRadius: 75,
              marginRight: 5
            }}
          onPress={() => navigation.toggleDrawer()}
          >
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Image
                source={icons.menu_icon}
                style={{ width: 20, height: 20, tintColor: COLORS.black }}
              />
            </View>
          </TouchableOpacity>

          {/* Search bar */}

          {/* <SafeAreaView style={{flex: 1, marginTop: 5}}>
          <TextInput style={{height: 45, padding:10, marginRight: 10, marginLeft: 5, borderRadius: 75, backgroundColor: COLORS.lightGray3}} />
        </SafeAreaView> */}



          {/* <View style={{ marginRight: SIZES.padding }}>
            <Text style={{ fontFamily: 'Lufga_SemiBold', fontSize: 30, color: COLORS.black }}>Books 003</Text>
            <Text style={{ fontFamily: 'Lufga_Regular', fontSize: 18, color: COLORS.darkGray, paddingLeft: 2 }}>Book Store</Text>
          </View> */}
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





  function renderMyBookSection() {
    return (
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View style={{ paddingHorizontal: 24, flexDirection: 'row' }}>
        </View>
        {/* Books */}
        <View style={{
          flex: 1, alignItems: 'center', paddingBottom: 10, shadowColor: '#000',
          shadowOffset: { width: -2, height: 4 },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,
        }}>
          <FlatList
            data={blogs.slice(0, 6)}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <View style={{ flex: 1, marginLeft: 24, marginRight: 22 }}
                >
                  <Image
                    source={{ uri: item.uri }}
                    resizeMode="cover"
                    style={{ width: SIZES.width - 55, height: 500, borderRadius: 30, zIndex: 1 }} />
                  <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 150, backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: 2, borderRadius: 30 }}>
                    <View style={{ flexDirection: 'row', paddingLeft: 16, paddingRight: 16, justifyContent: 'center', alignItems: 'center', marginTop: 12 }}>
                      <View style={{ flex: 1, flexDirection: 'column' }}>
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
                    <View style={{ flexDirection: 'row', paddingLeft: 16, paddingRight: 16, justifyContent: 'center', alignItems: 'center', marginTop: 8, paddingBottom: 2 }}>
                      <View style={{ flex: 3, flexDirection: 'column' }}>
                        <Text style={{ color: COLORS.white, fontFamily: 'Lufga_Regular', fontSize: 16 }}>Author</Text>
                        <Text style={{ color: COLORS.white, fontFamily: 'Lufga_SemiBold', fontSize: 18 }}>{item.author}</Text>
                      </View>
                      <View style={{ flex: 2, flexDirection: 'column', marginLeft: 10 }}>
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
                        onPress={() => navigation.navigate("Book", item)}
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


  const [selectedCarouselItem, setSelectedCarouselItem] = React.useState(0);
  function renderOffers() {
    return (
      <View style={{ flex: 1, paddingBottom: 20 }}>
        <Carousel
          loop

          width={SIZES.width}
          height={SIZES.width / 2.3}
          // autoPlay={true}
          data={[...new Array(4).keys()]}
          scrollAnimationDuration={1000}
          pagingEnabled={true}
          snapEnabled={true}
          onSnapToItem={(index) => setSelectedCarouselItem(index)}
          renderItem={({ index }) => (
            <View
              style={{
                flex: 1,
                // borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <LinearGradient
                colors={index == 0 ? ['#555555', '#333333'] : index == 1 ? ['#cb356b', '#bd3f32'] : index == 2 ? ['#3a1c71', '#d76d77', '#ffaf7b'] : index == 3 ? ['#283c86', '#45a247'] : ['#36d1dc', '#5b86e5']}
                style={{ width: 370, height: 170, borderRadius: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'column', paddingTop: 18, paddingLeft: 14 }}>
                    <Text style={{ color: COLORS.white, fontFamily: 'Lufga_SemiBold', fontSize: 22, maxWidth: 300 }}>Get 20€ Off On Your Favorite Books.</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', position: 'absolute', bottom: 55, marginLeft: 14 }}>
                      <TouchableOpacity
                        style={{ paddingHorizontal: 12, paddingVertical: 8, backgroundColor: COLORS.white, borderRadius: 20 }}
                      >
                        <Text style={{ color: COLORS.black, fontFamily: 'Lufga_SemiBold', fontSize: 16 }}>ORDER NOW</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Image
                    source={icons.book}
                    style={{ width: 150, height: 200, tintColor: COLORS.white }}
                  />
                </View>
              </LinearGradient>

            </View>
          )}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 5 }}>
          <Image
            source={icons.minus_icon}
            style={{ width: 30, height: 20, tintColor: selectedCarouselItem == 0 ? COLORS.black : COLORS.lightGray4 }}
          />
          <Image
            source={icons.minus_icon}
            style={{ width: 30, height: 20, tintColor: selectedCarouselItem == 1 ? COLORS.black : COLORS.lightGray4 }}
          />
          <Image
            source={icons.minus_icon}
            style={{ width: 30, height: 20, tintColor: selectedCarouselItem == 2 ? COLORS.black : COLORS.lightGray4 }}
          />
          <Image
            source={icons.minus_icon}
            style={{ width: 30, height: 20, tintColor: selectedCarouselItem == 3 ? COLORS.black : COLORS.lightGray4 }}
          />
        </View>
      </View>
    );
  }

  function renderCategoryHeader() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginLeft: 20 }}>
        <FlatList
          data={categoriesData}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={{ marginRight: 24 }}
              onPress={() => setSelectedCategory(item.id)}
            >
              {
                selectedCategory == item.id &&
                <Text style={{ fontFamily: 'Lufga_SemiBold', fontSize: 16, color: COLORS.black, textDecorationLine: 'underline' }}>{item.categoryName}</Text>
              }
              {
                selectedCategory != item.id &&
                <Text style={{ fontFamily: 'Lufga_SemiBold', fontSize: 16, color: COLORS.lightGray }}>{item.categoryName}</Text>
              }
            </TouchableOpacity>
          )}
        />
      </View>
    )
  }

  function renderCategoryData() {
    var start = 0
    var end = 4
    if (selectedCategory == 1) {
      start = 0
      end = 4
    } else if (selectedCategory == 0) {
      start = 4
      end = 8

    } else if (selectedCategory == 2) {
      start = 8
      end = 12
    }
    return (
      <View style={{ flex: 1, marginTop: 12, paddingLeft: 24 }}>
        <FlatList
          data={blogs.slice(start, end)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={{ marginVertical: 8 }}>
              <TouchableOpacity
                style={{ flex: 1, flexDirection: 'row' }}
              onPress={() => navigation.navigate("Book", item)}
              >
                {/* Book cover  */}
                <Image
                  source={{ uri: item.uri }}
                  resizeMode='cover'
                  style={{ width: 100, height: 130, borderRadius: 10 }}
                />
                <View style={{ flex: 1, marginLeft: 12, flexDirection: 'column' }}>
                  {/* Book name and author  */}
                  <View>
                    <Text style={{ paddingRight: SIZES.padding, fontFamily: 'Lufga_Bold', fontSize: 22, color: COLORS.black, marginTop: 5 }}>{item.title}</Text>
                    <Text style={{ fontFamily: 'Lufga_Bold', fontSize: 16, color: COLORS.lightGray, marginTop: 5 }}>{item.author}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                      {/* <Image source={icons.bookClosed_icon}
                        style={{ width: 20, height: 20, tintColor: COLORS.black, marginTop: 2 }}
                      /> */}
                      {/* <Text style={{ fontFamily: 'Lufga_Regular', fontSize: 18, color: COLORS.black}}>{item.price}</Text> */}
                    </View>
                    {/* <View style={{ flexDirection: 'row', marginTop: 3 }}>
                      <Image source={icons.language_icon}
                        style={{ width: 25, height: 20, tintColor: COLORS.black, marginTop: 2 }}
                      />
                      <Text style={{ fontFamily: 'Lufga_Regular', fontSize: 18, color: COLORS.black, marginBottom: 5, marginLeft: 5 }}>{item.language}</Text>
                    </View> */}
                  </View>
                  {/* Data  */}
                  <View style={{ position: 'absolute', bottom: 10 }}>
                    <View style={{ flexDirection: 'column' }}>
                      <Text style={{ fontFamily: 'Lufga_Regular', fontSize: 18, color: COLORS.black }}>
                        {item.price}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
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
        <View >
          {renderOffers()}
        </View>
        {/* My Books section */}
        <View style={{ paddingLeft: 24, paddingBottom: 16 }}>
          <Text style={{ color: COLORS.black, fontFamily: 'Lufga_SemiBold', fontSize: 22, marginLeft: 2 }}>Trending</Text>
        </View>
        <View>
          {renderMyBookSection()}
        </View>
        {/* Category section */}
        <View style={{ marginTop: 24 }}>
          <View>
            {renderCategoryHeader()}
          </View>
          <View>
            {renderCategoryData()}
          </View>
          <View style={{ padding: 8, marginLeft: 12 }}>
            {/* <TouchableOpacity
              testID='moreButton'
              onPress={() => navigation.replace("More")}
            >
              <Text style={{ ...FONTS.body3, color: COLORS.lightGray, alignSelf: 'flex-start', textDecorationLine: 'underline' }}> More Books</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})