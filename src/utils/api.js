const API_ENDPOINT = "http://localhost:3000";


//Add user
export const addUser = async (user) => {
console.log('Updating database...')
const userInfo = {
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
    const newUser = await response.json();

    return newUser;
}