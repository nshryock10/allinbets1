import '../App';
import './Answers.css';
import { useEffect, useState } from 'react';
import { getUserIndex, sortList } from '../utils/utils';

function Answers(props) {

  const [selectedUser, setSelectedUser] = useState('Select User');
  const [userIndex, setUserIndex] = useState(null);
  const [users, setUsers] = useState(props.dataBase);
  const [sortedUsers, setSortedUsers] = useState(sortList(props.dataBase))

  useEffect(() =>{
      setUserIndex(getUserIndex(selectedUser, users));
    }, [selectedUser]);

  useEffect(() => {
    setSortedUsers(sortList(users, 'userName'));
  }, [])


  return (
    <div >
        <h1 >View your scores</h1>
        <label className="select-label">Pick a user to view</label>
        
        <select
            value={selectedUser}
            className="select-dropdown"
            onChange={(e) => {setSelectedUser(e.target.value)}}
          >
            <option 
                value={"Select User"}
                key={'A'}
                disabled
              >
                  Select User
              </option>
            {sortedUsers.map((user, index) => 
              <option 
                key={index}
                value={user.userInfo.userName}
              >
                  {user.userInfo.userName}
              </option>
            )}
        </select>

        {userIndex !== null && users[userIndex].questions.map( (question, index) => (
          <div
            key={index}
            className="main-container"
          >
            <div className="card-container questionCard">
              <div className="question-container">
                <p className="question question-text">{question.question}</p>
                <p className="answer question-text">{question.answer}</p> 
              </div>
              {(question.score !== null && question.score > 0) ? 
              (<p className=" score correct-score">+{question.score}</p>) : 
              (<p className="score incorrect-score"> {question.score}</p>)}
            </div>
            
            
          </div>
        ))}

    </div>
  );
}
// 
//
export default Answers;