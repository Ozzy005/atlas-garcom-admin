import { date } from 'quasar'

const helpers = class {
  static floatToMoney (float) {
    return parseFloat(float).toLocaleString('pt-BR', { minimumFractionDigits: 2 })
  }

  static moneyToFloat (str) {
    if (this.isMoney(str)) {
      return parseFloat(str.replace('.', '').replace(',', '.'))
    }
    return this.isNumber(str) ? parseFloat(str) : 0
  }

  static isMoney (value) {
    const pattern = /^[R$]?[ ]?\d{1,3}(\.\d{3})*,[0-9]{2}$/
    return pattern.test(value)
  }

  static isNumber (value) {
    if (!value) return false
    return !isNaN(Number(value))
  }

  static limitString (str, num) {
    if (str.length > num) {
      return str.substring(0, num) + '...'
    }
    return str
  }

  static brDate (str) {
    const timeStamp = new Date(str)
    const formattedString = date.formatDate(timeStamp, 'DD-MM-YYYY')
    return formattedString
  }

  static brDateTime (str) {
    const timeStamp = new Date(str)
    const formattedString = date.formatDate(timeStamp, 'DD-MM-YYYY HH:mm:ss')
    return formattedString
  }

  static nifMask (str) {
    if (!str) {
      return null
    }

    let mask
    if (str.length === 11) {
      mask = '###.###.###-##'
    } else {
      mask = '##.###.###/####-##'
    }

    str = str.replace(/\s/g, '')

    for (let i = 0; i < str.length; i++) {
      mask = mask.replace(/#/, str.charAt(i))
    }

    return mask
  }

  static phoneMask (str) {
    if (!str) {
      return null
    }

    let mask = '(##) #####-####'

    str = str.replace(/\s/g, '')

    for (let i = 0; i < str.length; i++) {
      mask = mask.replace(/#/, str.charAt(i))
    }

    return mask
  }

  static zipCodeMask (str) {
    if (!str) {
      return null
    }

    let mask = '#####-###'

    str = str.replace(/\s/g, '')

    for (let i = 0; i < str.length; i++) {
      mask = mask.replace(/#/, str.charAt(i))
    }

    return mask
  }

  static removeMask (str) {
    if (!str) {
      return str
    }

    return str.replace(/[^A-Za-z0-9]/g, '')
  }

  static cpfCnpj (nif) {
    nif = this.removeMask(nif)

    if (nif.length === 11) {
      const result = this.validateCpf(nif)
      return result
    } else {
      const result = this.validateCnpj(nif)
      return result
    }
  }

  static validateCpf (cpf) {
    cpf = cpf.replace(/[^\d]+/g, '')

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return false
    }

    let sum = 0
    let mod

    for (let i = 1; i <= 9; i++) {
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i)
    }

    mod = (sum * 10) % 11

    if ((mod === 10) || (mod === 11)) {
      mod = 0
    }

    if (mod !== parseInt(cpf.substring(9, 10))) {
      return false
    }

    sum = 0

    for (let i = 1; i <= 10; i++) {
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i)
    }

    mod = (sum * 10) % 11

    if ((mod === 10) || (mod === 11)) {
      mod = 0
    }

    if (mod !== parseInt(cpf.substring(10))) {
      return false
    }

    return true
  }

  static validateCnpj (cnpj) {
    console.log(cnpj)
    cnpj = cnpj.replace(/[^\d]+/g, '')

    if (cnpj.length !== 14) {
      return false
    }

    if (/^(\d)\1+$/.test(cnpj)) {
      return false
    }

    let sum = 0
    for (let i = 0; i < 12; i++) {
      sum += parseInt(cnpj.charAt(i)) * (i < 4 ? 5 - i : 13 - i)
    }
    let mod = sum % 11
    const digit1 = mod < 2 ? 0 : 11 - mod
    if (parseInt(cnpj.charAt(12)) !== digit1) {
      return false
    }

    sum = 0
    for (let i = 0; i < 13; i++) {
      sum += parseInt(cnpj.charAt(i)) * (i < 5 ? 6 - i : 14 - i)
    }
    mod = sum % 11
    const digit2 = mod < 2 ? 0 : 11 - mod
    if (parseInt(cnpj.charAt(13)) !== digit2) {
      return false
    }

    return true
  }
}

export default helpers
