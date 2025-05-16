import { Button, FormCheck, FormControl, Table } from "react-bootstrap";
import "./user-profile.css";
import FormCheckLabel from "react-bootstrap/esm/FormCheckLabel";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import { FormEvent, useEffect, useState } from "react";
import { IUserFull } from "../../../data/User";
import { Cookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { getUserById } from "../../../services/users/user.service";
import { useNavigate } from "react-router-dom";
import { toastrError } from "../../../utils/toastr";

export default function UserProfile() {
    const [user, setUser] = useState<IUserFull | null>(null);

    const navigate = useNavigate();

    const getUser = () => {
        const token = new Cookies().get("user-token");
        const decodedToken = token ? jwtDecode(token) : null;
        if (!decodedToken) {
            return;
        }

        const userId = Number(decodedToken.sub);
        getUserById(userId).then((res) => {
            console.log(res.data);
            setUser(res.data);
        }).catch((err) => {
            console.error(err);
        });
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries()) as any;
        console.log(data);
    }

    useEffect(() => {
        const token = new Cookies().get("user-token");
        if (!token) {
            navigate("/login");
            toastrError("Error", "You must be logged in to access this page");
            return;
        }
        getUser();
    }, []);

    return (
        <>
            <div className="user-profile">
                <div className="user-profile__container">
                    <div className="user-profile__header">
                        <h1 className="text-lg">My Profile</h1>
                        <p>Manage profile to secure the account</p>
                    </div>
                    <hr style={{ borderTop: "1px solid #000" }} />
                    <div className="user-profile__body">
                        <div>
                            <form onSubmit={handleSubmit}>
                                <Table striped bordered className="user-profile__table">
                                    <tbody>
                                        <tr>
                                            <td className="text-md">Full Name</td>
                                            <td>
                                                <FormControl name="name" defaultValue={user?.name} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-md">Email</td>
                                            <td>
                                                <FormControl name="email" defaultValue={user?.email} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-md">Phone</td>
                                            <td>
                                                <FormControl name="phone" defaultValue={user?.phone} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-md">Date of Birth</td>
                                            <td>
                                                <FormControl type="date" name="dob" defaultValue={user?.dob} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-md">Gender</td>
                                            <td>
                                                <div className="d-flex justify-content-start align-items-center gap-3 gender">
                                                    <FormCheck>
                                                        <FormCheckInput type="radio" name="gender" value={0}
                                                            checked={user?.gender == 0} onChange={() => { if (user) setUser({ ...user, gender: 0 }); }} />
                                                        <FormCheckLabel className="mb-0">Male</FormCheckLabel>
                                                    </FormCheck>
                                                    <FormCheck>
                                                        <FormCheckInput type="radio" name="gender" value={1}
                                                            checked={user?.gender == 1} onChange={() => { if (user) setUser({ ...user, gender: 1 }); }} />
                                                        <FormCheckLabel className="mb-0">Female</FormCheckLabel>
                                                    </FormCheck>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>

                                <div className="d-flex justify-content-center">
                                    <Button type="submit" variant="gradient-primary" className="w-50">Save</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}