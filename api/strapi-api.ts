import { postStudentLogin } from "@/api/backend/sdk.gen";
import { JwtResponse } from "@/api/backend/types.gen";


export const loginUserStrapi = async (email: string, password: string) => {
    try {
        const response = await postStudentLogin({
            body: {
                email,
                password,
            },
        })
        if (!response) {
            throw new Error("Failed to login user in strapi");
        }

        return response as JwtResponse;
    } catch (error) {
        console.log(error);
    }

};