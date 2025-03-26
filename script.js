document.getElementById("generate-qr").addEventListener("click", generateQRcode);
document.getElementById("copy-qr").addEventListener("click", copyCredentials);
document.getElementById("download-qr").addEventListener("click", downloadQRcode);

function generateQRcode() {
    const SSID = document.getElementById("SSID").value.trim();
    const password = document.getElementById("password").value.trim();
    const security = document.getElementById("encryption-type").value.trim();  // Use this variable

    if (!SSID || !password) {
        alert("Please enter the SSID/password");
        return;
    }

    const qrText = `WIFI:T:${security};SS:${SSID};P:${password};;`;  // Use `security` here
    const qrContainer = document.getElementById("qr-container");
    qrContainer.innerHTML = ""; // Clear any previous QR code
    const qr = new QRious({
        element: document.createElement("canvas"),
        value: qrText,
        size: 200,
        foreground: "#6a11cb",
        background: "#ffffff",
    });
    qrContainer.appendChild(qr.element);
}

function copyCredentials() {
    const SSID = document.getElementById("SSID").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!SSID || !password) {
        alert("Please enter the SSID/password");
        return;
    }

    const text = `SSID: ${SSID}\nPassword: ${password}`;
    navigator.clipboard.writeText(text).then(function() {
        alert("Copied to clipboard");
    }, function(err) {
        alert("Failed to copy to clipboard");
    });
}

function downloadQRcode() {
    const qrCanvas = document.querySelector("#qr-container canvas"); // Fixed typo here
    if (!qrCanvas) {
        alert("Please generate the QR code first");
        return;
    }

    const link = document.createElement("a");
    link.href = qrCanvas.toDataURL();
    link.download = "wifi-qr-code.png";
    link.click();
}