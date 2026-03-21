"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { submitContactForm, type ContactFormState } from "@/app/actions/contact";

const initialState: ContactFormState = { success: false, error: null };

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);
  const t = useTranslations("contactPage");

  if (state.success) {
    return (
      <div className="bg-zinc-100 border border-zinc-200 p-8">
        <div className="flex items-center gap-3 mb-3">
          <svg className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <h3 className="text-lg font-semibold text-zinc-900 font-[family-name:var(--font-display)]">
            {t("form.successTitle")}
          </h3>
        </div>
        <p className="text-sm text-zinc-600">{t("form.successMessage")}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      {state.error && (
        <div className="bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {t(`form.error.${state.error}`)}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-zinc-700 mb-1.5">
            {t("form.name")} *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 border border-zinc-300 text-sm focus:outline-none focus:border-ember transition-colors"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-zinc-700 mb-1.5">
            {t("form.company")} *
          </label>
          <input
            type="text"
            id="company"
            name="company"
            required
            className="w-full px-4 py-3 border border-zinc-300 text-sm focus:outline-none focus:border-ember transition-colors"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-1.5">
            {t("form.email")} *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 border border-zinc-300 text-sm focus:outline-none focus:border-ember transition-colors"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-zinc-700 mb-1.5">
            {t("form.phone")}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full px-4 py-3 border border-zinc-300 text-sm focus:outline-none focus:border-ember transition-colors"
          />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-zinc-700 mb-1.5">
          {t("form.subject")}
        </label>
        <select
          id="subject"
          name="subject"
          className="w-full px-4 py-3 border border-zinc-300 text-sm focus:outline-none focus:border-ember transition-colors bg-white"
        >
          <option value="new-project">{t("form.subjectNew")}</option>
          <option value="existing-project">{t("form.subjectExisting")}</option>
          <option value="general">{t("form.subjectGeneral")}</option>
        </select>
      </div>
      <div>
        <label htmlFor="volume" className="block text-sm font-medium text-zinc-700 mb-1.5">
          {t("form.volume")}
        </label>
        <select
          id="volume"
          name="volume"
          className="w-full px-4 py-3 border border-zinc-300 text-sm focus:outline-none focus:border-ember transition-colors bg-white"
        >
          <option value="">{t("form.volumeSelect")}</option>
          <option value="prototype">{t("form.volumePrototype")}</option>
          <option value="low">{t("form.volumeLow")}</option>
          <option value="high">{t("form.volumeHigh")}</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-zinc-700 mb-1.5">
          {t("form.message")} *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full px-4 py-3 border border-zinc-300 text-sm focus:outline-none focus:border-ember transition-colors resize-y"
        />
      </div>
      <div>
        <label htmlFor="files" className="block text-sm font-medium text-zinc-700 mb-1.5">
          {t("form.fileUpload")}
        </label>
        <input
          type="file"
          id="files"
          name="files"
          multiple
          accept=".step,.stp,.iges,.igs,.sldprt,.sldasm,.x_t,.pdf,.dwg,.dxf"
          className="w-full text-sm text-zinc-500 file:mr-4 file:py-2.5 file:px-4 file:border file:border-zinc-300 file:text-sm file:font-medium file:bg-zinc-50 file:text-zinc-700 hover:file:bg-zinc-100 file:cursor-pointer file:transition-colors"
        />
        <p className="mt-1.5 text-[11px] text-zinc-400 font-[family-name:var(--font-mono)]">
          {t("form.fileFormats")}
        </p>
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="group inline-flex items-center justify-center gap-3 bg-ember hover:bg-ember-light px-8 py-4 text-sm font-semibold tracking-wide uppercase text-zinc-950 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? t("form.sending") : t("form.submit")}
        <svg
          className={`h-4 w-4 transition-transform ${isPending ? "animate-spin" : "group-hover:translate-x-1"}`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          {isPending ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.992 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          )}
        </svg>
      </button>
    </form>
  );
}
