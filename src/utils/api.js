import { v4 as uuid4 } from 'uuid';
//const { v4: uuidv4 } = require("uuid");

const API_ENDPOINT = "http://localhost:3000";

//Get all users from database
export const getUsers = async () => {
    const response = await fetch(`${API_ENDPOINT}/users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
          }
    })

    const users = await response.json();
    
    return users;
}

//Get user payment info
export const getPaymentInfo = async () => {
    const response = await fetch(`${API_ENDPOINT}/paymentinfo`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
          }
    })

    const paymentInfo = await response.json();

    return paymentInfo;
}

export const getUserAnswers = async (id) => {
    
    const response = await fetch(`${API_ENDPOINT}/answers/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
          }
    })

    const answers = await response.json();

    return answers;
}

export const getQuestions = async () => {
    const response = await fetch(`${API_ENDPOINT}/questions`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
          }
    })

    const questions = await response.json();

    return questions;
}

//Add user to data base
export const addUser = async (user) => {

//Generate new Id
const newId = uuid4();

const userInfo = {
    id: newId,
    name: user.userInfo.name,
    username: user.userInfo.userName,
    birthday: `${user.userInfo.yyyy}-${user.userInfo.mm}-${user.userInfo.dd}`,
    email: user.userInfo.email,
    use_terms: user.userInfo.useTerms
};
const answers = user.questions;
const paymentInfo = {
    paymentTerms: user.paymentTerms,
    paymentComplete: user.paymentComplete,
    paymentMethod: user.paymentMethod,
    orderId: user.orderId
}

    const response = await fetch(`${API_ENDPOINT}/users`, {
        //Extract user information from the form
        method: "POST",
        body: JSON.stringify({
            userInfo: userInfo,
            questionAnswers: answers,
            paymentInfo: paymentInfo
        }
        ),
        headers: {
            "Content-Type": "application/json",
          }
    })
    response.json();

}