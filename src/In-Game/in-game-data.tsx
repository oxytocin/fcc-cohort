
// answers directly (initial test)
const sampleAnswers = [{
    Id:1222,
    Name: "FALSE 2",
    Value: "string",
    IsCorrect:false
  },
  {
    Id:1223,
    Name: "FALSE 1",
    Value: "string",
    IsCorrect:false
  },
  {
    Id:1224,
    Name: "CORRECT 1",
    Value: "string",
    IsCorrect:true
  },
  {
    Id:1225,
    Name: "CORRECT 2",
    Value: "string",
    IsCorrect:true
  }];

// Sample Question
const card = {
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
}

// Deck data model
const data = {
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
  export default data