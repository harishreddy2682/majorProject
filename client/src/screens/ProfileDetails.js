import React, { useEffect } from 'react'
import styles from '../styles/Details.module.scss'
import { useProfileData } from '../queryHooks/userHooks'
import { useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Details = () => {
  const navigate = useNavigate()

  const { data: details, isLoading } = useProfileData()

  const queryClient = useQueryClient()
  const { status } = queryClient.getQueryState('logged-user')

  useEffect(() => {
    if (status === 'error') {
      navigate('/')
    }
  }, [status, navigate])

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <>
      <Navbar />
      <div className={styles.root}>
        <div className={styles.container}>
          <h1>Personal info</h1>
          <div className={styles.description}>
            <p>Name: {details.data.name}</p>
            <p>Email: {details.data.email}</p>
            <p>Phone: {details.data.phone}</p>
            <p>Git: {details.data.gitLink}</p>
            <p>Linkedin: {details.data.linkedinLink}</p>
          </div>
        </div>
        <div className={styles.container}>
          <h1>Graduation</h1>
          <div className={styles.description}>
            <p>Institute: {details.data.graduation.institute}</p>
            <p>Course: {details.data.graduation.course}</p>
            <p>Year: {details.data.graduation.year}</p>
            <p>Percentage/CGPA: {details.data.graduation.year}</p>
          </div>
        </div>
        <div className={styles.container}>
          <h1>Intermediate</h1>
          <div className={styles.description}>
            <p>Institute: {details.data.intermediate.institute}</p>
            <p>Year: {details.data.intermediate.year}</p>
            <p>Percentage/CGPA: {details.data.intermediate.year}</p>
          </div>
        </div>
        <div className={styles.container}>
          <h1>High School</h1>
          <div className={styles.description}>
            <p>Institute: {details.data.highSchool.institute}</p>
            <p>Year: {details.data.highSchool.year}</p>
            <p>Percentage/CGPA: {details.data.highSchool.year}</p>
          </div>
        </div>
        <div className={styles.container}>
          <h1>Experience</h1>
          <div className={styles.experienceContainer}>
            {details.data.experience.map((item, index) => (
              <div className={styles.experience} key={index}>
                <p>Organization: {item.organization}</p>
                <p>Description: {item.description}</p>
                <p>Start Date: {item.startDate}</p>
                <p>End Date: {item.endDate}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.container}>
          <h1>Projects</h1>
          <div className={styles.experienceContainer}>
            {details.data.projects.map((item, index) => (
              <div className={styles.experience} key={index}>
                <p>Title: {item.title}</p>
                <p>Description: {item.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.container}>
          <h1>Skills</h1>
          <div className={styles.description}>
            {details.data.skills}
          </div>
        </div>
        <div className={styles.container}>
          <h1>Achievements</h1>
          <div className={styles.experienceContainer}>
            {details.data.achievements.map((item, index) => (
              <div className={styles.description} key={index}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Details