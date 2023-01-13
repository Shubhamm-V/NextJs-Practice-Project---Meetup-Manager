import Head from "next/head";
import { Router, useRouter } from "next/router";
import { Fragment } from "react";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
const NewMeetup = () => {
  const rounter = useRouter();
  const handleAddMeetup = async (meetupData) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(meetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    console.log("Data",data);

    rounter.push('/')
  };
  return( 
  <Fragment>
    <Head>
      <title>Add Meetup</title>
      <meta name = "description" content = "Add New Meetup from Here"/>
    </Head>
    <NewMeetupForm onAddMeetup={handleAddMeetup} />;

  </Fragment>
  );
};
export default NewMeetup;
