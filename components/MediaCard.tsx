import React from "react";
import { Image, View } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../constants/size";

import { Video, ResizeMode } from "expo-av";
import { useState, useRef } from "react";

export type MediaCardProps = {
  url: string;
};

// HERE I NEED TO CONDITIONAL VIDEO OR IMAGE RENDERING
const MediaCard = (props: MediaCardProps) => {
  const video = useRef(null);
  const [status, setStatus] = useState<any>({});
  return (
    <View>
      {props.url.includes(".mp4") ? (
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: props.url,
          }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping={true}
          onPlaybackStatusUpdate={(status: any) => setStatus(() => status)}
        />
      ) : (
        <Image
          style={{
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT / 2,
            resizeMode: "cover",
          }}
          source={{
            uri: props.url,
          }} /*require path is for static images only*/
        />
      )}
    </View>
  );
};

export default MediaCard;

const styles = {
  video: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 2,
  },
};
