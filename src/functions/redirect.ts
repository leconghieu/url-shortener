import { getUrl } from "../db/urlRepository";

 
export const handler = async (event: any) => {
    try {
        const code = event.pathParameters?.code || '';

        if (!code) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "The code is required" }),
            }
        }

        const url = await getUrl(code);

        if (!url) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: "URL not found" }),
            }
        }

        return {
            statusCode: 301,
            headers: { location: url },
            body: "",
        }
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: "Internal error",
        }
    }
}
 