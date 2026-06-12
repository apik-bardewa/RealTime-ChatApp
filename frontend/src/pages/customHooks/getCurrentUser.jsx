

import axios from "axios";
import { useEffect } from "react";
import { serverurl } from "../../main";
import { useDispatch } from "react-redux";
import { setuserData } from "../../redux/userSlice";

function useCurrentUser() {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await axios.get(
                    `${serverurl}/api/user/current`,
                    { withCredentials: true }
                );

                dispatch(setuserData(result.data.user));
            } catch (error) {
                console.log("current user error:", error.message);
            }
        };

        fetchUser();
    }, []); // ✅ FIXED (RUN ONLY ONCE)
}

export default useCurrentUser;
