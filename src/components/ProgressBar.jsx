function ProgressBar({ completed, total }) {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="progress-container">
      <p>
        ✅ {completed} of {total} tasks completed
      </p>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export default ProgressBar;
