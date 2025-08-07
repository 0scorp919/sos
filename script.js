async function authenticate() {
    try {
        const assertion = await navigator.credentials.get({
            publicKey: {
                challenge: new Uint8Array(32),
                timeout: 30000,
                userVerification: "preferred"
            }
        });
        document.getElementById('errorMsg').textContent = "";
        await revealSecret();
    } catch (err) {
        document.getElementById('errorMsg').textContent = "Відмова в доступі або немає YubiKey";
    }
}

async function revealSecret() {
    const response = await fetch('secrets.json.enc');
    if (!response.ok) {
        document.getElementById('errorMsg').textContent = "Не знайдено файл секретів.";
        return;
    }
    const encrypted = await response.text();
    document.getElementById('secretData').style.display = 'block';
    document.getElementById('secretData').textContent = encrypted;
}

document.getElementById('loginBtn').onclick = authenticate;
