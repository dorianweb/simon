import { React, useState, useEffect } from "react";

const Home = (props) => {
  const { passPlaying, childScores, passUsername, usern } = props;
  const [fscores, setFscores] = useState();
  useEffect(() => {
    setFscores(childScores);
  }, [childScores]);
  return (
    <>
      <div>
        <table>
          <thead>
            <tr>
              <th>pseudo</th>
              <th>score</th>
            </tr>
          </thead>
          <tbody>
            {fscores &&
              fscores.map((score) => {
                return (
                  <tr key={score.id}>
                    <td>{score.username}</td>
                    <td>{score.score / 60}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <input
          type="text"
          value={props.usern ? props.usern : ""}
          onChange={(e) => passUsername(e.target.value)}
        />
        <div
          onClick={(e) => {
            passPlaying(true);
          }}
        >
          play
        </div>
      </div>
    </>
  );
};

export default Home;
