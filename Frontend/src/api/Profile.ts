const RENDER_URL = import.meta.env.RENDER_URL || "http://localhost:5000";
const URL = RENDER_URL + "/api/profile";

const getProfile = async (userId: string, token: string) => {
    console.log(userId, token);

    try {
        const response = await fetch(`${URL}/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        // Manually throw if response is not ok
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch profile");
        }

        const user = await response.json();
        console.log(user);
        return user;
    } catch (err) {
        console.error("getProfile error:", err);
        throw err; // Re-throw so caller can handle it
    }
};

export { getProfile };
