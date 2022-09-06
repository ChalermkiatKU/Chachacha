import Button from 'react-bootstrap/Button';
import { FaFacebookF } from "react-icons/fa";
import { useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import { auth, db } from '../src/firebase';
import { collection, addDoc } from "firebase/firestore";

const HomeScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailReg, setEmailReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');

    const [error, setError] = useState('');

    const [username, setUserName] = useState('');


    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }


    const Signin = async (e) => {

        e.preventDefault();
        setError('');
        try {
            await signIn(email, password);
            console.log("success")

        } catch (e) {
            console.log("cannot signin")
            setError(e.message);
            console.log(e.message);
        }

    }

    const Signup = async (e) => {

        e.preventDefault();
        setError('');
        try {
            await createUser(emailReg, passwordReg);
            const user = auth.currentUser;
            const docRef = await addDoc(collection(db, "users"), {
                id: user.uid,
                username: username,
                email: emailReg
            });

            console.log("success")
            changeAuthMode()

        } catch (e) {

            console.log("cannot signup")
            setError(e.message);
            console.log(e.message);
        }

    }


    let [authMode, setAuthMode] = useState("signin")

    const changeAuthMode = () => {
        setAuthMode(authMode === "signin" ? "signup" : "signin")
    }

    if (authMode === "signin") {
        return (
            <div className='font-face-gm'>


                <div className="container">

                    <form className="form1" onSubmit={Signin}>
                        <h3 className="title">ยินดีต้อนรับสู่ Propertyhub</h3>
                        <hr
                            style={{
                                background: 'grey',
                                color: 'grey',
                                borderColor: 'grey',
                                height: '1px',
                            }}
                        />
                        <div className="form-content">

                            <div>


                                <div style={{ flex: 1, height: '50px', borderBottom: "1px solid #E5E5E5", marginTop: '30px' }} >
                                    <Button style={{
                                        backgroundColor: authMode == 'signin' ? 'white' : "#F6F8F9", color: 'black',
                                        width: '115px', height: '50px', color: authMode == 'signup' ? '#6D6D6D' : 'black',
                                        borderColor: '#E5E5E5', borderBottomRightRadius: '0px',
                                        fontWeight: authMode == 'signin' ? 500 : 400, fontSize: '16px',
                                        borderBottomWidth: authMode == 'signin' ? ' 0px' : '1px',
                                        borderBottomLeftRadius: '0px'


                                    }}
                                        onClick={authMode == 'signup' ? changeAuthMode : null}

                                    >
                                        เข้าสู่ระบบ
                                    </Button>

                                    <Button style={{
                                        backgroundColor: authMode == 'signup' ? 'white' : "#F6F8F9", color: 'black',
                                        width: '115px', height: '50px',
                                        borderColor: '#E5E5E5', borderBottomRightRadius: '0px',
                                        color: authMode == 'signin' ? '#6D6D6D' : 'black',
                                        fontWeight: authMode == 'signup' ? 500 : 400, fontSize: '16px',
                                        borderBottomWidth: authMode == 'signup' ? ' 0px' : '1px',
                                        marginLeft: '10px', borderBottomLeftRadius: '0px'
                                    }}
                                        onClick={authMode == 'signin' ? changeAuthMode : null}
                                    >
                                        สมัครสมาชิก
                                    </Button>
                                </div>



                            </div>

                            <div className="form-group mt-3">
                                <label >อีเมล</label>
                                <input
                                    style={{ fontSize: '16px', borderColor: '#E5E5E5' }}
                                    type="email"
                                    onChange={(e) => { setEmail(e.target.value) }}
                                    className="form-control mt-1"
                                    placeholder="อีเมล"

                                />
                            </div>
                            <div className="form-group mt-3">
                                <label >รหัสผ่าน</label>
                                <input
                                    style={{ fontSize: '16px', borderColor: '#E5E5E5' }}
                                    type="password"
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    className="form-control mt-1"
                                    placeholder="รหัสผ่าน"
                                />
                            </div>
                            <div style={{ display: "flex" }}>
                                <Button variant="link"
                                    style={{
                                        marginLeft: "auto", color: '#378ED0',
                                        fontWeight: 400, fontSize: '16px'
                                    }}>
                                    ลืม password?</Button>
                            </div>
                            <div className="d-grid gap-2 mt-2">
                                <button type="submit" className="btn"
                                    style={{ backgroundColor: '#378ED0', color: 'white', fontWeight: 400, fontSize: "16px" }}

                                >
                                    เข้าสู่ระบบ
                                </button>
                            </div>
                            <div
                                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                            >
                                <div style={{ flex: 1, height: '1px', backgroundColor: '#C4C4C4' }} />

                                <div>
                                    <p style={{
                                        width: '120px', textAlign: 'center',
                                        fontSize: '14px', color: '#b1b4b6',
                                        marginTop: '16px', fontFamily: "Graphink"
                                    }}>
                                        หรือเชื่อมต่อด้วย</p>
                                </div>

                                <div style={{ flex: 1, height: '1px', backgroundColor: '#C4C4C4' }} />
                            </div>
                            <div className="d-grid gap-2 mt-1">
                                <button type="submit" className="btn"
                                    style={{ backgroundColor: '#07529A', color: 'white', fontWeight: 500, fontSize: "16px" }}>
                                    <FaFacebookF style={{ marginRight: '5px' }} />Login with facebook
                                </button>
                            </div>

                        </div>

                    </form>
                </div>
            </div>

        )
    }

    return (
        <div className='font-face-gm'>

            <div className="container">
                <form className="form2" onSubmit={Signup}>
                    <h3 className="title">สมัครสมาชิก</h3>
                    <hr
                        style={{
                            background: 'grey',
                            color: 'grey',
                            borderColor: 'grey',
                            height: '1px',
                        }}
                    />
                    <div className="form-content">
                        <div>


                            <div style={{ flex: 1, height: '50px', borderBottom: "1px solid #E5E5E5", marginTop: '30px' }} >
                                <Button style={{
                                    backgroundColor: authMode == 'signin' ? 'white' : "#F6F8F9", color: 'black',
                                    width: '115px', height: '50px', color: authMode == 'signup' ? '#6D6D6D' : 'black',
                                    borderColor: '#E5E5E5', borderBottomRightRadius: '0px',
                                    fontWeight: authMode == 'signin' ? 500 : 400, fontSize: '16px',
                                    borderBottomWidth: authMode == 'signin' ? ' 0px' : '1px',
                                    borderBottomLeftRadius: '0px'


                                }}
                                    onClick={authMode == 'signup' ? changeAuthMode : null}

                                >
                                    เข้าสู่ระบบ
                                </Button>

                                <Button style={{
                                    backgroundColor: authMode == 'signup' ? 'white' : "#F6F8F9", color: 'black',
                                    width: '115px', height: '50px',
                                    color: authMode == 'signin' ? '#6D6D6D' : 'black',
                                    borderColor: '#E5E5E5', borderBottomRightRadius: '0px',
                                    fontWeight: authMode == 'signup' ? 500 : 400, fontSize: '16px',
                                    borderBottomWidth: authMode == 'signup' ? ' 0px' : '1px',
                                    marginLeft: '10px', borderBottomLeftRadius: '0px'
                                }}
                                    onClick={authMode == 'signin' ? changeAuthMode : null}
                                >
                                    สมัครสมาชิก
                                </Button>
                            </div>



                        </div>


                        <div className="form-group mt-3">
                            <label>ชื่อ - นามสกุล</label>
                            <input
                                type="name"
                                className="form-control mt-1"
                                placeholder="ชื่อ - นามสกุล"
                                onChange={(e) => { setUserName(e.target.value) }}


                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>อีเมล</label>
                            <input
                                type="email"
                                className="form-control mt-1"
                                placeholder="อีเมล"
                                onChange={(e) => { setEmailReg(e.target.value) }}

                            />
                        </div>
                        <div className="d-flex flex-row form-group mt-3">
                            <div style={{ marginRight: '20px' }}>
                                <label>รหัสผ่าน</label>
                                <input
                                    type="password"
                                    className="form-control mt-1 "
                                    placeholder="รหัสผ่าน"
                                    onChange={(e) => { setPasswordReg(e.target.value) }}
                                    style={{ marginRight: '20px' }}

                                />
                            </div>
                            <div>
                                <label>ยืนยันรหัสผ่าน</label>

                                <input
                                    type="password"
                                    className="form-control mt-1"
                                    placeholder="ยืนยันรหัสผ่าน"
                                />
                            </div>

                        </div>


                        <div style={{ display: "flex" }}>
                            <Button variant="link" style={{ marginLeft: "auto", color: '#47ACF6' }}>ลืม password?</Button>
                        </div>
                        <div className="d-grid gap-2 mt-2">
                            <button type="submit" className="btn"
                                style={{ backgroundColor: '#47ACF6', color: 'white', fontWeight: 'bold' }}
                            >
                                สมัครสมาชิก
                            </button>
                        </div>
                        <div
                            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                        >
                            <div style={{ flex: 1, height: '1px', backgroundColor: '#C4C4C4' }} />

                            <div>
                                <p style={{
                                    width: '120px', textAlign: 'center',
                                    fontSize: '14px', color: '#b1b4b6',
                                    marginTop: '16px', fontFamily: "Graphink"
                                }}>
                                    หรือเชื่อมต่อด้วย</p>
                            </div>

                            <div style={{ flex: 1, height: '1px', backgroundColor: '#C4C4C4' }} />
                        </div>
                        <div className="d-grid gap-2 mt-1">
                            <button type="submit" className="btn" style={{ backgroundColor: '#3b5998', color: 'white', fontWeight: 'bold' }}>
                                <FaFacebookF style={{ marginRight: '5px' }} />Login with facebook
                            </button>
                        </div>
                    </div>


                </form>
            </div>
        </div>
    )
}
export default HomeScreen;




