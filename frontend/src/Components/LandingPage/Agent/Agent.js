import React from 'react'
import Agentbox from './Agentbox'
import agentImg1 from '../../../assets/s1.png';
import agentImg3 from '../../../assets/s3.png';
import './agent.css'
function Agent() {
    return (
        <div className="agent"> 
            <div className="a-heading">
                <h1>Agents</h1>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting 
                    industry. Lorem Ipsum has been the industry's standard dummy 
                    text ever since the 1500s, when an unknown printer took a 
                    galley of type and scrambled it to make a type specimen book.
                     It has survived not only five centuries,
                     but also the leap into electronic typesetting
                </p>
            </div>
            <div className="b-container">
                <Agentbox image={agentImg3}  name="Hejer"/>
                <Agentbox image={agentImg1}  name="Aymen"/>
                <Agentbox image={agentImg3}  name="Karima"/>

            </div>
        </div>
    )
}

export default Agent
