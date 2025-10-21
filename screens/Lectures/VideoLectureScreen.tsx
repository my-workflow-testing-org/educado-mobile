import { useState, useEffect, useRef } from "react";
import { View, TouchableOpacity, Alert, Text } from "react-native";
import { Video, ResizeMode } from 'expo-av';
import PropTypes from "prop-types";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { completeComponent, handleLastComponent } from "@/services/utils";
import { getVideoURL } from "@/services/storage-service";
import { Lecture} from "@/types/lecture";
import { Course } from "@/types/course";

interface VideoLectureScreenProps {
  lectureObject: Lecture;
  courseObject: Course;
  isLastSlide: boolean;
  onContinue: () => void;
  handleStudyStreak: () => void;
}

const VideoLectureScreen = ({
  lectureObject,
  courseObject,
  isLastSlide,
  onContinue,
  handleStudyStreak,
} : VideoLectureScreenProps)  => {
  const navigation = useNavigation();
  const [videoUrl, setVideoUrl] = useState<null | string>(null);
  const [currentResolution, setCurrentResolution] = useState("1080");

  // Fetch video URL based on current resolution
  useEffect(() => {
    const fetchVideoUrl = () => {
      getVideoURL(lectureObject.content, currentResolution)
        .then((url) => {
          // Check if URL is a video
          return fetch(url, { method: 'HEAD' }).then((response) => {
            const contentType: string | null = response.headers.get('content-type');
            if (!contentType || contentType.indexOf('video/') !== 0) {
              throw new Error("Invalid URL: " + url);
            }
            setVideoUrl(url);
          });
        })
        .catch((error) => {
          console.error(error);
          setVideoUrl(null);
        });
    };
    fetchVideoUrl();
  }, [lectureObject.content, currentResolution]);

  const handleContinuePress = async () => {
    if (isLastSlide) {
      try {
        handleStudyStreak();
        await completeComponent(lectureObject, courseObject.courseId, true);
        handleLastComponent(lectureObject, courseObject, navigation);
      } catch (error) {
        console.error("Error completing the course:", error);
        Alert.alert(
          "Error",
          "Failed to complete the course. Please try again later.",
          [{ text: "OK" }],
        );
      }
    } else {
      if (onContinue && typeof onContinue === "function") {
        onContinue(); // Advance to the next slide
      } else {
        console.warn("onContinue prop is not provided or not a function.");
      }
    }
  };

  return (
    <View className="flex-1 pt-20">
      {/* Course info */}
      <View className="mt-5 flex-col items-center">
        <Text className="font-sans text-base text-projectGray">
          Nome do curso: {courseObject.title}
        </Text>
        <Text className="font-sans-bold text-lg text-projectBlack">
          {lectureObject.title}
        </Text>
      </View>

      {/* Video Player */}
      <View className="flex-1 p-8">
        <View className="rounded-lg overflow-hidden" style={{ aspectRatio: 7/10 }}>
          {videoUrl ? (
            <Video
              source={{ uri: videoUrl }}
              shouldPlay={true}
              resizeMode={ResizeMode.COVER}
              style={{ width: '100%', height: '100%' }}
            />
          ) : (
            <View className="flex-1 items-center justify-center">
              <Text>Loading...</Text>
            </View>
          )}
        </View>
      </View>

      {/* Continue button */}
      <View className="w-100 mb-8 px-6">
        <TouchableOpacity
          className="flex-row items-center justify-center rounded-medium bg-primary_custom px-10 py-4"
          onPress={handleContinuePress}
        >
          <View className="flex-row items-center">
            <Text className="font-sans-bold text-center text-body text-projectWhite">
              Continuar
            </Text>
            <Icon
              name="chevron-right"
              type="material"
              size={24}
              color="white"
              style={{ marginLeft: 8 }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

VideoLectureScreen.propTypes = {
  lectureObject: PropTypes.object.isRequired,
  courseObject: PropTypes.object.isRequired,
  isLastSlide: PropTypes.bool.isRequired,
  onContinue: PropTypes.func.isRequired,
  handleStudyStreak: PropTypes.func.isRequired,
};

export default VideoLectureScreen;
