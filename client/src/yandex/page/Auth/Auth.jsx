import React, { useEffect, useRef, useState } from "react";
import FormGroup from "../../components/FormComponents/FormGroup";
import FormRow from "../../components/FormComponents/FormRow";
import GenTextInput from "../../components/ui/Inputs/GenTextInput";
import { useFormHandlers } from "../../hooks/useFormHandlers/useFormHandlers";
import mySuperValidator, { validateCheckings } from "../../utils/mySuperValidator";
import { Link, useHistory, useLocation } from "react-router-dom";
import Content from "../../layouts/MainLayout/components/Content";


import "./Auth.scss"
import { useDispatch } from "react-redux";
import { sign } from "../../store/auth";
import { useAuth } from "../../providers/AuthProvider/AuthProvider";
import Loader from "../../components/ui/Loader/Loader";
import ToTopScroller from "../../components/ToTopScroller/ToTopScroller";

const SIGN_KEYS = {
    signIn: "signIn",
    signUp: "signUp",
}

const SwitchSign = {
    mainTitle: {
        [SIGN_KEYS.signUp]: "Регистрация",
        [SIGN_KEYS.signIn]: "Войти"
    },
    SignLinkText: {
        [SIGN_KEYS.signUp]: "Уже есть аккаунт? Войти",
        [SIGN_KEYS.signIn]: "Еще нет аккаунта? Зарегистрироваться"
    },
    SignLinkConfig: {
        [SIGN_KEYS.signUp]: {
            to: {
                pathname: "/auth",
                search: `?type=signIn`,
            }
        },
        [SIGN_KEYS.signIn]: {
            to: {
                pathname: "/auth",
                search: `?type=signUp`,
            }
        }
    },
    submitButtonText: {
        [SIGN_KEYS.signUp]: "Зарегистрироваться",
        [SIGN_KEYS.signIn]: "Войти"
    }

}

