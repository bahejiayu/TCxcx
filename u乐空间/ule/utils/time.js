const date = new Date()
const currentYear = date.getFullYear();//当前年
const currentMonth = date.getMonth();//当前月
const currentDate= date.getDate();//当前日
const years = [];
const years2 = [];
const months = [];
const months2 = [];
const days = [];
const days2 = [];
let yearIdx;
let monthIdx;
let dateIdx;
let index = -1;

//年
for (let i = 1990; i <= date.getFullYear(); i++) {
	index++
	if( currentYear === i) {
		yearIdx = index;
	}
	years2.push(i <= 9? '0' + i : i)
  	years.push(i <= 9? '0' + i + '年' : i + '年')
}

//月
for (let i = 1 ; i <= 12; i++) {
	if( currentMonth === i) {
		monthIdx = i;
	}
	months2.push(i <= 9? '0' + i : i)
  	months.push(i <= 9? '0' + i + '月' : i + '月')
}

//日
for (let i = 1 ; i <= 31; i++) {
	if( currentDate === i) {
		dateIdx = i-1;
	}
	days2.push(i <= 9? '0' + i : i)
	days.push(i <= 9? '0' + i + '日' : i + '日')
}

module.exports = [years, months, days];
module.exports.arr2 = [years2, months2, days2];
module.exports.idx = [yearIdx, monthIdx, dateIdx];
