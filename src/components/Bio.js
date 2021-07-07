import React,{Component} from 'react';
import avatar from './avatar.png';
import 'react-mdl/extra/material.css';
import wallpaper from './wall1.jpg'
import {Layout,Header,Navigation,Drawer,Content} from 'react-mdl';
//import Main from './main';
import {Link} from 'react-router-dom';
import './biocss.css';
import ReactDOM from 'react-dom';
import { SocialIcon } from 'react-social-icons';
import PropTypes from "prop-types";

class bio extends Component{
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
      }
    constructor(props) {
        super(props);
          this.state = { id:''}
    }
    render(){
        
        var name="Anonymous";
        name=this.props.location.state.id
        return(


        
          


            // <div><h1>HEY THERE MIND YOUR OWN BUSINESS..</h1></div>
            <div className="background" style ={{width:'100%',margin:'auto'}} styles={{ backgroundImage:`url(${wallpaper})` }}>
                <img className="profile" src={avatar} alt="AVATAR" className="avatar-img" />
                <br/>
                <br/>
                <div className="nam"> <h2>{name}</h2></div>
                <br/>
                <br/>
                <div className="para">
             XYZ currently serves as an Associate Professor in the Department of Computer Science & Engineering, School of Engineering, Amrita Vishwa Vidyapeetham, Coimbatore. He has received his Bachelor’s degree in Computer Science and Engineering (University first rank) from Mahatma Gandhi University, Kerala, India in 2004 and Masters and PhD degrees from National University of Singapore in 2008 and 2012 respectively. He brings in a decade of industry experience in various companies including Sasken Communication Technologies, NXP semiconductors and most recently at Progress software. He has handled several roles in the software industry including QA Architect, Technical Support Manager, Engineering development and Technology Evangelist.
             He has strong inclination towards Game Theory. He applies game theory for handling conflicts, enforcing cooperation and for multi-agent systems. His technical knowledge and experience are in various areas including Cloud/Edge/Fog Computing Paradigms (including cloud platforms, Node.js and containers), Computer Networks, Software Engineering practices (Agile) and Quality Analysis, Economic models (Game Theoretic principles) and current day practices on cloud-based enterprise architectures, Internet of Things (IoT) based systems, Machine Learning and technology for traditional Indian dance (such as Kathakali) popularization. 
                </div>

                <br/>
                <br/>
                <br/>
                <br/>
                <SocialIcon className='twitter' url="http://twitter.com" />
                <div/>
                <SocialIcon className='gmail' url="http://gmail.com" />
                <div/>
                <SocialIcon className='github' url="http://github.com" />
                <div/>
                
            </div>
        
        )
    }
}
export default bio;