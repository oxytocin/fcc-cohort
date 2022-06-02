import React, {Fragment} from 'react';
import {Container, Table, Button} from 'react-bootstrap';

  // score would be determined as: {user_correct_responses}/{deck.length} //

function ScoreSummary() {

  const testData = [
    {user:"Guy1", score: 10},
    {user:"Guy4", score: 14},
    {user:"Guy2", score: 11},
    {user:"Guy3", score:12}
  ].sort((a, b) => b.score - a.score)

  return(
  <Container fluid className="bg-dark min-vh-100">
    <div className="position-absolute top-50 start-50 translate-middle p-5 bg-gradient border border-2 rounded">
        <h1 data-cy="summary" className="text-white mb-3">Score Summary</h1>

        <Table data-cy="table" striped className="table table-light" style={{width:500}}>
          <thead>
            <tr data-cy="table-headers">
              <th data-cy="user" scope="col">User</th>
              <th data-cy="score" scope="col" colSpan={2}>Score</th>
              <th data-cy="rank" scope="col">Rank</th>
            </tr>
          </thead>

          <tbody data-cy="table-body">
              {testData.map((item, i) => {
                  return (
                        <Fragment>
                        <tr>
                            <th scope="row">{item.user}</th>
                            <td colSpan={2}>{item.score} / {/*deck.length, example 15*/}15</td>
                            <td>{i+1}</td>
                        </tr>
                    </Fragment>
                  );
                })}
            </tbody>
          <tfoot>
              <tr>
                <th data-cy="host" scope="row">HostName</th>
                <td data-cy="host-score" colSpan={2}>15{/*hostScore*/} / 15{/*deck.length*/}</td>
                <td data-cy="host-blank">--</td>
              </tr>
          </tfoot>
        </Table>

      <Button data-cy="return-btn" variant="success" size="lg" className="mx-1">Return to Room</Button>
    </div>
  </Container>
  );
}

export default ScoreSummary;