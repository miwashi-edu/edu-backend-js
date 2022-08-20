/**
 * @group integration
 */

 const calculator = require('../calculator.js')

 test ('Calculator should add!', () => {
     expect(calculator.add('1, 1')).toBe(2)
 })

 test ('Calculator should add!', () => {
    expect(calculator.add('2, 3')).toBe(5)
})