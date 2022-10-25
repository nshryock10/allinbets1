//Generates an index for the user based on the length of the database
//INPUT: database array from main App
//OUTPUT: id field for user infomation that matches array input, integer
export const generateUserIndex = (dataBase) => {
    const id = dataBase.length;
    return id; 
}

//Returns the index of a selected user 
//INPUT: the userName of interest and the dataSet (dataBase)
//OUTPUT: The index of the input username, integer
export const getUserIndex = (userName, dataSet) => {
    if(userName !== "Select User"){
        const userIndex = dataSet.filter(user => user.userInfo.userName === userName);
        return userIndex[0].index;}
    else{
        return null;
    }
}

//Function updates the score of the questions that have answers
//INPUT: user questions & answers (userAnswers) and the question key (questionKey)
//OUTPUT: array with objects that include the score
export const scoreAnswers = (userAnswers, questionKey) => {

    const keyLength = questionKey.length
    let key = questionKey;
    let answers = userAnswers;
    let totalScore = 0;

    for(let i = 0; i < keyLength; i++){
        let answer = answers[i].answer;
        let keyAnswer = key[i].answer;

        //If there is an answer and the answer equals the key then score = points 
        if(keyAnswer !== null && answer === keyAnswer){
            answers[i].score = key[i].points;
            totalScore += key[i].points;
        }else if(keyAnswer !== null && answer !== keyAnswer){
            answers[i].score = 0;
        }
    }

    return [answers, totalScore];
}

//Assigns the payout for users based on score and pot
//INPUT: Total Pot and UserData base
//OUTPUT: 
export const setPayOut = (pot, dataBase) => {

  //Return an empty array if there is no data passed. 
  if(dataBase.length === 0){
    return [];
  }
  //Set payout structure
  const payout = [(0.75 * pot), (0.20 * pot), (0.05 * pot)]

  //Scenario
    //Multiplace tie

  //Sort dataBase by score usign sortList function
  const sortedData = sortList(dataBase, 'score');
  
  for(let i=0; i< payout.length; i++){
    sortedData[i].payout = payout[i];
  }

  return sortedData;
}

//Sorts a list of arrays based on the sort field indicated
//INPUT: The list to be sorted and the sort field (only score and username)
//OUTPUT: The sorted list
export const sortList = (list, field) => {

    const sorted = [...list].sort((a, b) => {
        
        if(field === 'score'){

            return (
                a['score'].toString().localeCompare(b['score'].toString(), 'en', {numeric: true})
            )*-1

        }else if(field === 'userName'){
            
            return (
                a['userInfo']['userName'].toString().localeCompare(b['userInfo']['userName'].toString(), 'en', {numeric: true})
            )

        }
    });

    return sorted;
}

//Searches user names in the data base and returns the most relevent value
//INPUT: Search term from search bar and data base
//OUTPUT: most relevent search term
export const searchUserName = (query, list) => {
    let match;
    if(query){
        match = list.find(user => {
        if(user.userInfo.userName.toLowerCase().includes(query.toLowerCase())){
            return user;
        }
    })}
    if(match){
        //Return the object and display name, score, and payout on homepage
        return [match.userInfo.userName, match.payout, match.score]
    }else{
        return null;
    }

}

//Create paypal order

