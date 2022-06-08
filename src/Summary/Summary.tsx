import React, {Fragment} from 'react';
import {Container, Table, Button} from 'react-bootstrap';
import {testData} from '../In-Game/in-game-data'
import {useNavigate} from 'react-router-dom'

function ScoreSummary() {
  const rankedScores = testData.allScores.sort((a, b) => b.score - a.score)
  const numQuestions = testData.numQuestions

  const navigate = useNavigate();

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
                  <th scope="row">{item.user}</th>
                  <td>{item.score} / {numQuestions}</td>
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