import user from './user';

const initialState = {
	shippingOptions: []
}

const shippingOptions = (state=initialState, action) => {
	switch(action.type) {
		case "SEND_SHIPPING_OPTIONS_TO_CLIENT":
		return action.shippingOptions

		



		default:
			return []
	}
}

export default shippingOptions;