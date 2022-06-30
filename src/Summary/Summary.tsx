import {Fragment, useContext} from 'react';
import {Container, Table, Button} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'
import {GameContext} from "../App";

function ScoreSummary() {
  const navigate = useNavigate();
  const gameContext = useContext(GameContext);
  const finalScores = gameContext.finalScores;
  const rankedScores = finalScores.sort((a, b) => b.score - a.score);
  const totalQuestions = gameContext.totalQuestions;

  return(
    <Container fluid className="bg-dark p-3 border border-2 rounded">

      <h1 data-cy="summary" className="text-white mb-3">Score Summary</h1>
      <Table data-cy="table" size="sm" striped hover responsive="sm" className="table table-secondary w-75 mx-auto">
        <thead>
          <tr data-cy="table-headers">
            <th scope="col">User</th>
            <th scope="col">Score</th>
            <th scope="col">Rank</th>
          </tr>
        </thead>
        <tbody data-cy="table-body">
          {rankedScores.map((item, i) => {
              return (
                <Fragment>
                  <tr>
                    <th scope="row">{item.username}</th>
                    <td>{item.score} / {totalQuestions}</td>
                    <td>{i+1}</td>
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
      </Table>
      <Button data-cy="return-btn" variant="success" className="mx-1" onClick={()=>{navigate("/create-or-join")}}>Return</Button>
    </Container>
    );
}

export default ScoreSummary;
