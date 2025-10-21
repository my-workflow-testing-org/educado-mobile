import { useState, useEffect } from "react";
import { View, TouchableOpacity, Alert, Text } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { completeComponent, handleLastComponent } from "@/services/utils";
import { getVideoURL } from "@/services/storage-service";
import { Lecture } from "@/types/lecture";
import { Course } from "@/types/course";

export interface VideoLectureScreenProps {
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
}: VideoLectureScreenProps) => {
  const navigation = useNavigation();
  const [videoUrl, setVideoUrl] = useState<null | string>(null);
  const currentResolution = "1080";

  // Fetch video URL based on current resolution
  useEffect(() => {
    const fetchVideoUrl = () => {
      getVideoURL(lectureObject.content, currentResolution)
        .then((url) => {
          // Check if URL is a video
          return fetch(url, { method: "HEAD" }).then((response) => {
            const contentType: string | null =
              response.headers.get("content-type");
            if (!contentType?.startsWith("video/")) {
              throw new Error("Invalid URL: " + url);
            }
            setVideoUrl(url);
          });
        })
        .catch((error: unknown) => {
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
        await handleLastComponent(lectureObject, courseObject, navigation);
      } catch (error) {
        console.error("Error completing the course:", error);
        Alert.alert(
          "Error",
          "Failed to complete the course. Please try again later.",
          [{ text: "OK" }],
        );
      }
    } else {
      if (typeof onContinue === "function") {
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
        <Text className="text-textDisabledGrayscale text-body-regular">
          Nome do curso: {courseObject.title}
        </Text>
        <Text className="text-textTitleGrayscale text-body-bold">
          {lectureObject.title}
        </Text>
      </View>

      {/* Video Player */}
      <View className="flex-1 p-8">
        <View
          className="w-full overflow-hidden rounded-xl"
          style={{ aspectRatio: 7 / 10 }}
        >
          {videoUrl ? (
            <Video
              source={{ uri: videoUrl }}
              shouldPlay={true}
              resizeMode={ResizeMode.COVER}
              style={{ width: "100%", height: "100%" } as const}
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
          className="flex-row items-center justify-center rounded-medium bg-surfaceDefaultCyan px-10 py-4"
          onPress={() => void handleContinuePress()}
        >
          <View className="flex-row items-center">
            <Text className="text-center text-surfaceSubtleGrayscale text-body-bold">
              Continuar
            </Text>
            <Icon
              className="ml-8"
              name="chevron-right"
              type="material"
              size={24}
              color="white"
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VideoLectureScreen;
