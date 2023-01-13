import { MongoClient } from "mongodb";
const handler = async (req, res) => {
  if (req.method === "POST") {
    const client = await MongoClient.connect(
      "mongodb+srv://shubham:shubham2003@cluster0.6bgu6pe.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(req.body);
    console.log(result)
    res.status(201).json({ message: "Inserted Successfully" });
  }
};

export default handler;
