export default (time: number) => {
	let minute = 0;
	let second = 0;

	minute = Math.floor(time / 60);
	second = Math.floor(time % 60);

	let minuteStr = '00';
	let secondStr = '00';
	if (minute >= 0 && minute < 10) {
		minuteStr = `0${minute}`;
	}
	if (minute >= 10) {
		minuteStr = `${minute}`;
	}
	if (second >= 0 && second < 10) {
		secondStr = `0${second}`;
	}
	if (second >= 10) {
		secondStr = `${second}`;
	}
	return `${minuteStr}:${secondStr}`;
};
