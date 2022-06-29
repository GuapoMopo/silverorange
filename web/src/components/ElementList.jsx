function ElementList(props) {
  function sortLanguage(language) {
    const result = props.sortRepo.filter((item) => item.language === language);
    console.log(result);
    props.setRepos([...result]);
  }
  function displayRepoInfo(e) {
    return;
  }
  function resetRepos() {
    props.setRepos([...props.sortRepo]);
  }

  return (
    <div>
      <div className="repo-table">
        <div className="repo-item">
          <div className="item-name">Repo Name</div>
          <div className="item-desc">Description</div>
          <div className="item-lang">Language</div>
          <div className="item-forks">Forks</div>
        </div>
        {props.repos.map((item, index) => (
          <div
            key={index}
            className="repo-item"
            id={item.id}
            onClick={(e) => displayRepoInfo(e)}
          >
            <div
              className="item-name"
              onClick={() => {
                props.setSelectedRepoName(item.name);
                props.setRepoTrigger(true);
              }}
            >
              {item.name}
            </div>
            <div className="item-desc">{item.description}</div>
            <div
              className="item-lang"
              onClick={() => sortLanguage(item.language)}
            >
              {item.language}
            </div>
            <div className="item-forks">{item.forks}</div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          resetRepos();
        }}
      >
        Back
      </button>
    </div>
  );
}

export default ElementList;
