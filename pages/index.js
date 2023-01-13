import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";
import MeetupList from "../components/meetups/MeetupList";
const HomePage = (props) => {
  return (
  <Fragment>
    <Head>
      <title>Browse Meetups</title>
      <meta name = "description" content = "Browse all react meetups here"/>
    </Head>
    <MeetupList meetups={props.meetData} />;
  </Fragment>
  );
};

export const getStaticProps = async () => {
  const client = await MongoClient.connect('mongodb+srv://shubham:shubham2003@cluster0.6bgu6pe.mongodb.net/meetups?retryWrites=true&w=majority');
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find().toArray();
    return {
       props: {
        meetData: meetups.map(meetup=>({
          id: meetup._id.toString(),
          title: meetup.title,
          address: meetup.address,
          image: meetup.image,
          description: meetup.description,
        })),
       }
    }
}

export default HomePage;
