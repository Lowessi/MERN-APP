import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const RENDER_URL = import.meta.env.VITE_RENDER_URL || "http://localhost:5000";

const EditJob = () => {
    const { id } = useParams();
    const { token } = useContext(AuthContext) || {};
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [budget, setBudget] = useState<number>(0);
    const [deadline, setDeadline] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await fetch(`${RENDER_URL}/api/jobs/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!res.ok) throw new Error("Failed to load job");
                const data = await res.json();
                setTitle(data.Title);
                setDescription(data.Description);
                setBudget(data.Budget);
                setDeadline(data.Deadline.split("T")[0]);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        if (token && id) fetchJob();
    }, [token, id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`${RENDER_URL}/api/jobs/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    Title: title,
                    Description: description,
                    Budget: budget,
                    Deadline: deadline,
                }),
            });
            if (!res.ok) throw new Error("Failed to update job");
            navigate("/my-jobs");
        } catch (err) {
            setError((err as Error).message);
        }
    };

    if (loading)
        return (
            <p className="text-center mt-20 text-[#948978]">
                Loading job details...
            </p>
        );
    if (error) return <p className="text-red-500 text-center mt-20">{error}</p>;

    return (
        <div className="min-h-screen bg-[#393E46] py-10 px-4 text-[#DED1B6]">
            <div className="max-w-4xl mx-auto bg-[#222831] p-8 rounded-2xl shadow-lg border border-[#948978]">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 px-4 py-2 bg-[#DED1B6] text-[#1E222B] rounded hover:bg-[#948978] hover:text-white transition"
                >
                    &larr; Back
                </button>

                <h2 className="text-3xl font-bold mb-6 text-center">
                    Edit Job
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-[#DED1B6]">
                            Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full p-3 rounded-lg bg-[#1E222B] border border-[#948978] text-[#DED1B6] focus:outline-none focus:ring-2 focus:ring-[#948978]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-[#DED1B6]">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            rows={4}
                            className="w-full p-3 rounded-lg bg-[#1E222B] border border-[#948978] text-[#DED1B6] focus:outline-none focus:ring-2 focus:ring-[#948978]"
                        />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-[#DED1B6]">
                                Budget
                            </label>
                            <input
                                type="number"
                                value={budget}
                                onChange={(e) =>
                                    setBudget(Number(e.target.value))
                                }
                                required
                                className="w-full p-3 rounded-lg bg-[#1E222B] border border-[#948978] text-[#DED1B6] focus:outline-none focus:ring-2 focus:ring-[#948978]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1 text-[#DED1B6]">
                                Deadline
                            </label>
                            <input
                                type="date"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                                required
                                className="w-full p-3 rounded-lg bg-[#1E222B] border border-[#948978] text-[#DED1B6] focus:outline-none focus:ring-2 focus:ring-[#948978]"
                            />
                        </div>
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-[#DED1B6] text-[#1E222B] font-semibold rounded-lg hover:bg-[#948978] hover:text-white transition"
                        >
                            Update Job
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditJob;
