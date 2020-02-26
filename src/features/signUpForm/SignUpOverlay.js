import React, { useState } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import ContactInfo from './signUpComponents/ContactInfo'
import LocationInfo from './signUpComponents/LocationInfo'
import ReviewInfo from './signUpComponents/ReviewInfo'
import { useSignUpStyles } from './signUpOverlayStyles'

export default function SignUp(props) {
  const classes = useSignUpStyles()
  const [activeStep, setActiveStep] = useState(0)
  const steps = ['Contact Info', 'Location Info', 'Review your Profile']

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    state: '',
    country: '',
  })

  function GetStepContent(step) {
    const changeHandler = e => {
      setUser({ ...user, [e.target.name]: e.target.value })
      console.log(user)
    }

    switch (step) {
      case 0:
        return <ContactInfo user={user} changeHandler={changeHandler} />
      case 1:
        return <LocationInfo user={user} changeHandler={changeHandler} />
      case 2:
        return <ReviewInfo user={user} />
      case 3:
        console.log(user)
        return null
      default:
        throw new Error('Unknown step')
    }
  }

  const handleNext = () => {
    if (activeStep === 0) {
      const phoneno = /^\d{10}$/
      if (!user.phone.match(phoneno)) {
        alert('Please enter a valid phone number')
      } else {
        if (!user.email.includes('@' && '.')) {
          alert('please enter a valid email')
        } else {
          if (user.firstName && user.lastName && user.email && user.phone) {
            setActiveStep(activeStep + 1)
          } else alert('Missing a required field')
        }
      }
    }
    if (activeStep === 1) {
      const zip = /^\d{5}$/
      if (!user.zip.match(zip)) {
        alert('Please enter a valid zip code')
      } else {
        if (
          user.address &&
          user.state &&
          user.zip &&
          user.country &&
          user.city
        ) {
          setActiveStep(activeStep + 1)
        } else alert('Missing a required field')
      }
    }
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  return (
    <>
      <CssBaseline />

      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component='h1' variant='h4' align='center'>
            Sign Up
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {activeStep === steps.length ? (
              props.history.push('/home')
            ) : (
              <>
                {GetStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1
                      ? 'Confirm Information'
                      : 'Next'}
                  </Button>
                </div>
              </>
            )}
          </>
        </Paper>
      </main>
    </>
  )
}