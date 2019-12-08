import React from 'react';
import { useForm, useField } from "react-form";
import Cookies from "universal-cookie";
const cookies = new Cookies();



async function sendToServer(values) {
    try {
        await fetch("/api/v1/users", {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json"
            }
        })
    } catch (e) {
        console.error(e)
    }
    return values;
  }

async function validateName(name, instance) {
    if(!name) {
        return "A first name is required";
    }

    if(name.length > 32) {
        return "First name is too long";
    }

    return false;
}

async function validatePassword(name, instance) {
    if(!name) {
        return "A password is required";
    }

    if(name.length > 32) {
        return "Password is too long";
    }

    return false;
}

async function validateLastName(name, instance) {
    if(!name) {
        return "A last name is required";
    }

    if(name.length > 32) {
        return "Last name is too long";
    }

    return false;
}

async function validateUsername(name, instance) {
    if(!name) {
        return "A username is required";
    }

    if(name.length > 32) {
        return "Name is too long";
    }

    try {
        const result = await fetch("http://frank.colab.duke.edu:3002/api/v1/users/validate/username", {
            method: "POST",
            mode: "cors",
            body: JSON.stringify({username: name}),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const json = await result.json()

        if(!json.result) {
            return "That username is taken.";
        }
    } catch (e) {
        console.error(e)
    }

    return false;
}

async function validateEmail(name, instance) {
    if(!name) {
        return "An email is required";
    }

    if(name.length > 32) {
        return "Name is too long";
    }

    try {
        const result = await fetch("http://frank.colab.duke.edu:3002/api/v1/users/validate/username", {
            method: "POST",
            mode: "cors",
            body: JSON.stringify({username: name}),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const json = await result.json()

        if(!json.result) {
            return "That email is taken.";
        }
    } catch (e) {
        console.error(e)
    }

    return false;
}


function FirstNameField() {
    const {
        meta: { error, isTouched, isValidating },
        getInputProps
    } = useField("firstName", {
        validate: validateName
    });

    return (
        <>
            <input {...getInputProps()} />{" "}
            {isValidating ? (
                <em>Validating...</em>
            ) : isTouched && error ? (
                <em>{error}</em>
            ) : null}
        </>
    )
}

function LastNameField() {
    const {
        meta: { error, isTouched, isValidating },
        getInputProps
    } = useField("lastName", {
        validate: validateLastName
    });

    return (
        <>
            <input {...getInputProps()} />{" "}
            {isValidating ? (
                <em>Validating...</em>
            ) : isTouched && error ? (
                <em>{error}</em>
            ) : null}
        </>
    )
}

function UsernameField() {
    const {
        meta: { error, isTouched, isValidating },
        getInputProps
    } = useField("username", {
        validate: validateUsername
    });

    return (
        <>
            <input {...getInputProps()} />{" "}
            {isValidating ? (
                <em>Validating...</em>
            ) : isTouched && error ? (
                <em>{error}</em>
            ) : null}
        </>
    )
}

function PasswordField() {
    const {
        meta: { error, isTouched, isValidating },
        getInputProps
    } = useField("password", {
        validate: validatePassword
    });

    return (
        <>
            <input type="password" {...getInputProps()} />{" "}
            {isValidating ? (
                <em>Validating...</em>
            ) : isTouched && error ? (
                <em>{error}</em>
            ) : null}
        </>
    )
}

function EmailField() {
    const {
        meta: { error, isTouched, isValidating },
        getInputProps
    } = useField("email", {
        validate: validateEmail
    });

    return (
        <>
            <input {...getInputProps()} />{" "}
            {isValidating ? (
                <em>Validating...</em>
            ) : isTouched && error ? (
                <em>{error}</em>
            ) : null}
        </>
    )
}

const SignUp = () => {
        const {
            Form,
            meta: { isSubmitting, canSubmit}
        } = useForm({
            onSubmit: async (values, instance) => {
                let result = await sendToServer(values);
                console.log(result)
                await cookies.set("climateAction", values.username);
                // window.location.replace("/");
            }
        })

        return (
            <div>
                <div><h2 className="titleItem">Sign Up</h2></div>
                <div className="form">
                <Form>
                    <div>
                        <label>
                            First Name: <FirstNameField />
                        </label>
                    </div>
                    <div>
                        <label>
                            Last Name: <LastNameField />
                        </label>
                    </div>
                    <div>
                        <label>
                            Username: <UsernameField />
                        </label>
                    </div>
                    <div>
                        <label>
                            Password: <PasswordField />
                        </label>
                    </div>
                    <div>
                        <label>
                            Email: <EmailField />
                        </label>
                    </div>
                    <div>
                        <button type="submit" disabled={!canSubmit}>
                        Submit
                        </button>
                    </div>

                    <div>
                        <em>{isSubmitting ? "Submitting..." : null}</em>
                    </div>
                </Form>
                </div>
            </div>
        )
    }

export default SignUp;
