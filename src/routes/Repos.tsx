import { RepoProps } from "../types/repo";

import Repo from "../components/Repo";
import BackBtn from "../components/BackBtn";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import classes from "./Repos.module.css";
import Loader from "../components/Loader";

const Repos = () => {
  const { username } = useParams();

  const [repos, setRepos] = useState<RepoProps[] | [] | null>(null);
  const [search, setSearch] = useState("");

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
    };

    if (username) {
      loadrepos(username);
    }
  }, [username]);

 
  const filteredRepos = search.length > 0
  ? repos?.filter((repo) => repo.name.toLowerCase().includes(search)) : [];

  if (!repos && isLoading) return <Loader />;

  return (
    <div className={classes.repos}>
      <BackBtn />
      <h2>Explore os repositórios do usuário: {username}</h2> 
      
      {repos && repos.length === 0 && <p>Não há repositórios.</p>}
      {repos && repos.length > 0 && (
        <div className={classes.repos_container}>
          <h3>Pesquisar:</h3>
        <div>
          <input
          className="search-input" 
          type="text"
          placeholder="Digite para pesquisar..."
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          />

      {search.length > 0 ? (
        <ul>
          {filteredRepos?.map(repo => {
            return (
            <li key={repo.name}> 
             {repo.name}
            </li>
          )
        })}
      </ul>
      ) : (
        <ul>
          {repos?.map(repo => {
            return (
              <li key={repo.name}>
                {repo.name}
              </li>
              );
          })}
        </ul>
      )
        }


      </div>
          {repos.map((repo: RepoProps) => (
            <Repo key={repo.name} {...repo} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Repos;