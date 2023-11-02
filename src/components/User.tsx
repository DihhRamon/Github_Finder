import { UserProps } from "../types/user";

import { MdLocationPin } from "react-icons/md";

import { Link } from "react-router-dom";

import classes from "./User.module.css";

const User = ({
    login,
    avatar_url,
    followers,
    following,
    location,
}: UserProps) => {
  return (
    <div className={classes.user}>
      <div className={classes.lines}></div>
        <div className={classes.imgBx}>  
          <img src={avatar_url} alt={login} />
        </div>
        <div className={classes.content}>
          <div className={classes.details}>
          <h2>{login}</h2>
          {location && (
            <p className={classes.location}>
            <MdLocationPin />
            <span>{location}</span>
            </p>
          )}
      <div className={classes.stats}>
        <div>
           <p>Seguidores:</p>
           <p className={classes.number}>{followers}</p> 
        </div>
        <div>
           <p>Seguindo:</p>
           <p className={classes.number}>{following}</p> 
        </div>
      </div>
        <Link to={`/repos/${login}`}>Ver melhores projetos</Link>
        </div>  
      </div>
    </div>
  );
};

export default User