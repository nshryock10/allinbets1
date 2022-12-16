import React from 'react';
import '../App';
import './Table.css';
import * as Icon from 'react-bootstrap-icons';
import TableRow from './TableRow';
import { useState, useEffect } from 'react';
import { searchUserName } from '../utils/utils';
import { scoreAnswers, getAnswerKey, setPayOut } from '../utils/utils';

function Table(props) {

    const data = props.data;
    const payData = props.payData;
    const answerKey = getAnswerKey();
    const columns = [
        {label: 'User', accessor: 'username'},
        {label: 'Score', accessor: 'score'},
        {label: 'Payout', accessor: 'payout'}
    ]

    const [tableData, setTableData] = useState(data);
    const [query, setQuery] = useState(null);
    const [searchResult, setSearchResult] = useState(null);

    useEffect(() => {
        setTableData(data);
        //Update and implement new payout method
        /*
        const getPayout = async (data) => {
            const payOut = await setPayOut(props.pot, data)
            setTableData(payOut);
        }
        

        const setScorePayout = async (data) => {
            getPayout(data);
        }
        */
        
        //*** Add new GET request for answer key and score answers in App.js */
        //score data  
        /* 
        const newState = data.map(user => {
            const [newScores, totalScore] = scoreAnswers(user, answerKey);
            return {...user, questions: newScores, score: totalScore}
        }) 
        
    
        //Set table data as sorted and scored
        setScorePayout(newState);
        */
    }, [data])

 
    useEffect(() => {
        if(query === null || query.length > 0){
          setSearchResult(searchUserName(query, tableData))
        }else{
          setSearchResult(null)
        }
      }, [query])

  return (
  <div className="table-container">
        <div className="table-top">
            <h3 className="pf">Live Leaderboard and Payouts</h3>
            <form className="search-form">
                <label className="pf form-label">Find your score</label>
                <div className="search-bar" id="table-search-bar">
                    <Icon.Search  className="search-icon"/>
                    <input className="text-input" placeholder="username" onChange={(e)=> {setQuery(e.target.value)}} ></input>
                </div>
            </form>
            
        </div>
        <table>
            <thead>
                <tr className="table-row">
                    {columns.map(({ label, accessor })=> {
                        return <th key={accessor}>{label}</th>
                    }) 
                    }
                </tr>
            </thead>
            {(query !== null && searchResult !== null) && 
                <tbody>
                        <tr className="search-row">
                            <td>{searchResult[0]}</td>
                            <td>{searchResult[2]}</td>
                            <td>{`$${searchResult[1]}`}</td>                       
                        </tr>
                </tbody>
            }
            <TableRow users={tableData} payData={payData} columns={columns} />
        </table>
    </div>
  );
}

export default Table;