import React, { useState, useCallback } from "react";
import { ReactIcon, Mobilealt, Coffeescript } from "./components/vectorIcon";
import { scale, verticalScale } from "../../scripts/scalingSize";
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function StartScreen() {
  
  const translateX = useSharedValue(0); // изначальная позиция

  // ловим изменение значений ( скролл )
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      translateX.value = event.contentOffset.x;
    },
  });

  const { width: PAGE_WIDTH, height: PAGE_HEIGHT } = Dimensions.get("window"); // делаем фулл экран

  // определяем какой элемент скрола сейчас на экране
  const activeIndex = useDerivedValue(() => {
    return translateX.value / PAGE_WIDTH
  })

  // для действия кнопки next
  const scrollRef = useAnimatedRef()
  // самр действие кнопки которое делает скрол на некст айтем
  const onNextPress = useCallback(() => {
    scrollRef.current.scrollTo({x: PAGE_WIDTH * (activeIndex.value + 1)})
  }, [])

  // Массив информации на этих карточка.

  const infoPicture = [
    {
      id: 0,
      header: "Very cool name",
      mainText:
        "\n\nHere you can place some information or images.\n\nWhy not do it.\n\n\n\nI can write that it doesn't work perfectly, but who writes perfectly?\n\nIn fact, I'm just writing to fill an empty space. If you are a good designer, you can make a picture in the background and get a glass effect or something.\n\n\n\nI really think it's useless, but maybe I could use it.",
      picture: <Coffeescript color={"#FFFFFF"} size={24} />,
    },
    {
      id: 1,
      header: "It's not difficult",
      mainText: "\n\nYou can write this in an evening...\n\nIf you have previously worked with animation or you have iron nerves.\n\n\n\nDo you have a lot of tea and cookies?\n\nIf yes. Then feel free to sit down to watch animations and enjoy life. You're cool!\n\n\nif not. then sit down at the animation anyway. it's a really useful new one. I believe in you.",
      picture: <ReactIcon color={"#FFFFFF"} size={24} />,
    },
    {
      id: 3,
      header: "JS & RN",
      mainText:
        "\n\n\nthis project was created just for the sake of experiencing animation.\n\n\ntherefore, everything is transferred to the app file.\n\n\n\n\nreanimated 2 was used to create the animation\n\n\n\n\n\n\ngood luck and have a nice day.",
      picture: <Mobilealt color={"#FFFFFF"} size={24} />,
    },
  ];

  return (
    <View style={styles.container}>
      <Animated.ScrollView
      ref={scrollRef}
        style={{ flex: 1 }}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        
      >
        {infoPicture.map((infoPicture, id) => {
          const stPicture = useAnimatedStyle(() => {
            const inputRange = [
              (id - 1) * PAGE_WIDTH,
              id * PAGE_WIDTH,
              (id + 1) * PAGE_WIDTH,
            ];
            const progress = interpolate(
              translateX.value,
              inputRange,
              [0, 0, 1],
              Extrapolate.CLAMP
            );
            const scale1 = interpolate(
              translateX.value,
              inputRange,
              [0, 1, 0],
              Extrapolate.CLAMP
            );

            return {
              transform: [{ scale: scale1 }],
            };
          });

          return (
            <View
              key={id.toString()}
              style={{
                width: PAGE_WIDTH,
                height: PAGE_HEIGHT,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Animated.View style={[styles.picture, stPicture]}>
                <Animated.View
                  style={{ alignItems: "center", marginTop: verticalScale(20) }}
                >
                  <Text style={{ color: "#FFF", fontSize: verticalScale(20) }}>
                    {infoPicture.header}
                  </Text>
                </Animated.View>
                <View
                  style={{
                    alignItems: "center",
                    marginTop: verticalScale(20),
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: "#FFF", fontSize: verticalScale(14) }}>
                    {infoPicture.mainText}
                  </Text>
                </View>
              </Animated.View>
            </View>
          );
        })}
      </Animated.ScrollView>
      <View style={styles.footer}>
        <View style={{flexDirection: 'row'}}>
          {infoPicture.map((infoPicture, id) => {

            const rDotStyle = useAnimatedStyle(() => {
              const isActiveR = activeIndex.value === id;
              return {
                backgroundColor: withTiming(isActiveR ? "rgba(255, 255, 255, 0.5)" : "rgba(255, 255, 255, 0.1)"),
              }
            })

            return (
              <Animated.View key={id.toString()}>
                <Animated.View style={[styles.dot, rDotStyle]} />
              </Animated.View>
            );
          })}
        </View>
        <View>
          <Text style={{ color: "#FFF" }}>animation sound</Text>
        </View>
        <TouchableOpacity onPress={onNextPress}>
        <View>
          <Text style={{ color: "#FFF" }}>NEXT</Text>
        </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  picture: {
    flex: 1,
    height: verticalScale(500),
    width: scale(350),
    maxHeight: verticalScale(500),
    maxWidth: scale(350),
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 24,
    padding: 15,
  },
  footer: {
    height: verticalScale(30),
    width: "100%",
    marginBottom: verticalScale(100),
    justifyContent: "space-around",
    flexDirection: "row",
  },
  dot: {
    width: scale(20),
    height: verticalScale(20),
    borderRadius: 50,
    marginHorizontal: 2,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  }
});
