import React, { useEffect, useState } from "react";
import userService from "../../services/user.service";


export const useFetchUser = (id) => {

    const [user, setUser] = useState(null)

    const fetchUser = async (id, setter) => {
        let fetchedUser = null
        if (id) {
            fetchedUser = await userService.getUserById(id)

        }
        setter(fetchedUser)
    }

    return { user, fetchUser }
}