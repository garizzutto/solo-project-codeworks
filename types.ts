export type Color = {
  colorName: string;
  hexCode: string;
};

export type StackTypeParamList = {
  Home: {
    titles: Array<string>;
    colors: Array<Array<Color>>;
  };
  Colors: {
    colors: Array<Color>;
    title: string;
  };
};
