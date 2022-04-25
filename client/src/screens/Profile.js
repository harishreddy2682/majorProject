import React, { useEffect, useState } from 'react'
import styles from '../styles/Profile.module.scss'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from 'react-query'
import { useProfileData, useUpdateProfileDetails } from '../queryHooks/userHooks'
import Navbar from '../components/Navbar'

const Profile = () => {

  const navigate = useNavigate()

  const queryClient = useQueryClient()
  const { status } = queryClient.getQueryState('logged-user')

  const { isSuccess: profileSuccess, data: profileData } = useProfileData()


  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [graduation, setGraduation] = useState({
    year: '',
    course: '',
    institute: '',
    percentage: ''
  })
  const [intermediate, setIntermediate] = useState({
    year: '',
    institute: '',
    percentage: ''
  })
  const [highSchool, setHighSchool] = useState({
    year: '',
    institute: '',
    percentage: ''
  })
  const [experience, setExperiences] = useState([{
    organization: '',
    description: '',
    startDate: '',
    endDate: ''
  }])
  const [projects, setProjects] = useState([{
    title: '',
    description: ''
  }])
  const [skills, setSkills] = useState('')
  const [achievements, setAchievements] = useState([])
  const [achievement, setAchievement] = useState('')

  // const [courses, setCourses] = useState(profileSuccess ? profileData.data.cources : [])
  // const [course, setCourse] = useState('')

  const [gitLink, setGitLink] = useState('')
  const [linkedin, setLinkedin] = useState('')

  const addNewExperience = () => {
    const updated = [...experience, { organization: '', description: '', startDate: '', endDate: '' }]
    setExperiences(updated)
  }

  const changeExperienceValue = (index, e) => {
    let updated = [...experience]
    updated[index][e.target.name] = e.target.value
    setExperiences(updated)
  }

  const addNewProject = () => {
    const updated = [...projects, { title: '', description: '' }]
    setProjects(updated)
  }

  const setProjectValues = (index, e) => {
    const updated = [...projects]
    updated[index][e.target.name] = e.target.value
    setProjects(updated)
  }

  const addAchievement = () => {
    const updated = [...achievements, achievement]
    setAchievements(updated)
    setAchievement('')
  }

  // const addCourse = () => {
  //   const updated = [...courses, course]
  //   setCourses(updated)
  //   setCourse('')
  // }

  const { mutate: updateProfile, isSuccess: updateSuccess } = useUpdateProfileDetails()

  const submitHandler = () => {
    updateProfile({ email, phone, graduation, intermediate, highSchool, experience, projects, skills, achievements, gitLink, linkedin })
  }

  // console.log(updateSuccess, isFetching)
  useEffect(() => {
    if (profileSuccess) {
      setEmail(profileData.data.email)
      setPhone(profileData.data.phone)
      setGraduation(profileData.data.graduation)
      setIntermediate(profileData.data.intermediate)
      setHighSchool(profileData.data.highSchool)
      setExperiences(profileData.data.experience)
      setProjects(profileData.data.projects)
      setSkills(profileData.data.skills)
      setAchievements(profileData.data.achievements)
      setGitLink(profileData.data.gitLink)
      setLinkedin(profileData.data.linkedinLink)
    }
  }, [profileSuccess, profileData])

  useEffect(() => {
    if (status === 'error') {
      navigate('/')
    }
  }, [status, navigate])

  return (
    <div className={styles.root}>
      <Navbar />
      {updateSuccess && <p style={{ 'color': 'green' }}>Update successful</p>}
      <div className={styles.profileContainer}>
        <div className={styles.form}>
          <p>Email</p>
          <input type="text" name='email' value={email} onChange={e => setEmail(e.target.value)} />
          <p>Phone</p>
          <input type="text" name='phone' value={phone} onChange={e => setPhone(e.target.value)} />

          <h1>Graduation</h1>
          <p>Year</p>
          <input type="number" value={graduation.year} onChange={e => setGraduation({ ...graduation, year: e.target.value })} />
          <p>Course</p>
          <input type="text" value={graduation.course} onChange={e => setGraduation({ ...graduation, course: e.target.value })} />
          <p>Institute</p>
          <input type="text" value={graduation.institute} onChange={e => setGraduation({ ...graduation, institute: e.target.value })} />
          <p>Percentage/CGPA</p>
          <input type="number" value={graduation.percentage} onChange={e => setGraduation({ ...graduation, percentage: e.target.value })} />

          <h1>12th</h1>
          <p>Year</p>
          <input type="number" value={intermediate.year} onChange={e => setIntermediate({ ...intermediate, year: e.target.value })} />
          <p>Institute</p>
          <input type="text" value={intermediate.institute} onChange={e => setIntermediate({ ...intermediate, institute: e.target.value })} />
          <p>Percentage/CGPA</p>
          <input type="number" value={intermediate.percentage} onChange={e => setIntermediate({ ...intermediate, percentage: e.target.value })} />

          <h1>10th</h1>
          <p>Year</p>
          <input type="number" value={highSchool.year} onChange={e => setHighSchool({ ...highSchool, year: e.target.value })} />
          <p>Institute</p>
          <input type="text" value={highSchool.institute} onChange={e => setHighSchool({ ...highSchool, institute: e.target.value })} />
          <p>Percentage/CGPA</p>
          <input type="number" value={highSchool.percentage} onChange={e => setHighSchool({ ...highSchool, percentage: e.target.value })} />

          <span><h1>Experience</h1><button onClick={addNewExperience} className={styles.btnAdd}>+</button></span>
          {
            experience.map((item, index) =>
              <div key={index}>
                <p>Organization</p>
                <input type="text" name='organization' value={item.organization} onChange={e => changeExperienceValue(index, e)} />
                <p>Description</p>
                <textarea type="textarea" name='description' row="4" col="12" value={item.description} onChange={e => changeExperienceValue(index, e)} />
                <p>Start date</p>
                <input type="text" name='startDate' value={item.startDate} onChange={e => changeExperienceValue(index, e)} />
                <p>End date</p>
                <input type="text" name='endDate' value={item.endDate} onChange={e => changeExperienceValue(index, e)} />
              </div>)
          }

        </div>
        <div className={styles.form}>
          <span><h1>Projects</h1><button onClick={addNewProject} className={styles.btnAdd}>+</button></span>
          {
            projects.map((item, index) =>
              <div key={index}>
                <p>Title</p>
                <input type="text" name='title' value={projects[index].title} onChange={e => setProjectValues(index, e)} />
                <p>Description</p>
                <textarea row='5' col='15' name='description' value={projects[index].description} onChange={e => setProjectValues(index, e)} />
              </div>
            )}
          <h1>Skills</h1>
          <textarea cols="30" rows="5" placeholder='Ex: C, C++, Java' value={skills} onChange={e => setSkills(e.target.value)}></textarea>
          <h1>Achievements</h1>
          {
            achievements.map((item, index) => <p key={index}>{item}</p>)
          }
          <span><input type="text" placeholder='Add achievement' value={achievement} onChange={e => setAchievement(e.target.value)} /><button onClick={addAchievement} className={styles.btnAdd}>Add</button></span>

          {/* <h1>Courses</h1>
          {
            courses.map((item, index) => <p key={index}>{item}</p>)
          }
          <span><input type="text" placeholder='Add course' value={course} onChange={e => setCourse(e.target.value)} /><button onClick={addCourse}>Add</button></span> */}

          <h1>Links</h1>
          <input type="text" placeholder='Git hub link' value={gitLink} onChange={e => setGitLink(e.target.value)} />
          <input type="text" placeholder='Linkedin profile link' value={linkedin} onChange={e => setLinkedin(e.target.value)} />
        </div>
      </div>
      <button onClick={submitHandler}>Submit</button>
    </div>
  )
}

export default Profile