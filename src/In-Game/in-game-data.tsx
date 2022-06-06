// Sent to back end, re-sent to front end summary
export const final = {
  score: 3, // userScore after final timer is up
  numQuestions: 4 // data.Cards.length
}

// back end must return:
export const testData = {
  numQuestions: 4,
  allScores: [
    {user:"Guy1", score: 2},
    {user:"Guy4", score: 1},
    {user:"Guy2", score: 4},
    {user:"Guy3", score: 2}
  ]
}

// Deck data model
export const data = {
  timeLimit: 10,
  Cards: [{
    Id: 0,
    Question: "this is the sample data question 1?",
    Answers: [{
          Id: 0,
          Name: "name1correct",
          Value: "value2correct",
          IsCorrect: true,
          FlashCardId: 0
          }, {
          Id: 0,
          Name: "name2correct",
          Value: "value2correct",
          IsCorrect: true,
          FlashCardId: 0
          }, {
          Id:0,
          Name: "name3false",
          Value: "value3false",
          IsCorrect: false,
          FlashCardId: 0
          }, {
          Id:0,
          Name: "name4false",
          Value: "value4false",
          IsCorrect: false,
          FlashCardId: 0
          }
      ]
  },{
    Id: 0,
    Question: "this is the sample data question 2?",
    Answers: [{
          Id: 0,
          Name: "name1correct",
          Value: "value2correct",
          IsCorrect: true,
          FlashCardId: 0
          }, {
          Id: 0,
          Name: "name2correct",
          Value: "value2correct",
          IsCorrect: true,
          FlashCardId: 0
          }, {
          Id:0,
          Name: "name3false",
          Value: "value3false",
          IsCorrect: false,
          FlashCardId: 0
          }, {
          Id:0,
          Name: "name4false",
          Value: "value4false",
          IsCorrect: false,
          FlashCardId: 0
          }
      ]
  },{
    Id: 0,
    Question: "this is the sample data question 3?",
    Answers: [{
          Id: 0,
          Name: "name1correct",
          Value: "value2correct",
          IsCorrect: true,
          FlashCardId: 0
          }, {
          Id: 0,
          Name: "name2correct",
          Value: "value2correct",
          IsCorrect: true,
          FlashCardId: 0
          }, {
          Id:0,
          Name: "name3false",
          Value: "value3false",
          IsCorrect: false,
          FlashCardId: 0
          }, {
          Id:0,
          Name: "name4false",
          Value: "value4false",
          IsCorrect: false,
          FlashCardId: 0
          }
      ]
  },{
    Id: 0,
    Question: "this is the sample data question 4?",
    Answers: [{
          Id: 0,
          Name: "name1correct",
          Value: "value2correct",
          IsCorrect: true,
          FlashCardId: 0
          }, {
          Id: 0,
          Name: "name2correct",
          Value: "value2correct",
          IsCorrect: true,
          FlashCardId: 0
          }, {
          Id:0,
          Name: "name3false",
          Value: "value3false",
          IsCorrect: false,
          FlashCardId: 0
          }, {
          Id:0,
          Name: "name4false",
          Value: "value4false",
          IsCorrect: false,
          FlashCardId: 0
          }
      ]
  }]
}