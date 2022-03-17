import React, { useState, useEffect } from "react";
import { useApi } from '../hooks/api'

import Head from 'next/head'
import PageContainer from '@components/ui/PageContainer'
import UserProfileContent from '@components/page-content/UserProfileContent'

const UserProfilePage = ({}) => {
  // API call gets user data, their school.
  const [currentUser, setCurrentUser] = useState();
  const [isEditing, setIsEditing] = useState(false)
  const [isSavingChanges, setIsSavingChanges] = useState(false)
  const { editProfile } = useApi()

  const handleSaveProfileChanges = async () => {
     setIsSavingChanges(true)
     try {
       await editProfile({ userId: '', data: '' })
       console.log('editing worked')
       setIsEditing(false)
       setIsSavingChanges(false)
     } catch(error) {
       console.log('editing failed')
       alert("Oops! Something went wrong. Please try again in a few minutes.")
       setIsSavingChanges(false)
     }
   }


  useEffect(() => {
    // logged in user?
    getCurrentUser({setCurrentUser: setCurrentUser});
  }, []);

  return (
    <>
      <Head>
        <title>Wildflower Schools Directory | User Profile</title>
        <meta name="title" content="Wildflower Schools Directory" />
        <meta property="og:site_name" content="Wildflower Schools Directory" key="og_wf_site_name" />
        <meta name="description" content="Wildflower Schools Directory" />
        <meta name="keywords" content="Wildflower, Schools, Directory, Montessori" />
        <meta property="og:title" content="Wildflower Schools Directory" key="og_wf_site_title" />
        <meta property="og:description" content="Wildflower Schools Directory" key="og_wf_site_description" />
      </Head>

      <PageContainer>
        <UserProfileContent />
      </PageContainer>
    </>
  )
}

export default UserProfilePage

function getCurrentUser() {

}

const user = {
  name: 'Maya Walley',
  role: 'Teacher Leader',
  profileImage: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80',
  phoneNumber: '(917) 123-4567',
  location: 'New York City',
  skills: [
    'Finance',
    'Home Schooling',
    'Real Estate'
  ]
}
