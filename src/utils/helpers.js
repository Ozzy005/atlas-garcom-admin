import { date } from 'quasar'

const floatToMoney = (float) => {
  return parseFloat(float).toLocaleString('pt-BR', { minimumFractionDigits: 2 })
}

function moneyToFloat(str) {
  if (isMoney(str)) {
    return parseFloat(str.replace('.', '').replace(',', '.'))
  }
  return isNumber(str) ? parseFloat(str) : 0
}

function isMoney(value) {
  const pattern = /^[R\$]?[ ]?\d{1,3}(\.\d{3})*,[0-9]{2}$/
  return pattern.test(value)
}

function isNumber(value) {
  if (!value) return false
  return !isNaN(Number(value))
}

function limitString(str, num) {
  if (str.length > num) {
    return str.substring(0, num) + '...'
  }
  return str
}

function brDate(str) {
  const timeStamp = new Date(str)
  const formattedString = date.formatDate(timeStamp, 'YYYY-MM-DD')
  return formattedString
}

function brDateTime(str) {
  const timeStamp = new Date(str)
  const formattedString = date.formatDate(timeStamp, 'YYYY-MM-DD HH:mm:ss')
  return formattedString
}

function validateCpf(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf == '') return false;
  if (cpf.length != 11 ||
    cpf == "00000000000" ||
    cpf == "11111111111" ||
    cpf == "22222222222" ||
    cpf == "33333333333" ||
    cpf == "44444444444" ||
    cpf == "55555555555" ||
    cpf == "66666666666" ||
    cpf == "77777777777" ||
    cpf == "88888888888" ||
    cpf == "99999999999")
    return false;
  let add = 0;
  for (let i = 0; i < 9; i++)
    add += parseInt(cpf.charAt(i)) * (10 - i);
  let rev = 11 - (add % 11);
  if (rev == 10 || rev == 11)
    rev = 0;
  if (rev != parseInt(cpf.charAt(9)))
    return false;
  add = 0;
  for (let i = 0; i < 10; i++)
    add += parseInt(cpf.charAt(i)) * (11 - i);
  rev = 11 - (add % 11);
  if (rev == 10 || rev == 11)
    rev = 0;
  if (rev != parseInt(cpf.charAt(10)))
    return false;
  return true;
}

export {
  floatToMoney,
  moneyToFloat,
  isNumber,
  isMoney,
  limitString,
  brDate,
  brDateTime,
  validateCpf
}
