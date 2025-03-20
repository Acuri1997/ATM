//variables
let amount = 350;
let transactionStatus = "";
let transactionHistory = [];
let array = ["user1", "user2", "user3"];
let userList = document.getElementById("user-list"); 


// 
array.forEach(function(user) {
  let listItem = document.createElement("li"); 
  listItem.textContent = user; 
  userList.appendChild(listItem); 
});


//Query Selectors-----------------------------------------------------------
const loginScreen = document.querySelector("#login-screen");
const loginForm = document.querySelector("#login-form");
const userNameInput = document.querySelector("#username");
const pinInput = document.querySelector("#pin");
const loginError = document.querySelector("#login-error");
const logOutBtn = document.querySelector(".logout-btn");
const dashboard = document.querySelector("#dashboard");
const transactionScreen = document.querySelector("#transaction-screen");
const transactionInput = document.querySelector("#transaction-amount");
const transactionError = document.querySelector("#transaction-error");
const depositBtn = document.querySelector("#deposit-btn");
const withdrawBtn = document.querySelector("#withdraw-btn");
const balance = document.querySelector("#balance");
const historyScreen = document.querySelector("#history-screen");
const transactionList = document.querySelector("#history-list");

//functions ------------------------------------------------------------------
const openTransactionScreen = () => {
  dashboard.classList.remove("active");
  historyScreen.classList.add("active");
  transactionHistory.forEach((transaction) => {
    const li = document.createElement("li");
    li.textContent = transaction;
    transactionList.appendChild(li);
  });
};

const openUserListScreen = () => {
   
    dashboard.classList.remove("active");
    userListScreen.classList.add("active");  
}


const transactionClick = () => {
  dashboard.classList.remove("active");
  transactionScreen.classList.add("active");
};

const updateBalance = (balanceAmount) => {
  amount += balanceAmount;
  balance.textContent = `${amount} $`;
  console.log(amount);
};

const confirmDeposit = () => {
  let depositAmount = Number(transactionInput.value);
  if (depositAmount < 1) {
    transactionError.textContent = "You cannot deposit less than 1 $";
  } else {
    transactionInput.value = "";
    transactionError.textContent = `Successfully deposited ${depositAmount} $`;
    transactionError.classList.remove("error");
    transactionError.classList.add("success");
    updateBalance(depositAmount);
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    transactionHistory.push(
      `You have deposited ${depositAmount} $ at ${day}/${month}/${year} ${hour}:${minute}`
    );
  }
};

const confirmWithdraw = () => {
  let withdrawAmount = Number(transactionInput.value);
  if (withdrawAmount > amount) {
    transactionError.textContent = "You cannot withdraw more than your balance";
  } else {
    transactionInput.value = "";
    transactionError.textContent = `Successfully withdrew ${withdrawAmount} $`;
    transactionError.classList.remove("error");
    transactionError.classList.add("success");
    updateBalance(-withdrawAmount); //-200
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    transactionHistory.push(
      `You have withdraw ${withdrawAmount} $ at ${day}/${month}/${year} ${hour}:${minute}`
    );
  }
};

const confirmTransaction = () => {
  if (transactionStatus === "deposit") {
    confirmDeposit();
  } else {
    confirmWithdraw();
  }
};

const cancelTransaction = () => {
  transactionScreen.classList.remove("active");
  dashboard.classList.add("active");
  transactionError.classList.remove("success");
  transactionError.classList.remove("error");
  transactionError.textContent = "";
  transactionInput.value = "";
};

//Event Listeners ------------------------------------------------------------
//Login Screen ----------------------------------------------------------------
loginForm.addEventListener("submit", (e) => {
  e.preventDefault(); //mos te behet refresh faqja
  const username = userNameInput.value;
  const pin = pinInput.value;

  if (username !== "user" || pin !== "1234") {
    loginError.textContent = "Wrong credentials, Try again please";
    userNameInput.value = "";
    pinInput.value = "";
  } else {
    loginScreen.classList.remove("active");
    dashboard.classList.add("active");
  }
});

if (logOutBtn) {
  logOutBtn.addEventListener("click", () => {
    dashboard.classList.remove("active");
    loginScreen.classList.add("active");
    userNameInput.value = "";
    pinInput.value = "";
  });
}

depositBtn.addEventListener("click", () => {
  transactionStatus = "deposit";
  transactionClick();
});

withdrawBtn.addEventListener("click", () => {
  transactionStatus = "withdraw";
  transactionClick();
});

//style ------------------------------------------------------------
loginScreen.classList.add("active");
balance.textContent = `${amount} $`;

const backBtn = document.querySelector("#back-btn");

backBtn.addEventListener("click", ()=>{
  historyScreen.classList.remove("active");
  dashboard.classList.add("active")
});