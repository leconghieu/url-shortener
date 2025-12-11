import { docClient, TABLE_NAME } from "./dynamo";
import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";

export async function getUrl(code: string): Promise<string> {
    const result = await docClient.send(
        new GetCommand({
            TableName: TABLE_NAME,
            Key: { code },
        })
    );

  return result.Item?.url || '';
}

export async function saveUrl(code: string, url: string) {
    await docClient.send(
        new PutCommand({
            TableName: TABLE_NAME,
            Item: {code, url},
        })
    );
}