const Auth = (a) => {
    const dispatch = useDispatch()
    const location = useLocation()

    const { isSigned, userId, loadingStatus } = useAuth()
    const history = useHistory()
    const [isSignIn, setIsSignIn] = useState(SIGN_KEYS.signIn)
    const [errors, setErrors] = useState({})
    const [isShowPassword, setIsShowPassword] = useState(false)
    const refNotTouched = useRef([])
    const [isFormValid, setIsFormValid] = useState(false)

    const redirectedUrl = useRef()

    useEffect(() => {

    }, [])


    const isSaveFirstInitingStateRef = useRef(true)

    useEffect(() => {
        const queryParameters = new URLSearchParams(location.search)
        let query = {}
        try {
            for (const [key, value] of (queryParameters.entries())) {
                query = { ...query, [key]: value }
            }

        } catch (error) {

        }



        setErrors({})
        refNotTouched.current = []
        clearFilters()

        redirectedUrl.current = query?.redirected
        switch (query?.type) {
            case SIGN_KEYS.signUp:
                setIsSignIn(prev => SIGN_KEYS.signUp)
                break;
            default:
                setIsSignIn(prev => SIGN_KEYS.signIn)
                break;
        }


    }, [location])


    useEffect(() => {

        if (isSigned) {
            const redirected = redirectedUrl.current
            redirectedUrl.current = undefined
            history.push(redirected ? `/${redirected}` : "/user/" + userId)
        }
    }, [loadingStatus, userId])



    const onStateChanged = (newState, isSaveFirstInitingState, isFirstInit) => {

        if (isFirstInit) return

        const e = mySuperValidator.validator({
            state: refState.current,
            notValidateKeysArray: refNotTouched.current,
            validatingMethodsForKeys_MapObj: {
                email: validateCheckings.isEmail,
                password: validateCheckings.isPassword
            }
        })

        setErrors(prev => e)

        if (!Object.keys(e).length && !refNotTouched.current.length) {
            setIsFormValid(prev => true)
        } else {
            setIsFormValid(false)
        }
    }

    const onLoadingValToState = (objValue, srcValue, value, mainKey, paramsForFuncWhenCopy) => {
        const isFirstInit = paramsForFuncWhenCopy?.isFirstInit
        if (isFirstInit) {

            updateNotTochedArr({ isFirstInit, name: mainKey?.[0], firstRender: objValue ? false : true })
        }
    }


    const updateNotTochedArr = ({ isFirstInit, name, firstRender = false, touched = false }) => {
        if (!name) return

        if (isFirstInit) {
            if (!refNotTouched.current.includes(name))
                refNotTouched.current.push(name)
            return
        } else if (touched) {
            refNotTouched.current = refNotTouched.current.filter(n => n !== name)
        }




    }


    const {
        refState,
        loadValToState,
        syntheticState,
        downloadAndSetSyntheticState,
        // createAndSetSyntheticState,
        togglerClearState,
        clearFilters,
        // refIsFirstInit_flag
    } = useFormHandlers({
        initialState: {},
        syntheticRandomStateGetter: () => ({ userName: "Mr. Tester", email: "test@test.test", password: "tEsTpAsSwOrD_2007" }),
        onLoadingValToState: onLoadingValToState,
        onStateChanged: onStateChanged,
        isSaveFirstInitingStateRef: isSaveFirstInitingStateRef,
        onTryingSetSyntheticState: () => updateNotTochedArr({ isSyntheticStateIniting: true }),
        debug: true
    })





    const handleSubmit = async (e) => {
        e?.preventDefault()
        const err = mySuperValidator.validator({
            state: refState.current,
            notValidateKeysArray: undefined,
            validatingMethodsForKeys_MapObj: {
                email: validateCheckings.isEmail,
                password: validateCheckings.isPassword
            }
        })
        if (err && Object.keys(err).length) {
            setErrors(prev => err)
        } else {
            dispatch(sign({ type: isSignIn, ...refState.current }))
            setIsStartTesting(false)
        }
    }
    const refAuthWrapper = useRef()
    const refShadower = useRef()
    const [isStartTesting, setIsStartTesting] = useState(false)


    const startInitTestUser = async () => {

        const smth = await downloadAndSetSyntheticState()

        const [promises, ,] = smth

        Promise.all([promises]).then(() => {

            const timeout = setTimeout(() => {
                handleSubmit({ preventDefault: () => { } })

                clearTimeout(timeout)

            }, 1000)
        })
    }

    useEffect(() => {
        if (isStartTesting && isSignIn === SIGN_KEYS.signIn) {
            startInitTestUser()
        }
    }, [isSignIn])

    useEffect(() => {
        if (isStartTesting) {
            if (isSignIn === SIGN_KEYS.signIn) {
                startInitTestUser()
            }
            else {
                setIsSignIn(prev => SIGN_KEYS.signIn)
            }
        }
    }, [isStartTesting])
    useEffect(() => {
        if (
            isStartTesting
            || loadingStatus === "loading"
        ) {
            refFormContainer.current.classList.add("blured")
        } else {
            refFormContainer.current.classList.remove("blured")
        }

        if (isStartTesting && loadingStatus === "error") {
            setTimeout(() => setIsStartTesting(false), 1000)
        }
    }, [isStartTesting, loadingStatus])

    const refFormContainer = useRef()

    return <Content>
        <div ref={refShadower} className="Auth__shadower"></div>
        <ToTopScroller />
        <div
            ref={refAuthWrapper}
            className={"Auth__wrapper card"}>
            {(isStartTesting || loadingStatus === "loading")
                && <div className="Auth__loader">
                    <div className="Auth__loader-shadower"></div>
                    <Loader />
                </div>
            }

            <div
                ref={refFormContainer}
                className="Auth__blurer"
            >


                <form
                    className="Auth__form"

                    key={"form" + togglerClearState}
                    onSubmit={handleSubmit}>

                    <div className="Auth__form__main">





                        <FormGroup label={SwitchSign.mainTitle[isSignIn]}>
                            {isSignIn === SIGN_KEYS.signUp && <FormRow
                                label={"Ваше Имя:"}
                                errorsState={errors?.userName}
                            >
                                <GenTextInput
                                    key={"userName"}
                                    name={"userName"}
                                    placeholder={"Введите имя..."}
                                    onChange_flag={true}
                                    onBlur={() => {

                                        updateNotTochedArr({ name: "userName", touched: true })
                                    }}
                                    loadValToForm={loadValToState}
                                    isWidth100={true}
                                    randomState={syntheticState}
                                />
                            </FormRow>
                            }
                            <FormRow
                                label={"Email"}
                                errorsState={errors?.email}
                            >
                                <GenTextInput
                                    name={"email"}
                                    placeholder={"Ваш email..."}
                                    onChange_flag={true}
                                    onBlur={() => updateNotTochedArr({ name: "email", touched: true })}
                                    loadValToForm={loadValToState}
                                    isWidth100={true}
                                    randomState={syntheticState}
                                />
                            </FormRow>
                            <FormRow
                                label={"Пароль"}
                                errorsState={errors?.password}
                                isErrorWrapperWidthMax={true}
                            >
                                <GenTextInput
                                    name={"password"}
                                    placeholder={"Ваш пароль..."}
                                    type={isShowPassword ? "text" : "password"}
                                    onBlur={() => updateNotTochedArr({ name: "password", touched: true })}
                                    loadValToForm={loadValToState}
                                    isWidth100={true}
                                    randomState={syntheticState}
                                    onChange_flag={true}
                                />
                                <button
                                    type="button"
                                    className="btn btn-gray-outline bi-before-pi0"
                                    style={{ height: "100%" }}
                                    onClick={() => setIsShowPassword(prev => !prev)}
                                >
                                    <i className={"bi bi-eye" + (isShowPassword ? "" : "-slash")}></i>
                                </button>
                            </FormRow>

                        </FormGroup>

                        <div

                            className="Auth__LoginByTestAcc__wrapper"
                        >
                            <div

                                onMouseEnter={() => {
                                    refAuthWrapper.current.classList.add("beautiful")
                                    refShadower.current.classList.add("beautiful")
                                }}
                                onMouseLeave={() => {
                                    if (!isStartTesting) refAuthWrapper.current.classList.remove("beautiful")
                                    if (!isStartTesting) refShadower.current.classList.remove("beautiful")
                                }}
                                className="Auth__LoginByTestAcc btn btn-gray">
                                Зайти под тестовым аккаунтом
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsStartTesting(prev => !prev)
                                    }}
                                    className="btn btn-yellow-outline">
                                    Зайти
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="Auth__actionsWrapper">
                        <button className={"btn btn-green" + (isFormValid ? "" : " disabled")}>
                            {SwitchSign.submitButtonText[isSignIn]}
                        </button>
                        <Link to={SwitchSign.SignLinkConfig[isSignIn].to}>
                            <button
                                className="btn btn-yellow-outline"
                                style={{ color: "#000", width: "100%" }}
                            >
                                {SwitchSign.SignLinkText[isSignIn]}
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    </Content >
}

export default Auth