import { RepoProps } from "../types/repo";
import { UserProps } from "../types/user";

import Repo from "../components/Repo";
import BackBtn from "../components/BackBtn";


import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import classes from "./Repos.module.css";
import Loader from "../components/Loader";

import { MdLocationPin } from "react-icons/md";

import { MdOutlineBusinessCenter } from "react-icons/md";

import { IoPeopleCircleOutline, IoPeopleCircle } from "react-icons/io5";

import { FaCodeBranch } from "react-icons/fa";

const Repos = () => {
  const { username } = useParams();

  const [repos, setRepos] = useState<RepoProps[] | [] | null>(null);
  const [reposData, setReposData] = useState<RepoProps[]>([]);
  
  const [user] = useState<UserProps | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);

  

  useEffect(() => {
    const loadrepos = async function (username: string) {
      setIsLoading(true);

      const res = await fetch(`https://api.github.com/users/${username}/repos`);

      const data = await res.json();

      setIsLoading(false);

      let orderedRepos = data.sort(
        (a: RepoProps, b: RepoProps) => b.stargazers_count - a.stargazers_count
      );

      orderedRepos = orderedRepos.slice(0, 5);

      setRepos(orderedRepos);
      setReposData(orderedRepos);
    };

    if (username) {
      loadrepos(username);
    }
  }, [username]);

 
  const handleSearch = (searchValue: string) => {
    const reposCopy = [...reposData];
    const filteredRepos: RepoProps[] = reposCopy.filter(
      (product: RepoProps) => {
        return product.name
        .toLowerCase()
        .includes(searchValue.toLowerCase().trimEnd());
      }
    );
    setRepos(filteredRepos)
  };

  if (!repos && isLoading) return <Loader />;

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
   <div className={classes.container}>
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

	<div className={classes.repos}>
      <BackBtn />
      <h2>Explore os repositórios do usuário: {username}</h2> 
      {user && <Profile {...user}/>}
      <div className={classes.repos_search}>
      <h3>Pesquisar Projeto:</h3>
          <input
          className="search-input" 
          type="text"
          placeholder="Pesquisar projeto..."
          onChange={(e) => {handleSearch(e.target.value)}}
          />
      </div>
	  	  {repos?.length ? (
        <div className={classes.repos_container}>
          {repos.map((repo: RepoProps) => (
            <Repo key={repo.name} {...repo} />
          ))}
        </div>
      ) : 
      (
        <p>Não há repositórios.</p>
      )}
    </div>
   </div>
 );
};
};

export default Repos;