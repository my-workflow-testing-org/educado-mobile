import { usersPermissionsPostAuthLocal } from "@/api/backend/sdk.gen";
import { UsersPermissionsUserRegistration } from "@/api/backend/types.gen";


export const loginUserStrapi = async (email: string, password: string) => {
    const response = await usersPermissionsPostAuthLocal({
        body: {
            identifier: email,
            password,
        },
    })

    if (!response) {
        throw new Error("Failed to login user in strapi");
    }

    return response as UsersPermissionsUserRegistration;

};