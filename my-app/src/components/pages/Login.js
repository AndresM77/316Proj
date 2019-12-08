import React from 'react';
import { useForm, useField } from "react-form";
import Cookies from "universal-cookie";
import validatePassword from "./Signup"
const cookies = new Cookies();

async function sendToServer(values) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return values;
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
            await sendToServer(values);
            await cookies.set("climateAction", values.username);
            window.location.replace("/");
        }
    })

    return (
        <div>
            <div><h2 className="titleItem">Log In</h2></div>
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
    )
}

export default Login;
