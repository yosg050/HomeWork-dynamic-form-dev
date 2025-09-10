import { GetCommand, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { ddb } from "../adapters/dynamodb.adapter.js";
import { DuplicateSubmissionError, ValidationError } from "../errors/DomainErrors.js";

const TABLE = process.env.DYNAMO_TABLE || "Submissions";

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
      throw new DuplicateSubmissionError(
        "Submission with same hash already exists",
        { hash: item.hash }
      );
    }
    if (err?.name === "ValidationException") {
      throw new ValidationError("Invalid item for DynamoDB", {
        cause: err.message,
      });
    }
    throw new InternalError("DB putSubmission failed", { cause: err?.message });
  }
}

export async function scanSubmissions({ limit = 100, cursor }) {
  try {
    const params = {
      TableName: TABLE,
      Limit: limit,
      ProjectionExpression: "#h, email, username, birthdate, gender, createdAt",
      ExpressionAttributeNames: { "#h": "hash" },
    };

    // cursor = hash string (אחיד מול הקונטרולר/סרביס)
     if (cursor) {
       if (typeof cursor === "string") {
         params.ExclusiveStartKey = { hash: cursor };
       } else if (typeof cursor === "object") {
         params.ExclusiveStartKey = cursor;
       }
     }


    const out = await ddb.send(new ScanCommand(params));

    return {
      items: out.Items || [],
      nextCursor: out.LastEvaluatedKey ?? undefined,
    };
  } catch (err) {
    if (err?.name === "ValidationException") {
      throw new ValidationError("Invalid scan parameters", {
        cause: err.message,
      });
    }
    throw new InternalError("DB scanSubmissions failed", {
      cause: err.message,
    });
  }
}

