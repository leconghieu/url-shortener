import { APIGatewayEvent } from "aws-lambda";
import { nanoid } from "nanoid";
import { isUrlValid } from "../utils/validation";
import { extractUrl } from "../utils/helpers"; 
import { saveUrl } from "../db/urlRepository";

export const handler = async (event: APIGatewayEvent) => {
    try {
        const url = extractUrl(event);

        if (!url) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "URL is required" }),
            }
        } else if (!isUrlValid(url)) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "URL is invalid" }),
            }
        }

        const code = nanoid(6);

        await saveUrl(code, url);

        return {
            statusCode: 200,
            body: JSON.stringify({ shortUrl: `${process.env.BASE_URL}/${code}` }),
        }
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: "Internal error",
        }
    }
};
 
