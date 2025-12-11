 
export const extractUrl = (event: any): string => {
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
 