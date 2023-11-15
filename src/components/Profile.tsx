import { UserProps } from "../types/user";

import { MdLocationPin } from "react-icons/md";

import { MdOutlineBusinessCenter } from "react-icons/md";

import { IoPeopleCircleOutline, IoPeopleCircle } from "react-icons/io5";

import { FaCodeBranch } from "react-icons/fa";

import classes from "./Profile.module.css"

const Profile = ({
    avatar_url, 
    name,
    login,
    location,
    company,
    followers,
    following,
    public_repos,
}: UserProps) => {
  return (
    <div className={classes.profile}>
        <div className={classes.profile_avatar}>  
          <img src={avatar_url} alt={login} />
        </div>
        <div className={classes.profile_user}>
          <h2>{name}</h2>
          <p>{login}</p>
          <div className={classes.profile_location}>
          {location && (
            <p className={classes.location}>
            <MdLocationPin />
            <span>{location}</span>
            </p>
          )}
          </div>
        </div>
        <div>
          <MdOutlineBusinessCenter /> 
          <span>{company}</span>
        </div>
        <div>
          <IoPeopleCircleOutline />
          <span>{followers}</span>
        </div>
        <div>
          <IoPeopleCircle />
          <span>{following}</span>
        </div>
        <div>
          <FaCodeBranch />
          <span>{public_repos}</span>
        </div>    
        
    </div>
  );
};

export default Profile