const generateQRButton = document.getElementById("generate-qr");
const copyButton = document.getElementById("copy-btn");
const downloadButton = document.getElementById("download-btn");
const ssidInput = document.getElementById("SSID");
const passwordInput = document.getElementById("password");
const encryptionSelect = document.getElementById("encryption-type");
const qrContainer = document.getElementById("qr-container");


let qr;


function generateQRcode() {
    const ssid = ssidInput.value.trim();
    const password = passwordInput.value.trim();
    const encryption = encryptionSelect.value;

    if (ssid === "") {
        alert("Please enter a WiFi Name (SSID).");
        return;
    }
    if (encryption !== "None" && password === "") {
        alert("Please enter the WiFi password for encrypted networks.");
        return;
    }

    const qrValue = `WIFI:S:${ssid};T:${encryption};P:${password};;`;

    qr = new QRious({
        element: document.createElement("canvas"),
        value: qrValue,
        size: 200,
    });

    qrContainer.innerHTML = "";
    qrContainer.appendChild(qr.element);
}

function copyCredentials() {
    const ssid = ssidInput.value.trim();
    const password = passwordInput.value.trim();
    const encryption = encryptionSelect.value;

    if (ssid === "") {
        alert("Nothing to copy. Please enter the WiFi Name (SSID).");
        return;
    }

    const credentials = `WiFi Name: ${ssid}\nEncryption Type: ${encryption}\nPassword: ${password}`;
    navigator.clipboard.writeText(credentials)
        .then(() => {
            alert("WiFi credentials copied to clipboard!");
        })
        .catch(() => {
            alert("Failed to copy. Please try again.");
        });
}

function downloadQRcode() {
    if (!qr) {
        alert("No QR code available to download. Generate one first!");
        return;
    }

    const qrImage = qr.element.toDataURL("image/png");
    const downloadLink = document.createElement("a");

    downloadLink.href = qrImage;
    downloadLink.download = "WiFiQRCode.png";
    downloadLink.click();
}

generateQRButton.addEventListener("click", generateQRcode);
copyButton.addEventListener("click", copyCredentials);
downloadButton.addEventListener("click", downloadQRcode);
