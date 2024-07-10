import { useState, useEffect } from "react";
import toastError from "../../errors/toastError";

import api from "../../services/api";

const useUsers = ({
	searchParam,
	showAll,
}) => {

	const [loading, setLoading] = useState(true);
	const [users, setUsers] = useState([]);

	useEffect(() => {
		
		setLoading(true);
		const delayDebounceFn = setTimeout(() => {
			const fetchUsers = async () => {
				try {
					const { data } = await api.get("/users/", {
						params: { searchParam, showAll },
					});
					setUsers(data.users);
					setLoading(false);
				} catch (err) {
					setLoading(false);
					toastError(err);
				}
			};

			fetchUsers();
		}, 500);
		return () => clearTimeout(delayDebounceFn);
	}, [searchParam,showAll]);

	
	return { users, loading };
};

export default useUsers;
