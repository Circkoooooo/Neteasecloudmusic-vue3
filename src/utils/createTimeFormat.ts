export default (timestamp: number) => {
	const date = new Date(timestamp);
	const year = date.getFullYear();
	const month = date.getMonth();
	const day = date.getDate();

	let newMonth = (month + 1).toString();
	let newDay = day.toString();
	if (month < 10) {
		newMonth = `0${newMonth}`;
	}
	if (day < 10) {
		newDay = `0${(newDay)}`;
	}
	return `${year}-${newMonth}-${newDay}`;
};
