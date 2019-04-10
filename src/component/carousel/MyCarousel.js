import React from "react";
import { View, Dimensions, StyleSheet, Image } from "react-native";

import Carousel, { Pagination } from "react-native-snap-carousel";
import CarouselStyle, { colors } from "../../styles/CarouselStyle";
import { RU } from "../../types";

export default class MyCarousel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: 0
    };
  }
  _renderItem({ item, index }) {
    return (
      <View style={styles.slide}>
        <Image style={styles.image} source={{ uri: `${RU}/pic/800/${item}` }} />
      </View>
    );
  }
  render() {
    return (
      <View>
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          data={this.props.pics}
          renderItem={this._renderItem}
          sliderWidth={Dimensions.get("screen").width - 35}
          itemWidth={Dimensions.get("screen").width - 150}
          onSnapToItem={index => this.setState({ slider1ActiveSlide: index })}
        />
        <Pagination
          dotsLength={this.props.pics.length}
          activeDotIndex={this.state.slider1ActiveSlide}
          containerStyle={CarouselStyle.paginationContainer}
          dotContainerStyle={CarouselStyle.paginationDotContainer}
          dotColor={"rgb(112, 26, 146)"}
          dotStyle={CarouselStyle.paginationDot}
          inactiveDotColor={colors.black}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          carouselRef={this._carousel}
          tappableDots={!!this._carousel}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  slide: {
    height: 160
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
    borderRadius: 5,
    height: 160
  }
});
