import React from 'react'
import EditDisplayName from '../../Components/Article/EditDisplayName'
import { Container } from '@mui/material'
import EditProfileImage from '../../Components/Article/EditProfileImage'

const Setting = () => {
  return (
    <Container>
      <EditDisplayName/>
      <EditProfileImage/>
    </Container>
  )
}

export default Setting
