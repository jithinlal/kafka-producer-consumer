import kafka from 'node-rdkafka';
import eventType from '../eventType.js';

const stream = kafka.Producer.createWriteStream(
	{
		'metadata.broker.list': 'localhost:9092',
	},
	{},
	{ topic: 'test' },
);

function getRandomAnimal() {
	const categories = ['DOG', 'CAT'];
	return categories[Math.floor(Math.random() * categories.length)];
}

function getRandomNoise(category) {
	if (category === 'CAT') {
		const noises = ['purr', 'meow'];
		return noises[Math.floor(Math.random() * noises.length)];
	} else if (category === 'DOG') {
		const noises = ['woof', 'bark'];
		return noises[Math.floor(Math.random() * noises.length)];
	}
}

function queueMessage() {
	const category = getRandomAnimal();
	const noise = getRandomNoise(category);
	const event = { category, noise };
	const success = stream.write(eventType.toBuffer(event));
	if (success) {
		console.log('message wrote successfully to stream');
	} else {
		console.log('something went wrong');
	}
}

setInterval(() => {
	queueMessage();
}, 3000);
