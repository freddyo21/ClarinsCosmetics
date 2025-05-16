import { FormEvent, useState } from "react";
import "./change-password.css";
import { Button, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { Cookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { toastrError, toastrInfo, toastrSuccess } from "../../../utils/toastr";
import { changePassword, oldPasswordConfirmation } from "../../../services/users/user.service";

export default function ChangePassword() {
    const [page, setPage] = useState(1);
    const [passwordVerified, setPasswordVerified] = useState(false);

    const submitOldPass = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const cookie = new Cookies().get("user-token");

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData) as any;
        data.id = jwtDecode(cookie).sub;

        toastrInfo("Info", "Verifying your password...");
        oldPasswordConfirmation(data).then((res) => {
            if (res.status === 200) {
                toastrSuccess("Success", res.data.message);
                setPasswordVerified(true);
            }
        }).catch((error) => {
            toastrError("Error", error.response.data.message)
        })
    }

    const changePage = (rule: "prev" | "next") => {
        setPage(rule === "prev" ? page - 1 : page + 1);
    }

    const validatePassword = (data: { password: string, password_confirm: string }) => {
        if (data.password.trim().length < 8) {
            toastrError("Error", "Password must be at least 8 characters long");
            return false;
        }

        if (data.password !== data.password_confirm) {
            toastrError("Error", "Passwords do not match");
            return false;
        }

        const hasUpperCase = /[A-Z]/.test(data.password);
        const hasLowerCase = /[a-z]/.test(data.password);
        const hasNumber = /\d/.test(data.password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(data.password);
        if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
            toastrError("Error", "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character");
            return false;
        }

        const hasWhitespace = /\s/.test(data.password);
        if (hasWhitespace) {
            toastrError("Error", "Password must not contain whitespace");
            return false;
        }

        return true;
    }

    const submitPassChange = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const cookie = new Cookies().get("user-token");

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData) as any;

        console.log(data);
        console.log(validatePassword(data));

        if (!validatePassword(data)) {
            return;
        }

        const id = Number(jwtDecode(cookie).sub);

        toastrInfo("Info", "Changing your password...");
        changePassword(id, data.password).then((res) => {
            if (res.status === 201) {
                toastrSuccess("Success", res.data.message);
                setPasswordVerified(true);
            }
        }).catch((error) => {
            toastrError("Error", error.response.data.message)
        })
    }

    return (
        <>
            <div className="change-password__container">
                <div className={`change-password__old-pass-confirmation${page !== 1 ? " d-none" : ""}`}>
                    <div className="my-3 text-center">
                        <h3 className="text-2xl">Verify your password</h3>
                    </div>

                    <div>
                        <form onSubmit={submitOldPass}>
                            <FormGroup className="mb-3">
                                <FormLabel>Enter your old password</FormLabel>
                                <FormControl type="password" name="password" />
                            </FormGroup>
                        </form>
                    </div>
                </div>

                <div className={`change-password__new-pass-input${page !== 2 ? " d-none" : ""}`}>
                    <div className="my-3 text-center">
                        <h3 className="text-2xl">Enter your new password</h3>
                    </div>

                    <div>
                        <form onSubmit={submitPassChange}>
                            <FormGroup className="mb-3">
                                <FormLabel>New password</FormLabel>
                                <FormControl type="password" name="password" />
                            </FormGroup>

                            <FormGroup className="mb-3">
                                <FormLabel>Confirm new password</FormLabel>
                                <FormControl type="password" name="password_confirm" />
                            </FormGroup>

                            <Button variant="gradient-primary" type="submit">Change password</Button>
                        </form>
                    </div>
                </div>

                <div className="d-flex justify-content-end mt-3">
                    {/* {page !== 1 && <Button variant="gradient-primary" onClick={() => changePage("prev")}>Back to previous page</Button>} */}
                    {page !== 2 && <Button variant="gradient-primary" onClick={() => changePage("next")}
                        disabled={!passwordVerified}>To the next page</Button>}
                </div>
            </div >
        </>
    )
}