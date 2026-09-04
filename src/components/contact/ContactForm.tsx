"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/lib/motion";

const fieldCls =
  "peer w-full border border-black/[0.16] bg-warm-white px-[13px] py-[11px] pr-9 text-sm text-black outline-none transition-[border-color,box-shadow] duration-300 ease-spring placeholder:text-[#a8a49b] focus:border-gold focus:shadow-[0_0_0_3px_rgba(197,164,109,0.15)]";
const labelCls = "mb-2 block text-[11px] font-medium tracking-[1.2px] text-gold-dark";

function ValidCheck() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[13px] text-emerald-600 opacity-0 transition-opacity duration-300 ease-spring peer-valid:opacity-100 peer-placeholder-shown:opacity-0"
    >
      &#10003;
    </span>
  );
}

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="w-full max-w-[520px] border border-gold/40 border-t-[3px] border-t-gold bg-white p-[36px_24px] shadow-[0_40px_70px_-30px_rgba(13,13,13,0.2)] sm:p-[48px_44px]">
      <AnimatePresence mode="wait" initial={false}>
        {submitted ? (
          <motion.div
            key="success"
            className="py-10 text-center"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: EASE }}
            role="status"
            aria-live="polite"
          >
            <motion.span
              className="mx-auto mb-6 flex h-11 w-11 items-center justify-center rounded-full border border-gold text-lg text-gold"
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.15 }}
            >
              &#10003;
            </motion.span>
            <h2 className="m-0 mb-3 font-heading text-2xl font-extrabold text-black">Request Received.</h2>
            <p className="m-0 text-[15px] leading-[1.7] text-ink-2">Thanks for reaching out — we&rsquo;ll get back to you within one business day.</p>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-5 bg-gold" />
              <span className="text-[11px] font-medium tracking-[2.2px] text-gold-dark">SEND A MESSAGE</span>
            </div>
            <form
              className="flex flex-col gap-5"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2">
                <div>
                  <label htmlFor="cf-name" className={labelCls}>FULL NAME</label>
                  <div className="relative">
                    <input id="cf-name" name="name" type="text" required placeholder="Your name" autoComplete="name" className={fieldCls} />
                    <ValidCheck />
                  </div>
                </div>
                <div>
                  <label htmlFor="cf-phone" className={labelCls}>PHONE NUMBER</label>
                  <div className="relative">
                    <input id="cf-phone" name="phone" type="tel" required placeholder="(778) 000-0000" autoComplete="tel" className={fieldCls} />
                    <ValidCheck />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="cf-email" className={labelCls}>EMAIL ADDRESS</label>
                <div className="relative">
                  <input id="cf-email" name="email" type="email" required placeholder="you@email.com" autoComplete="email" className={fieldCls} />
                  <ValidCheck />
                </div>
              </div>
              <div>
                <label htmlFor="cf-service" className={labelCls}>SERVICE REQUIRED</label>
                <div className="relative">
                  <select id="cf-service" name="service" required defaultValue="" className={`${fieldCls} appearance-none rounded-none`}>
                    <option value="" disabled>Select a service</option>
                    <option>Framing</option>
                    <option>General Construction</option>
                    <option>Project Management</option>
                    <option>Excavation &amp; Site Prep</option>
                    <option>Pre-Construction</option>
                    <option>Concrete Forming</option>
                  </select>
                  <span aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gold-dark">&#9662;</span>
                </div>
              </div>
              <div>
                <label htmlFor="cf-location" className={labelCls}>PROJECT LOCATION</label>
                <div className="relative">
                  <input id="cf-location" name="location" type="text" required placeholder="City or address" className={fieldCls} />
                  <ValidCheck />
                </div>
              </div>
              <div>
                <label htmlFor="cf-details" className={labelCls}>ABOUT YOUR PROJECT</label>
                <textarea id="cf-details" name="details" required rows={3} placeholder="Tell us a bit about your project" className={`${fieldCls} resize-y pr-[13px]`} />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="mt-2 cursor-pointer border-0 bg-black px-[30px] py-[15px] text-sm tracking-[0.3px] text-warm-white shadow-[0_18px_40px_-16px_rgba(13,13,13,0.6)] transition-colors duration-300 ease-spring hover:bg-charcoal"
              >
                Send My Request
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
