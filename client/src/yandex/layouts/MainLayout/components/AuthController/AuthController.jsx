import React, { useEffect } from "react";
import { useAuth } from "../../../../providers/AuthProvider/AuthProvider";
import { useDispatch } from "react-redux";
import { reSignInWithLocalStorageData } from "../../../../store/auth";



const AuthController = () => {
    const { isSigned } = useAuth()
    const dispatch = useDispatch()

    useEffect(() => {

        if (!isSigned) dispatch(reSignInWithLocalStorageData())

    }, [])


    useEffect(() => {
    }, [])



    return <></>
}

export default AuthController