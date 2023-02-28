import { NextApiRequest, NextApiResponse } from "next";
import { connectDatabase, getAllData, insertData } from "utils/db-utils";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }

  if (req.method === "POST") {
    const { email, name, message, lastName, phone } = req.body;
    // server side validation
    if (!email.includes("@") || !name || name.trim() === "" || !message || message.trim() === "") {
      res.status(422).json({ message: "Invalid input." });
      client.close();
      return;
    }
    const id = new Date();
    const newComment = { email, name, message, id, lastName, phone };
    // mongodb will create a unique id for us

    let result;

    try {
      result = await insertData(client, "messages", newComment);
      // newComment.id = result.insertedId; // not necessary
      res.status(200).json({ message: "Message Sent.", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "Sending message failed!" });
    }
  }

  if (req.method === "GET") {
    try {
      const documents = await getAllData(client, "messages", { _id: -1 });
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: "Getting Messages failed." });
    }
  }
  client.close();
}
