import { Dimensions } from "react-native";
/* ФУНКЦИЯ КОТОРАЯ ПОЗВОЛЯЕТ ДЕЛАТЬ ВСЕ РАЗМЕРЫ АДАПТИВНЫМИ */

const { width, height } = Dimensions.get("window");
const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];

const guidelineBaseWidth = 428;
const guidelineBaseHeight = 815;

export const scale = (size) => (width / guidelineBaseWidth) * size;
export const verticalScale = (size) => (height / guidelineBaseHeight) * size;
export const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;


