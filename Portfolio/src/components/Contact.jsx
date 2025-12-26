import { useState } from "react";

export default function Contact() {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");

    const formData = new FormData(event.target);
    formData.append("access_key", "949e089d-f3aa-44f8-abfc-cbf349b1c84b");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      }).then((res) => res.json());

      if (res.success) {
        setResult("Message sent successfully ✅");
        event.target.reset();
      } else {
        setResult(res.message || "Something went wrong ❌");
      }
    } catch (error) {
      setResult("Network error. Try again later.");
    }
  };

  return (
    <div
      id="contact"
      className="w-full px-[12%] py-10 scroll-mt-20 bg-[url('./assets/footer-bg-color.png')] bg-no-repeat bg-[length:90%_auto] bg-center dark:bg-none"
    >
      <h4 className="text-center mb-2 text-lg font-Ovo">Connect with me</h4>
      <h2 className="text-center text-5xl font-Ovo">Get in touch</h2>
      <p className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo">
        I'd love to hear from you! Fill out the form below and I’ll get back to you.
      </p>

      <form onSubmit={onSubmit} className="max-w-2xl mx-auto">
        {/* Optional */}
        <input
          type="hidden"
          name="subject"
          value="New Portfolio Contact Message"
        />

        <div className="grid grid-cols-auto gap-6 mt-10 mb-8">
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            required
            className="px-3 py-2 border rounded-md bg-white dark:bg-darkHover/30"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            className="px-3 py-2 border rounded-md bg-white dark:bg-darkHover/30"
          />
        </div>

        <textarea
          name="message"
          rows="6"
          placeholder="Enter your message"
          required
          className="w-full px-4 py-2 border rounded-md bg-white dark:bg-darkHover/30 mb-6"
        />

        <button
          type="submit"
          className="py-2 px-8 mx-auto flex items-center gap-2 bg-black/80 text-white rounded-full hover:bg-black duration-300 dark:bg-transparent dark:border dark:border-white/30"
        >
          Submit now
          <img src="./assets/right-arrow-white.png" alt="" className="w-4" />
        </button>

        <p className="mt-4 text-center">{result}</p>
      </form>
    </div>
  );
}
