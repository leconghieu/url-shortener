import { APIGatewayEvent } from "aws-lambda";

export const extractUrl = (event: APIGatewayEvent): string => {
    if (!event.body) {
        return "";
    }

    try {
        const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;

        return body.url || "";
    } catch {
        return "";
    }
}
