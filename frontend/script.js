
document.getElementById("calculateBtn").addEventListener("click", async () => {
    const num1 = document.getElementById("num1").value;
    const num2 = document.getElementById("num2").value;
    const operation = document.getElementById("operation").value;

    const result = document.getElementById("result");
    const status = document.getElementById("status");

    status.textContent = "";

    if (num1.trim() === "" || num2.trim() === "") {
        result.textContent = "Enter both numbers";
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/calculate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                num1: Number(num1),
                num2: Number(num2),
                operation: operation
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Calculation failed");
        }

        result.textContent = "Result: " + data.result;
    } catch (error) {
        result.textContent = "Calculation failed";
        status.textContent =
            "Start your backend server and try again.";
    }
});
