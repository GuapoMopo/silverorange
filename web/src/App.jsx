import { useEffect, useState } from 'react';
import './App.css';
import ElementList from './components/ElementList';
import RepoInfomation from './components/RepoInformation';

export function App() {
  const [repos, setRepos] = useState([]);
  const [sortRepo, setSortRepo] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [repoTrigger, setRepoTrigger] = useState(false);
  const [selectedRepoName, setSelectedRepoName] = useState('');

  const fetchData = async () => {
    try {
      const data = await fetch('http://localhost:4000/repos', {});
      if (!data.ok) {
        throw Error('Could not fetch data');
      }
      const repoData = await data.json();
      const repoDateSorted = repoData.sort((a, b) => {
        return a.created_at.localeCompare(b.created_at);
      });
      setRepos(repoDateSorted);
      setSortRepo(repoDateSorted);
      setLoading(false);
      setError('');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="error">Oops: {error}</div>
        ) : repoTrigger ? (
          <RepoInfomation
            setRepoTrigger={setRepoTrigger}
            selectedRepoName={selectedRepoName}
            repos={repos}
          />
        ) : (
          <ElementList
            sortRepo={sortRepo}
            setSortRepo={setSortRepo}
            repos={repos}
            setRepos={setRepos}
            setRepoTrigger={setRepoTrigger}
            setSelectedRepoName={setSelectedRepoName}
          />
        )}
      </div>
    </div>
  );
}
