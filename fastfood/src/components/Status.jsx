import { useEffect, useState } from "react";
import "./status.css";

function Status() {
    const steps = [
        { title: "Zakaz qabul qilindi", icon: "🟢" },
        { title: "Tayyorlanmoqda", icon: "🍳" },
        { title: "Zakaz yo‘lda", icon: "🚴" },
        { title: "Yetkazildi", icon: "📦" },
    ];

    const STEP_TIME = 10 * 60; // 10 minut

    const [step, setStep] = useState(0);
    const [timeLeft, setTimeLeft] = useState(STEP_TIME);

    useEffect(() => {
        if (step >= steps.length - 1) return;

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    setStep((prevStep) => prevStep + 1);
                    return STEP_TIME;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [step]);

    return (
        <div className="order-container">
            <h2 className="title">Zakaz holati</h2>

            <div className="timeline">
                {steps.map((item, index) => (
                    <div key={index} className="step">
                        <div className={`circle ${index <= step ? "active" : ""}`}>
                            {item.icon}
                        </div>

                        {index !== steps.length - 1 && (
                            <div className={`line ${index < step ? "active" : ""}`} />
                        )}

                        <p className={`label ${index === step ? "current" : ""}`}>
                            {item.title}
                        </p>
                    </div>
                ))}
            </div>

            {step < steps.length - 1 && (
                <div className="timer">
                    Keyingi statusga:{" "}
                    <b>
                        {Math.floor(timeLeft / 60)}:
                        {String(timeLeft % 60).padStart(2, "0")}
                    </b>
                </div>
            )}
        </div>
    );
}

export default Status;
