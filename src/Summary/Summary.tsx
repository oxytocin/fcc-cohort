import React, {Fragment} from 'react';
import {Container, Table, Button} from 'react-bootstrap';
import {config} from '../Constants'
import {testData} from '../In-Game/in-game-data'

function ScoreSummary() {
  const rankedScores = testData.allScores.sort((a, b) => b.score - a.score)
  const numQuestions = testData.numQuestions

  const clickReturn = () => {
    const url = config.CREATE_OR_JOIN
    window.location.href = url
  }

  return(
  <Container fluid className="bg-dark p-3 border border-2 rounded">

    <h1 data-cy="summary" className="text-white mb-3">Score Summary</h1>
    <Table data-cy="table" size="sm" striped hover responsive="sm" className="table table-secondary w-75 mx-auto">
      <thead>
        <tr data-cy="table-headers">
          <th data-cy="user" scope="col">User</th>
          <th data-cy="score" scope="col">Score</th>
          <th data-cy="rank" scope="col">Rank</th>
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
    <Button data-cy="return-btn" variant="success" className="mx-1" onClick={clickReturn}>Return</Button>
  </Container>
  );
}

export default ScoreSummary;