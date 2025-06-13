const RENDER_URL = import.meta.env.RENDER_URL || "http://localhost:5000";
const URL = RENDER_URL + "/api/userauth";

const getUser = async (userId: string) => {
    console.log(userId);

    try {
        const response = await fetch(`${URL}/${userId}`);
        const user = await response.json();

        console.log(user);
        return user;
    } catch (err) {
        console.error(err);
    }
};

export { getUser };
