import { GetCommand, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { ddb } from "../adapters/dynamodb.adapter.js";
import { DuplicateSubmissionError } from "../errors/DomainErrors.js";

const TABLE = process.env.DYNAMO_TABLE || "Submissions";

export async function getSubmissionByHash(hash) {
  const { Item } = await ddb.send(
    new GetCommand({
      TableName: TABLE,
      Key: { hash },
    })
  );
  return Item ?? null;
}

export async function putSubmission(item) {
  try {
    return await ddb.send(
      new PutCommand({
        TableName: TABLE,
        Item: item,
        ConditionExpression: "attribute_not_exists(#h)",
        ExpressionAttributeNames: { "#h": "hash" },
      })
    );
  } catch (err) {
    if (err?.name === "ConditionalCheckFailedException") {
      throw new DuplicateSubmissionError();
    }
    throw err;
  }
}


export async function scanSubmissions({ limit = 100, cursor }) {
  const params = {
    TableName: TABLE,
    Limit: limit,
    ProjectionExpression:
      "hash, email, username, birthdate, gender, createdAt",
  };
  if (cursor) {
    params.ExclusiveStartKey = { hash: cursor };
    // console.log("Scanning from cursor:", cursor); //testing
  }
  const out = await ddb.send(new ScanCommand(params));
  // console.log("ScanCommand output:", out); //testing

  return {
    items: out.Items || [],
    nextCursor: out.LastEvaluatedKey?.hash || undefined,
  };
}
