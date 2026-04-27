import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";

export default function VerifyEmail() {
    const { token } = useParams();
    const [message, setMessage] = useState("Verifying your email...");
    const [success, setSuccess] = useState(null);
    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        const verifyEmail = async () => {
            try {
                const res = await fetch(
                    `http://localhost:5050/api/auth/verify-email/${token}`
                );

                const data = await res.json();

                setMessage(data.message);
                setSuccess(data.success);
            } catch (error) {
                setMessage("Something went wrong while verifying your email.");
                setSuccess(false);
            }
        };

        verifyEmail();
    }, [token]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
            <div className="bg-white rounded-xl shadow-md p-8 max-w-md w-full text-center">
                <h1 className="text-2xl font-bold mb-4">Email Verification</h1>

                <p
                    className={`mb-6 ${success === true
                            ? "text-green-600"
                            : success === false
                                ? "text-red-600"
                                : "text-gray-600"
                        }`}
                >
                    {message}
                </p>

                {success === true && (
                    <Link
                        to="/login"
                        className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg"
                    >
                        Go to Login
                    </Link>
                )}
            </div>
        </div>
    );
}