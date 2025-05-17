import { useState } from "react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // هنا ترسل البيانات إذا في باك اند أو API
    console.log({ name, email, message });

    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8 text-right">
      <h1 className="text-2xl font-bold mb-4">اتصل بنا</h1>

      {submitted && (
        <p className="mb-4 text-green-600 font-medium">تم إرسال رسالتك بنجاح</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1 font-medium">
            الاسم
          </label>
          <input
            id="name"
            type="text"
            className="w-full border border-neutral-300 rounded px-3 py-2 focus:outline-none focus:border-primary"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            البريد الإلكتروني
          </label>
          <input
            id="email"
            type="email"
            className="w-full border border-neutral-300 rounded px-3 py-2 focus:outline-none focus:border-primary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block mb-1 font-medium">
            الرسالة
          </label>
          <textarea
            id="message"
            rows={5}
            className="w-full border border-neutral-300 rounded px-3 py-2 focus:outline-none focus:border-primary"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition"
        >
          إرسال
        </button>
      </form>
    </div>
  );
};

export default Contact;
