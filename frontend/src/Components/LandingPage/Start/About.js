import React from 'react'
import landing from '../../../assets/land.jpg'
import './landing.css'

export default function About() {
  return (
    <div className="about" style={{marginTop:"-5%"}}>
    <div className="about-text">
        <h2>We Are The Best <br/>Real Company T</h2>
        <p>
        There are many variations of passages of Lorem Ipsum available,
         but the majority have suffered alteration in some form, by i
         njected humour, or randomised words which don't look even sl
         ightly believable. If you are going to use a passage of Lore
         m Ipsum, you need to be sure there isn't anything embarrassi
        </p>
        <button>View More Details </button>
    </div>
    <div className="about-model">
        <img src={landing} alt="about"/>
    </div>
    
</div>
  )
}
