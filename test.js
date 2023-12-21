

// function arePalindromesOfEachOther(number1, number2) {
//     const numString1 = String(number1);
//     const numString2 = String(number2);

//     if (numString1.length != numString2.length) {
//         return false
//     }

//     for (let i = 0; i < numString1.length; i++) {
//         if (numString1[i] != numString2[numString2.length - 1 - i]) {
//             return false
//         }
//     }

//     return true
// }

// const startDate = new Date('2023-01-01');
// const endDate = new Date('2023-12-31');

// let currentDate = new Date(startDate);

// while (currentDate <= endDate) {
//     const day = currentDate.getDate()
//     const month = currentDate.getMonth() + 1
//     if(arePalindromesOfEachOther(day,month))
//         console.log(`Date: ${day}, Month: ${month}`)

//     currentDate.setDate(currentDate.getDate() + 1)
// }
const chiefsArr= []
const { faker } = require('@faker-js/faker')
    for (let i = 0; i < 3; i++) {
    chiefsArr.push(faker.person.fullName())

}
console.log(chiefsArr)