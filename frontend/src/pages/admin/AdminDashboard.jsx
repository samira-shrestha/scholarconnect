import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
    const [college, setcollege] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    // Fetch all college
    const fetchcollege = async () => {
        try {
            setLoading(true);

            const res = await axios.get(
                "http://localhost:5050/api/admin/college",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setcollege(res.data);
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Failed to load college");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchcollege();
    }, []);

    // Toggle verify
    const handleToggleVerify = async (id) => {
        try {
            await axios.patch(
                `http://localhost:5050/api/admin/college/${id}/verify`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            fetchcollege(); // refresh list
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Failed to update verification");
        }
    };


    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-gray-500">
                    Manage college verification and accounts
                </p>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow border overflow-hidden">
                {loading ? (
                    <div className="p-6">Loading college...</div>
                ) : college.length === 0 ? (
                    <div className="p-6">No college found.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px]">
                            <thead className="bg-gray-100 text-left">
                                <tr>
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Email</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Created</th>
                                    <th className="px-6 py-4">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {college.map((uni) => (
                                    <tr key={uni._id} className="border-t">
                                        <td className="px-6 py-4 font-medium">{uni.name}</td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {uni.email}
                                        </td>

                                        {/* Status */}
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${uni.isVerified
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                            >
                                                {uni.isVerified ? "Verified" : "Pending"}
                                            </span>
                                        </td>

                                        {/* Date */}
                                        <td className="px-6 py-4 text-gray-600">
                                            {new Date(uni.createdAt).toLocaleDateString()}
                                        </td>

                                        {/* Actions */}
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2 flex-wrap">
                                                <button
                                                    onClick={() => handleToggleVerify(uni._id)}
                                                    className={`px-4 py-2 rounded-lg text-white ${uni.isVerified
                                                        ? "bg-yellow-500"
                                                        : "bg-green-600"
                                                        }`}
                                                >
                                                    {uni.isVerified ? "Unverify" : "Verify"}
                                                </button>


                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}