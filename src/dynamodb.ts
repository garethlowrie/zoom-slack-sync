import { DynamoDB } from "aws-sdk";

export const dynamodb = new DynamoDB.DocumentClient();

export const put = (table: string, item: any) =>
    dynamodb.put({ TableName: table, Item: item }).promise();

export const deleteItem = (table: string, params: any) =>
    dynamodb.delete({ TableName: table, ...params }).promise();

export const scan = (table: string, params: any = {}) =>
    dynamodb.scan({ TableName: table, ...params }).promise();

export const get = (
    table: string,
    params: Omit<DynamoDB.DocumentClient.GetItemInput, "TableName">
) => dynamodb.get({ TableName: table, ...params }).promise();

export const update = (
    table: string,
    params: Omit<DynamoDB.DocumentClient.UpdateItemInput, "TableName">
) => dynamodb.update({ TableName: table, ...params }).promise();
