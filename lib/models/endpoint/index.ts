export interface NewEndpoint {
	user_id: string;
	name: string;
	body: string;
	is_active: boolean;
	is_public: boolean;
	users_allowed: string[];
	methods_allowed: string[];
}

/**
 * The information sent to the microservice
 */
export interface EndpointRequest extends NewEndpoint {
	account_id: string;
	// create_at: string;
	// updated_at: string;
	// user_id: string;
	// name: string;
	// body: string;
	// is_active: boolean;
	// is_public: boolean;
	// users_allowed: string[];
	// methods_allowed: string[];
}

/**
 * The information retrieve from the microservice
 */
export interface EndpointResponse extends NewEndpoint {
	_id: string;
	__v: number;
	account_id: string;
	times_used: number;
	create_at: string;
	updated_at: string;
	// user_id: string;
	// name: string;
	// body: string;
	// is_active: boolean;
	// is_public: boolean;
	// users_allowed: string[];
	// methods_allowed: string[];
}
