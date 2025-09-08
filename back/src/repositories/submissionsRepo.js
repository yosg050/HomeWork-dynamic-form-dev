import { PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { ddb } from "../adapters/dynamodb.adapter.js";

const TABLE = process.env.DYNAMO_TABLE || "Submissions";

export async function putSubmission(item) {
  const result = await ddb.send(
    new PutCommand({
      TableName: TABLE,
      Item: item,
    })
  );
  return result;
}



export async function scanSubmissions({ limit = 100, cursor }) {
  const TABLE = process.env.DYNAMO_TABLE || "Submissions";
  const params = {
    TableName: TABLE,
    Limit: limit,
    ProjectionExpression:
      "submissionId, email, username, birthdate, gender, createdAt",
  };
  if (cursor) {
    params.ExclusiveStartKey = { submissionId: cursor };
    console.log("Scanning from cursor:", cursor); //testing
  }
  const out = await ddb.send(new ScanCommand(params));
  console.log("ScanCommand output:", out); //testing

  return {
    items: out.Items || [],
    nextCursor: out.LastEvaluatedKey?.submissionId || undefined,
  };
}
