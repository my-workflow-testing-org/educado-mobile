import { CourseService } from "@/api/backend";
import { FeedbackService } from "@/api/backend";
import { mapToSectionComponent } from "@/api/dto-mapper";
import { mapToCourse, mapToFeedbackOption } from "@/api/strapi-mapper";
import { sectionComponentDtoSchema } from "@/types/legacy-api-dto";
import { PopulatedCourse, PopulatedFeedback } from "@/types/strapi-populated";
import { AxiosResponse } from "axios";

/**
 * Gets all components for a specific section.
 *
 * @param id - The section ID.
 * @returns A list of components.
 * @throws {@link AxiosError}
 */
export const getAllComponentsBySectionIdStrapi = async (id: string) => {
    const response = await CourseService.courseGetCoursesById(id)

    const parsed = sectionComponentDtoSchema.array().parse(response.data);

    return parsed.map(mapToSectionComponent);
};


/**
 * Gets all courses.
 *
 * @returns A list of courses.
 * @throws {@link AxiosError}
 */
export const getAllCoursesStrapi = async () => {
    const response = await CourseService.courseGetCourses(
        [
            'title',
            'description',
            'difficulty',
            'updatedAt',
            'createdAt',
            'publishedAt',
        ],
        undefined, // filters
        undefined, // q
        undefined, // pagination
        undefined, // sort
        [
            'course_categories',
            'content_creators',
            'image',
            'feedbacks',
            'course_sections',
            'students',
        ], // populate
    ) as AxiosResponse<PopulatedCourse[]>;

    return response.data.map(mapToCourse)
};

export const getAllFeedbackOptionsStrapi = async () => {
    const response = await FeedbackService.feedbackGetFeedbacks(
        [
            'rating',
            'feedbackText',
            'dateCreated',
            'createdAt',
            'updatedAt',
            'publishedAt',
        ],
        undefined, // filters
        undefined, // q
        undefined, // pagination
        undefined, // sort
        [
            'course',
            'student',
            
        ],
    ) as AxiosResponse<PopulatedFeedback[]>;

    return response.data.map(mapToFeedbackOption);
};

/**
 * Sends (creates) feedback for a specific course.
 *
 * @param courseId - The ID of the course.
 * @param feedbackData - The feedback payload.
 * @returns The created feedback (mapped).
 * @throws {@link AxiosError}
 */
export const postFeedback = async (
  courseId: number,
  feedbackData: {
    rating: number;
    feedbackText?: string;
    studentId?: number | string;
  }
) => {
  // Build the `data` object for the request. Strapi will validate relations,
  // so only include `student` when it's a numeric id (Strapi typically uses numeric ids).
  const data: Record<string, any> = {
    rating: feedbackData.rating,
    feedbackText: feedbackData.feedbackText ?? "",
    dateCreated: new Date().toISOString(),
    course: courseId,
  };

  const studentId = feedbackData.studentId;
  const isNumericString = (v: string) => /^\d+$/.test(v);

  if (typeof studentId === "number") {
    data.student = studentId;
  } else if (typeof studentId === "string" && isNumericString(studentId)) {
    // If studentId is a numeric string, convert to number for Strapi.
    data.student = Number(studentId);
  } else if (studentId !== undefined) {
    // Provided studentId is non-numeric (e.g. a UUID or hex from legacy DB).
    // Sending it as a relation to Strapi will cause a validation error
    // so omit the relation and let feedback be created without a student.
    // Log a warning so it's easier to debug.
    console.warn(
      "postFeedback: skipping student relation because studentId is non-numeric",
      studentId,
    );
  }

  const payload = { data };

  // The generated client returns an object with a `data` property (FeedbackResponse).
  const apiResponse = await FeedbackService.feedbackPostFeedbacks(payload as any);
  const feedback = (apiResponse as any).data ?? apiResponse;

  return mapToFeedbackOption(feedback);
};
