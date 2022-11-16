const { transactionsModel } = require('../models');
const { 
  validateUserToCredited,
  validateBalance,
  validateUserTodebited,
} = require('./validations/transactionsValidations');

const getTransactions = async (user) => {
  const transactions = await transactionsModel.getTransactions(user);
  return { type: null, message: transactions };
};

const transfer = async (request) => {
  const userCreditedIsValid = await validateUserToCredited(request);
  if (userCreditedIsValid.type) return userCreditedIsValid;
 
  const userDebitedIsValid = await validateUserTodebited(request);
  if (userDebitedIsValid.type) return userDebitedIsValid
 
  const isTheBalanceEnough = await validateBalance(request);
  if (isTheBalanceEnough.type) return isTheBalanceEnough;
  
  const transfer = await transactionsModel.transfer(request);
  return { type: null, message: transfer };
};

module.exports = {
  getTransactions,
  transfer,
}