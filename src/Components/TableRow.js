import '../App';
import './Table.css';

function TableRow(props) {

    const users = props.users;
    const columns = props.columns;

  const handleClick = () => {
    console.log(users)
  }
/*
*/
  return (

    <tbody onClick={handleClick}>

      {users.map((user) => {
        return (
          <tr key={user.index}>
            {columns.map(({ accessor }) => {
        
            let tData = '-';
            if(accessor === 'userName'){
              tData = user.userInfo.userName;
            }else if(accessor === 'score'){
              tData = user.score;
            }else if(accessor === 'payout'){
              tData = `$${user.payout}`;
            }

            return <td key={accessor}>{tData}</td>;
            
          })}

      </tr>);
      })}

    </tbody>
  );
}

export default TableRow;