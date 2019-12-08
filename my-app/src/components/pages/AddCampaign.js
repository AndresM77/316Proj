import React from 'react';
import { useForm, useField } from "react-form";
const uuidv5 = require('uuid/v5');

const MY_NAMESPACE = '9BBA0079-D29E-450B-ADAE-C940D364E47D';

async function sendToServer(values) {
    let CID = uuidv5(values.description, MY_NAMESPACE);
    values.CID = CID;
    console.log(values);
    try {
        await fetch("http://frank.colab.duke.edu:3002/api/v1/campaign", {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => console.log(res))
    } catch (e) {
        console.log("error")
        console.error(e)
    }
    return values;
  }

async function validateName(name, instance) {
    if(!name) {
        return "A name is required";
    }

    if(name.length > 50) {
        return "Name is too long";
    }

    return false;
}

async function validateDescription(description, instance) {
    if(!description) {
        return "A description is required";
    }

    if(description.length > 200) {
        return "Description is too long";
    }

    return false;
}

async function validateNumber(number, instance) {
    if(!number) {
        return "A goal is required";
    }

    if(isNaN(number)) {
        return "Goal is not a number";
    }

    return false;
}

async function validateLink(link, instance) {
    if(!link) {
        return "An email is required";
    }

    const regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (!regexp.test(link)) {
        return "A valid link is required";
    }

    return false;
}


function TitleField() {
    const {
        meta: { error, isTouched, isValidating },
        getInputProps
    } = useField("name", {
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

function DescriptionField() {
    const {
        meta: { error, isTouched, isValidating },
        getInputProps
    } = useField("description", {
        validate: validateDescription
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

function GoalField() {
    const {
        meta: { error, isTouched, isValidating },
        getInputProps
    } = useField("goal", {
        validate: validateNumber
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

function PaylinkField() {
    const {
        meta: { error, isTouched, isValidating },
        getInputProps
    } = useField("paylink", {
        validate: validateLink
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

const AddCampaign = () => {
        const {
            Form,
            meta: { isSubmitting, canSubmit}
        } = useForm({
            onSubmit: async (values, instance) => {
                await sendToServer(values);
                // window.location.replace("/campaign");
            }
        })

        return (
            <div>
                <div><h2 className="titleItem">Add Campaign</h2></div>
                <Form>
                    <div>
                        <label>
                            Title: <TitleField />
                        </label>
                    </div>
                    <div>
                        <label>
                            Description: <DescriptionField />
                        </label>
                    </div>
                    <div>
                        <label>
                            Goal: <GoalField />
                        </label>
                    </div>
                    <div>
                        <label>
                            Pay Link: <PaylinkField />
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

export default AddCampaign;
