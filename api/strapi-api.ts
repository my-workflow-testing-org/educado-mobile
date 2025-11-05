import { CourseService } from "@/api/backend";
import { mapToCourse, mapToSectionComponent } from "@/api/dto-mapper";
import { sectionComponentDtoSchema } from "@/types/legacy-api-dto";
import { courseModelSchema } from "@/types/legacy-api-model";

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
    const response = await CourseService.courseGetCourses()

    const parsed = courseModelSchema.array().parse(response.data);

    console.log("response", response);

    return parsed.map(mapToCourse);
};