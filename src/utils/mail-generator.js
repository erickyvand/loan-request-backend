import Mailgen from 'mailgen';

const mailGenerator = new Mailgen({
	theme: 'default',
	product: {
		name: 'Bank Officer',
		link: 'https://example.com',
	},
});

export default mailGenerator;
