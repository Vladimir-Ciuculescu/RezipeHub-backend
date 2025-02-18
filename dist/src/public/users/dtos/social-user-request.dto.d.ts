import { SocialProvider } from "types/enums";
export declare class SocialUserRequestDto {
    provider: SocialProvider;
    providerUserId: string;
    email: string;
    firstName: string;
    lastName: string;
    deviceToken: string;
    platform: string;
}
