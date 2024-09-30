import { InternalServerErrorException } from "@nestjs/common"

export const generateTokens = async (jwtService: any, payload: object) => {
    try {
        const [access_token, refresh_token] = await Promise.all([
            await jwtService.sign(payload, {
                secretKey: process.env.ACCESS_TOKEN_KEY,
                expireIn: process.env.ACCESS_TOKEN_TIME
            }),
            await jwtService.sign(payload, {
                secretKey: process.env.REFRESH_TOKEN_KEY,
                expireIn: process.env.REFRESH_TOKEN_TIME
            }),
        ]);
        return { access_token, refresh_token };
    } catch (error) {
        throw new InternalServerErrorException(error);
    }
}
