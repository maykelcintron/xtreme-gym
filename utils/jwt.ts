import jwt from 'jsonwebtoken';

export const generateJwt = async (payload: {userId: string}) => {
    try {
        const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY!, { expiresIn: '1h' });
        return token;
    } catch (error) {
        console.error("Error generating JWT token:", error);
        return null;
    }
}

export const verifyJwt = async (token: string) => {
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY!);
        return decoded;
    } catch (error) {
        console.error("Error verifying JWT token:", error);
        return null;
    }
}