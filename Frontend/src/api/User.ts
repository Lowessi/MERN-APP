const getUser = async (userId: string, token: string) => {
  console.log(userId, token);

  try {
    const response = await fetch(`${URL}/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const user = await response.json();
    console.log(user);
    return user;
  } catch (err) {
    console.error(err);
  }
};

export { getUser };
