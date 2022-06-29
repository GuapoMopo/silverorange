import { useEffect, useState } from 'react';
import '../App.css';
import ReactMarkdown from 'react-markdown';

function RepoInfomation(props) {
  const [commitObj, setCommitObj] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [readMe, setReadMe] = useState('');
  const objIndex = props.repos.findIndex(
    (i) => i.name === props.selectedRepoName
  );
  const commitURL = props.repos[objIndex].commits_url.replace('{/sha}', '');
  const readMeURL = `https://raw.githubusercontent.com/${props.repos[objIndex].full_name}/master/README.md`;
  console.log(readMeURL);
  console.log(props.repos[objIndex].full_name);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(commitURL, {});
        if (!data.ok) {
          throw Error('Could not fetch data');
        }
        const commitData = await data.json();
        setCommitObj(commitData[0]);
        setIsLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
          setIsLoading(false);
          setError(err.message);
        }
      }
    };
    const fetchReadMe = async () => {
      try {
        const data = await fetch(readMeURL, {});
        if (!data.ok) {
          throw Error('Could not fetch readMe.md');
        }
        const commitData = await data.text();
        console.log(commitData);
        console.log(readMeURL);
        setReadMe(commitData);
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        }
      }
    };
    fetchReadMe();
    fetchData();
  }, [commitURL, readMeURL]);

  return (
    <div>
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="error">Oops: {error}</div>
        ) : (
          <>
            <div className="repo-item">
              <div className="item-author">Author</div>
              <div className="item-commit-date">Commit Date</div>
              <div className="item-message">Message</div>
            </div>
            <div className="repo-item">
              <div className="item-author">
                {commitObj.commit?.author?.name}
              </div>
              <div className="item-commit-date">
                {commitObj.commit?.author?.date}
              </div>
              <div className="item-message">{commitObj.commit?.message}</div>
            </div>
          </>
        )}
      </div>
      <div className="markDown">
        <ReactMarkdown children={readMe} />
      </div>

      <button
        onClick={() => {
          props.setRepoTrigger(false);
        }}
      >
        Back
      </button>
    </div>
  );
}

export default RepoInfomation;