//Gets table data from backend data base
//Connect to data base once backend is ready
export const getData = () => {
    return ([{
        userInfo: {
          email: 'chad@email.com',
          name:'Chad',
          userName: 'chad',
          mm: '10',
          dd: '28',
          yyyy: '1993',
          paymentTerms: false
        },
        questions: [{
            id: 1,
            question: 'Who will win SB MVP?',
            options: ['Tom Brady', 'Deshaun Watson', 'Nick Chubb', 'Other'],
            answer: 'Tom Brady',
            score: null
         },
         {
            id: 2,  
            question: 'Who will score the first touchdown?',
            options: ['Browns', 'Bucaneers'],
            answer: 'Browns',
            score: null
          },
          {
            id: 3,
            question: 'What brand will the first commercial be?',
            options: ['Beer', 'Insurance', 'Car', 'Other'],
            answer: 'Beer',
            score: null
          },
          {
            id: 4,
            question: 'What will be the first point scored?',
            options: ['Touchdown', 'Field Goal', 'Other'],
            answer: 'Touchdown',
            score: null
           },
          {
            id: 5,
            question: 'Will there be a turnover',
            options: ['Yes', 'No'],
            answer: 'Yes',
            score: null
          },
          {
            id: 6,
            question: 'What will the total points scored?',
            answer: '56',
            score: null
          }],
        paymentInfo: {
          paymentMethod: null,
          paymentComplete: false,
          paymentTerms: true,
          orderId: '123456',
        },
        score: 0,
        payout: 0,
        index: 0
      },
      {
        userInfo: {
          email: 'karen@email.com',
          name:'Karen',
          userName: 'karen',
          mm: '05',
          dd: '31',
          yyyy: '1993',
          paymentTerms: false
        },
        questions: [{
            id: 1,
            question: 'Who will win SB MVP?',
            options: ['Tom Brady', 'Deshaun Watson', 'Nick Chubb', 'Other'],
            answer: 'Nick Chubb',
            score: null
         },
         {
            id: 2,
            question: 'Who will score the first touchdown?',
            options: ['Browns', 'Bucaneers'],
            answer: 'Bucaneers',
            score: null
          },
          {
            id: 3,
            question: 'What brand will the first commercial be?',
            options: ['Beer', 'Insurance', 'Car', 'Other'],
            answer: 'Car',
            score: null
          },
          {
            id: 4,
            question: 'What will be the first point scored?',
            options: ['Touchdown', 'Field Goal', 'Other'],
            answer: 'Field Goal',
            score: null
           },
           {
            id: 5,
            question: 'Will there be a turnover',
            options: ['Yes', 'No'],
            answer: 'No',
            score: null
          },
          {
            id: 6,
            question: 'What will the total points scored?',
            answer: '45',
            score: null
          }],
        paymentInfo: {
          paymentMethod: null,
          paymentComplete: '1',
          paymentTerms: true,
          orderId: '12345',
        },
        score: 0,
        payout: 0,
        index: 1
      },
      {
        userInfo: {
          email: 'blake@email.com',
          name:'Blake',
          userName: 'blake',
          mm: '07',
          dd: '08',
          yyyy: '2021',
          paymentTerms: false
        },
        questions: [{
            id: 1,
            question: 'Who will win SB MVP?',
            options: ['Tom Brady', 'Deshaun Watson', 'Nick Chubb', 'Other'],
            answer: 'Nick Chubb',
            score: null
         },
         {
            id: 2,
            question: 'Who will score the first touchdown?',
            options: ['Browns', 'Bucaneers'],
            answer: 'Bucaneers',
            score: null
          },
          {
            id: 3,
            question: 'What brand will the first commercial be?',
            options: ['Beer', 'Insurance', 'Car', 'Other'],
            answer: 'Beer',
            score: null
          },
          {
            id: 4,
            question: 'What will be the first point scored?',
            options: ['Touchdown', 'Field Goal', 'Other'],
            answer: 'Field Goal',
            score: null
           },
           {
            id: 5,
            question: 'Will there be a turnover',
            options: ['Yes', 'No'],
            answer: 'Yes',
            score: null
          },
          {
            id: 6,
            question: 'What will the total points scored?',
            answer: '42',
            score: null
          }],
        paymentInfo: {
          paymentMethod: null,
          paymentComplete: '1',
          paymentTerms: true,
          orderId: '1234',
        },
        score: 0,
        payout: 0,
        index: 2
      }])
}

//Returns the answer key
//Need to connect to data base
//INPUT: TBD
//OUTPUT: Answer Key
export const getAnswerKey = () => {
    return([{
        id: 1,
        question: 'Who will win SB MVP?',
        answer: 'Tom Brady',
        points: 1
     },
     {
        id: 2,  
        question: 'Who will score the first touchdown?',
        answer: 'Browns',
        points: 1
      },
      {
        id: 3,
        question: 'What brand will the first commercial be?',
        answer: 'Beer',
        points: 1
      },
      { 
        id: 4,
        question: 'What will be the first point scored?',
        answer: 'Field Goal',
        points: 1
      },
      {
        id: 5,
        question: 'Will there be a turnover',
        answer: null,
        points: 1
      },
      {
        id: 6,
        question: 'What will the total points scored?',
        answer: '42',
        points: 3
      }])
}

//Returns the question list
//Need to connect to data base
//INPUT: TBD
//OUTPUT: Question list
export const getQuestions = () => {
  return ([
    {
      id: 1, 
      question: 'Who will win SB MVP?',
      options: ['Tom Brady', 'Deshaun Watson', 'Nick Chubb', 'Other'],
      answer: '',
      score: null
    },
    {
      id: 2,
      question: 'Who will score the first touchdown?',
      options: ['Browns', 'Bucaneers'],
      answer: '',
      score: null
     },
     {
      id: 3,
      question: 'What brand will the first commercial be?',
      options: ['Beer', 'Insurance', 'Car', 'Other'],
      answer: '',
      score: null
     },
     {
      id: 4,
      question: 'What will be the first point scored?',
      options: ['Touchdown', 'Field Goal', 'Other'],
      answer: '',
      score: null
     },
     {
      id: 5,
      question: 'Will there be a turnover',
      options: ['Yes', 'No'],
      answer: '',
      score: null
    },
     {
      id: 6,
      question: 'What will the total points scored?',
      answer: '',
      score: null
     }
  ]);
}