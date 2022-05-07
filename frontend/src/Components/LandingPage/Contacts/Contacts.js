import React from 'react'
import './contact.css'

const initialState = {
    name: '',
    email: '',
    message: '',
  }
  export const Contact = (props) => {
  
  
    return (
        <div>
          <div id='contact'>
            <div className='container'>
              <div className='col-md-8'>
                <div className='row'>
                  <div className='section-title'>
                    <h2 style={{  color: "black"}}>Get In Touch</h2>
                    <p>
                      Please fill out the form below to send us an email and we will
                      get back to you as soon as possible.
                    </p>
                  </div>
                  <form className='sentMessage' validate >
                    <div className='row'>
                      <div className='col-md-6'>
                        <div className='form-group'>
                          <input
                            type='text'
                            id='name'
                            name='name'
                            className='form-control'
                            placeholder='Name'
                            required
                          />
                          <p className='help-block text-danger'></p>
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='form-group'>
                          <input
                            type='email'
                            id='email'
                            name='email'
                            className='form-control'
                            placeholder='Email'
                            required
                          />
                          <p className='help-block text-danger'></p>
                        </div>
                      </div>
                      
                      <div className='col-md-12'>
                        <div className='form-group'>
                          <input
                            type='text'
                            name='subejct'
                            className='form-control'
                            placeholder='Subject'
                            required
                          />
                          <p className='help-block text-danger'></p>
                        </div>
                      </div>
                    </div>
                    <div className='form-group'>
                      <textarea
                        name='message'
                        id='message'
                        className='form-control'
                        rows='4'
                        placeholder='Message'
                        required
                      ></textarea>
                      <p className='help-block text-danger'></p>
                    </div>
                    <div id='success'></div>
                    <button type='submit' className='btn-main'>
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          </div>
      )
    }