import { useEffect, useState } from 'react';
import '../App';
import './Table.css';
import { getUsers } from '../utils/api';

function TableRow(props) {

    const columns = props.columns;
    const [userData, setUserData] = useState([]);


  useEffect(() => {
    //Get payment info
      getPayments();
  }, [])

  const getPayments = async () => {

    const setMainPaymentInfo = (userData) => {
      setUserData(userData);
    }

    const userData = await getUsers();
    setMainPaymentInfo(userData);
  }

  //User efffect to score the rows when data base is updated

  return (
      
      
      <tbody>
        {userData.length === 0 && <tr>Loading....</tr>}

        {userData.length > 0 && userData.map((user) => {
          //Check if user completed payment before displaying
          if(user.paid){
          return (
            <tr key={user.id}>
              {columns.map(({ accessor }) => {
            
              let tData = '-';
              if(accessor === 'username'){
                tData = user.username;
              }else if(accessor === 'score'){
                tData = user.score;
              }else if(accessor === 'payout'){
                tData = `$${user.payout}`;
              }

              return <td key={accessor}>{tData}</td>;
              
            })}

        </tr>);}
        })}

      </tbody>
  );
}

export default TableRow;