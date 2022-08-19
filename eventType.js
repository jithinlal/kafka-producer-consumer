import avsc from 'avsc';

export default avsc.Type.forSchema({
	type: 'record',
	fields: [
		{
			name: 'category',
			type: { type: 'enum', symbols: ['CAT', 'DOG'] },
		},
		{ name: 'noise', type: 'string' },
	],
});
