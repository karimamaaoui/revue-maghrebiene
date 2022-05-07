import React from 'react'
import {Container,Row,Button} from 'react-bootstrap';
import './authenticate.css'


export default function Authenticate() {
  return (
    <div className='main' >
        <Container >
            <Row style={{padding:"80px"}}>
                <div className='intro-text'>
                    <div >
                        <h1 className='title' > 
                            Welcome To Maghreb Journal
                        </h1>
                        <p className='subtitle'>
                            Only for you
                        </p>
                    </div>
                    <div className='buttonContainer'>
                        <a href="/login">
                            <Button size='lg' className='landingbutton'>Login</Button>
                        </a>
                        <a href="/register">
                            <Button size='lg' className='landingbutton' variant='outline-primary' >Register</Button>
                        </a>
                    
                    </div>
                </div>
            </Row>
        </Container>
        
    </div>
  )
}
