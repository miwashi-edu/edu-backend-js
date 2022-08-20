/**
 * @group unit
 */

 const calculator = require('../calculator.js')

 test ('Calculator should add!', () =>{
     expect(calculator.add('1')).toBe(1)
 })