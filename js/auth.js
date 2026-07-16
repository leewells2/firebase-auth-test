signupButton.addEventListener("click", async () => {
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!username) {
        showStatus("Please enter a username.");
        return;
    }

    if (username.length < 3) {
        showStatus("Username must be at least 3 characters.");
        return;
    }

    try {
        showStatus("Creating account...");

        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        console.log("Authentication account created!");

        const user = userCredential.user;

        console.log(user.uid);

        console.log("Writing Firestore document...");

        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            username,
            email: user.email,
            createdAt: serverTimestamp()
        });

        console.log("Firestore document created!");

        window.location.href = "dashboard.html";

    } catch (error) {

        console.error(error);
        showStatus(error.message);

    }
});
