import React, { useState } from 'react'
import { Formik,Field,Form,ErrorMessage } from 'formik'
import * as Yup from 'yup';

const validationSchema = Yup.object({
    email:Yup.email()
    .required("Email is a required Field"),
    password:Yup.string()
    .min(6, "Too Short")
    .required("Password is a required Field")
})


export default function Login() {
    const[login, setLogin] = useState(false)
    
  return (
    <div>
      <Formik
      initialValues={{
        email:"",
        password:""
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      >
        {({isSubmitting})=>(
            <Form>
                <div>
                    <Field 
                    name="email"
                    type="email"
                    className="form-control my-3"
                    placeholder="Enter your Email Address"/>
                    <ErrorMessage
                    name='email'
                    component='div'
                    className='text-danger'
                    />
                </div>
                <div>
                    <Field 
                    name="password"
                    type="password"
                    className="form-control my-3"
                    placeholder="Enter Password"/>
                    <ErrorMessage
                    name='password'
                    component='div'
                    className='text-danger'
                    />
                </div>
                <div>
                    <button type='submit'>Login</button>
                </div>
            </Form>
        )}
      </Formik>
    </div>
  )
}
