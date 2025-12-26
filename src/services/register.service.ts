
    import type { IUser } from "../types/schema";
    import { ZRagisterUser } from "../validators/auth.validators.ts";
    import { formetErrors } from "../utils/formetErrors.ts";

    export async function registerService(userData: IUser) {
    const result = ZRagisterUser.safeParse(userData);
        if (!result.success) {
            return formetErrors(result.error);
    }

    return result.success;
    }
