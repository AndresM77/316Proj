import React from 'react';
import { useForm, useField } from "react-form";
import Cookies from "universal-cookie";
const cookies = new Cookies();

async function sendToServer(values) {
    try {
        let res = await fetch("https://frank.colab.duke.edu:3002/api/v1/users/login", {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if(res.status == 200) {
            let data = res.json()
            return data;
        } else {
            return false;
        }

    } catch (e) {
        console.error(e)
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

async function validateUsername(name, instance) {
    if(!name) {
        return "Username is required";
    }

    if(name.length > 32) {
        return "Username entered is too long";
    }

    return false;
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

const Login = () => {
    const {
        Form,
        meta: { isSubmitting, canSubmit}
    } = useForm({
        onSubmit: async (values, instance) => {
            let result = await sendToServer(values);
            if(!result) {
                alert('Login. Wrong username or password.')
            } else if (result.result) {
                await cookies.set("climateAction", values.username);
            } else {
                alert('Login. Wrong username or password.')
            }
            window.location.replace("/");
        }
    })

    return (
        <div>
            <div><h2 className="titleItem">Log In</h2></div>
            <div className="form">
            <Form>
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

export default Login;
