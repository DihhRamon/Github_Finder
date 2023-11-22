import { RepoProps } from "../types/repo";

import Repo from "../components/Repo";
import BackBtn from "../components/BackBtn";
import Loader from "../components/Loader";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import classes from "./Repos.module.css";


const Repos = () => {
  const { username } = useParams();
  const [repos, setRepos] = useState<RepoProps[]>([]);
  const [reposData, setReposData] = useState<RepoProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect

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

  return (
    <div className={classes.repos}>
      <BackBtn />
      <h2>Explore os repositórios do usuário: {username}</h2>

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
      ) : (
        <p>Não há repositórios.</p>
      )}
    </div>
  );
};

export default Repos;