import { useEffect, useState } from 'react';
import './App.css';

export function App() {
  const [repos, setRepos] = useState([] as any[]);
  const [isLoading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const data = await fetch('http://localhost:4000/repos', {});
      const repoData = await data.json();
      // repoData.forEach((cur: any) => {
      //   console.log(cur.id);
      //   return 0;
      // });
      setRepos(repoData);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ol>
          {repos.map((item, index) => (
            <li key={index}>
              {item.name},{item.description},{item.language},{item.forks}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
