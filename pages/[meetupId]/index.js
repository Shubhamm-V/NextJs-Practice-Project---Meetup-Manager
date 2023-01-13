import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";
const MeetupDetails = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name = "description" content = {props.meetupData.description}/>
      </Head>
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
    </Fragment>
  );
};
export const getStaticPaths = async () => {
  const client = await MongoClient.connect('mongodb+srv://shubham:shubham2003@cluster0.6bgu6pe.mongodb.net/meetups?retryWrites=true&w=majority');
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find().toArray();
  return {
    fallback: false,
    paths: meetups.map(meetup=>({
      params:{
        meetupId: meetup._id.toString()
      }
    }))
   
  }
}
export const getStaticProps = async (context) => {
 const meetupId = context.params.meetupId;
 const client = await MongoClient.connect('mongodb+srv://shubham:shubham2003@cluster0.6bgu6pe.mongodb.net/meetups?retryWrites=true&w=majority');
 const db = client.db();
 const meetupsCollection = db.collection('meetups');
 const meetup = await meetupsCollection.findOne({_id: ObjectId(meetupId)});
  return {
    props: {
      meetupData: {
       // id: meetup._id.toString(),
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description,
      },
    },
  };
};

export default MeetupDetails;
