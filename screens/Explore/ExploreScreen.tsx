import { useEffect, useState } from "react";
import { RefreshControl, ScrollView, View, Button, Alert } from "react-native";
import { FilterNavigationBar } from "@/components/Explore/FilterNavigationBar";
import { ExploreCard } from "@/components/Explore/ExploreCard";
import IconHeader from "@/components/General/IconHeader";
import { determineCategory } from "@/services/utils";
import { BaseScreen } from "@/components/General/BaseScreen";
import { t } from "@/i18n";
import {
  useCourses,
  useLoginStudent,
  useSubscribedCourses,
  useGiveFeedback,
} from "@/hooks/query";
import LoadingScreen from "@/components/Loading/LoadingScreen";
import { Course } from "@/types";
import { postFeedback } from "@/api/strapi-api";

/**
 * Explore screen displays all courses and allows the user to filter them by category or search text.
 */
const ExploreScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

  const loginStudentQuery = useLoginStudent();

  const userId = loginStudentQuery.data.userInfo.id;
  const courseQuery = useCourses();

  const subscriptionsQuery = useSubscribedCourses(userId);

  const subscriptions = subscriptionsQuery.data ?? [];
  const refreshing = courseQuery.isFetching || subscriptionsQuery.isFetching;

  const onRefresh = () => {
    void courseQuery.refetch();
    void subscriptionsQuery.refetch();
  };

  const handleFilter = (text: string) => {
    setSearchText(text);
  };

  const handleCategoryFilter = (category: string) => {
    if (category === t("categories.all")) {
      setSelectedCategory("");
    } else {
      setSelectedCategory(category);
    }
  };

  const handleTestFeedback = async () => {
    try {
      console.log("Starting feedback test...");
      console.log("User ID:", userId);
      console.log("Course ID: 1");
      
      // Test with courseId = 1 (change as needed)
      // NOTE: `userId` can be a string (UUID/hex). Do not parseInt() which yields NaN.
      const result = await postFeedback(1, {
        rating: 5,
        feedbackText: "Test feedback from Explore screen!",
        studentId: userId,
      });
      
      Alert.alert("Success", `Feedback posted: ${JSON.stringify(result)}`);
      console.log("Feedback result:", result);
    } catch (error: any) {
      // The generated client throws `ApiError` instances (see api/backend/core/ApiError.ts)
      // which expose `body` and `status` instead of `response` like axios errors.
      console.error("Full error object:", error);
      console.error("Error body:", error?.body ?? error?.response?.data);
      console.error("Error status:", error?.status ?? error?.response?.status);

      const body = error?.body ?? error?.response?.data;
      const errorMessage = body?.error?.message || body?.message || error?.message || String(error);

      Alert.alert("Error", `Failed to post feedback: ${errorMessage}`);
    }
  };


  useEffect(() => {
    const courses = courseQuery.data ?? [];

    if (courses.length === 0) {
      return;
    }

    const filteredCourses = courses.filter((course) => {
      const titleMatchesSearch = course.title
        .toLowerCase()
        .includes(searchText.toLowerCase());

      const categoryMatchesFilter =
        !selectedCategory ||
        determineCategory(course.category) === selectedCategory;

      return titleMatchesSearch && categoryMatchesFilter;
    });

    setFilteredCourses(filteredCourses);
  }, [selectedCategory, searchText, courseQuery.data]);

  if (courseQuery.isLoading || subscriptionsQuery.isLoading) {
    return <LoadingScreen />;
  }

  return (
    <BaseScreen>
      <View className="overflow-visible px-8 pt-28">
        <IconHeader title={t("course.explore-courses")} />
        
        {/* Test Feedback Button */}
        <View className="my-4">
          <Button 
            title="🧪 Test Post Feedback" 
            onPress={handleTestFeedback}
            color="#FF6B6B"
          />
        </View>

        <View className="mt-8">
          <FilterNavigationBar
            onChangeText={(text) => {
              handleFilter(text);
            }}
            onCategoryChange={handleCategoryFilter}
          />
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View className="mt-8 overflow-visible">
              {filteredCourses.reverse().map((course, index) => (
                <ExploreCard
                  key={index}
                  isPublished={course.status === "published"}
                  subscribed={subscriptions
                    .map((course) => course.courseId)
                    .includes(course.courseId)}
                  course={course}
                />
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </BaseScreen>
  );
};

export default ExploreScreen;