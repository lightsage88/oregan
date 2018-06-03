import user from './user';

const initialState = {
	id: '',
	status: '',
	type: '',
	currencyIsoCode:'',
	amount: '',
	createdAt: '',
	updatedAt: '',
	billing: {},
	shipping: {},
	customFields: {}
}

const tran_rec = (state=initialState, action) => {
	switch(action.type) {
		case 'SEND_TRANSACTION_RECORD_TO_STATE':
			return Object.assign({}, state, {
				id: action.id,
				status: action.status,
				type: action.type,
				currencyIsoCode: action.currencyIsoCode,
				amount: action.amount,
				createdAt: action.createdAt,
				updatedAt: action.updatedAt,
				billing: action.billing,
				shipping: action.shipping,
				customFields: action.customFields
			});

		default:
			return {}
	}
}

export default tran_rec