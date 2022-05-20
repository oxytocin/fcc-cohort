import React, {Fragment} from 'react';
import {Container, Table, Button} from 'react-bootstrap';

                            // score would be determined as: {user_correct_responses}/{deck.length} //
const testData = [{user:"Guy1", score: 10}, {user:"Guy4", score: 14},
                    {user:"Guy2", score: 11}, {user:"Guy3", score:12}]
                    .sort((a, b) => b.score - a.score)

function ScoreSummary() {

    return(
    <Container fluid className="bg-dark min-vh-100">
        <div className="position-absolute top-50 start-50 translate-middle p-5 bg-gradient border border-2 rounded">
            <h1 className="text-white mb-3">Score Summary</h1>
            <Table striped className="table table-light" style={{width:500}}>
              <thead>
                <tr>
                  <th scope="col">User</th>
                  <th scope="col" colSpan={2}>Score</th>
                  <th scope="col">Rank</th>
                </tr>
              </thead>
              <tbody>
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
                    <th scope="row">HostName</th>
                    <td colSpan={2}>15{/*hostScore*/} / 15{/*deck.length*/}</td>
                    <td>--</td>
                  </tr>
              </tfoot>
            </Table>
        <Button variant="success" size="lg" className="mx-1">Return to Room</Button>
        </div>
    </Container>
    );
}

export default ScoreSummary;