import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ShieldCheck, UserCheck, Bot, FileText, Lock, Globe2 } from "lucide-react";

interface PdpConsentModalProps {
  open: boolean;
  roleTitle: string;
  candidateName?: string;
  retentionDays?: number;
  submitting?: boolean;
  onConsent: (locale: "id" | "en") => void;
}

export default function PdpConsentModal({
  open,
  roleTitle,
  candidateName,
  retentionDays = 30,
  submitting = false,
  onConsent,
}: PdpConsentModalProps) {
  const [locale, setLocale] = useState<"id" | "en">("id");
  const [agreedBiometric, setAgreedBiometric] = useState(false);
  const [agreedAutomatedEvaluation, setAgreedAutomatedEvaluation] = useState(false);

  const canProceed = agreedBiometric && agreedAutomatedEvaluation;

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-primary font-semibold text-sm">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
              <span>UU No. 27/2022 (UU PDP) Compliance</span>
            </div>
            <div className="flex items-center gap-1 bg-muted rounded-md p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setLocale("id")}
                className={`px-2 py-0.5 rounded font-medium transition-colors ${
                  locale === "id" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                🇮🇩 ID
              </button>
              <button
                type="button"
                onClick={() => setLocale("en")}
                className={`px-2 py-0.5 rounded font-medium transition-colors ${
                  locale === "en" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                🇬🇧 EN
              </button>
            </div>
          </div>
          <DialogTitle className="text-lg">
            {locale === "id"
              ? "Persetujuan Pemrosesan Data Pribadi & Asesmen AI"
              : "Personal Data Protection & AI Assessment Consent"}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            {locale === "id"
              ? `Sebelum memulai asesmen untuk posisi ${roleTitle}${candidateName ? ` atas nama ${candidateName}` : ""}, mohon pelajari dan setujui ketentuan privasi berikut sesuai regulasi perlindungan data pribadi di Indonesia.`
              : `Before starting the assessment for ${roleTitle}${candidateName ? ` for ${candidateName}` : ""}, please review and accept the data privacy terms in accordance with Indonesian data protection regulations.`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-2 text-xs">
          {/* Item 1: Audio / Biometric stream */}
          <div className="flex items-start gap-2.5 p-3 rounded-lg border bg-muted/30">
            <Bot className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-foreground">
                {locale === "id" ? "Pemrosesan Suara & Interaksi AI Real-time" : "Real-time Voice & AI Interaction Processing"}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {locale === "id"
                  ? "Sesi wawancara ini menggunakan model kecerdasan buatan (Google Gemini Live) yang memproses audio mikrofon Anda secara real-time dan menyusun transkrip percakapan untuk mengevaluasi kompetensi teknis."
                  : "This interview uses artificial intelligence (Google Gemini Live) that processes microphone audio in real-time and compiles conversation transcripts to assess relevant competencies."}
              </p>
            </div>
          </div>

          {/* Item 2: Human in the loop */}
          <div className="flex items-start gap-2.5 p-3 rounded-lg border bg-muted/30">
            <UserCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-foreground">
                {locale === "id" ? "Jaminan Peninjauan Manusia (Human-in-the-Loop)" : "Human-in-the-Loop Guarantee"}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {locale === "id"
                  ? "Sesuai Pasal 16 UU PDP mengenai hak atas keputusan otomatis, hasil analisis AI bukan merupakan keputusan final. Asesor manusia (tim rekrutmen / hiring manager) selalu meninjau transkrip dan berwenang merevisi nilai penilaian."
                  : "Pursuant to Article 16 UU PDP regarding automated decision-making, AI analysis is not final. Human assessors (recruiting team / hiring manager) review transcripts and retain full authority to override AI evaluations."}
              </p>
            </div>
          </div>

          {/* Item 3: Data retention & rights */}
          <div className="flex items-start gap-2.5 p-3 rounded-lg border bg-muted/30">
            <Lock className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-foreground">
                {locale === "id" ? "Masa Retensi & Hak Akses Data" : "Data Retention & Access Rights"}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {locale === "id"
                  ? `Rekaman audio tidak disimpan secara permanen. Transkrip dan portofolio asesmen disimpan selama maksimal ${retentionDays} hari untuk keperluan seleksi kerja, dan Anda berhak meminta akses atau penghapusan data kapan saja.`
                  : `Raw audio streams are not permanently stored. Transcripts and portfolios are retained for up to ${retentionDays} days for hiring evaluation, and you may request access or deletion of your data at any time.`}
              </p>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="pt-2 space-y-2.5">
            <label className="flex items-start gap-2.5 cursor-pointer text-xs select-none">
              <input
                type="checkbox"
                checked={agreedBiometric}
                onChange={(e) => setAgreedBiometric(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-foreground">
                {locale === "id"
                  ? "Saya menyetujui pemrosesan rekaman suara dan transkripsi audio saya untuk keperluan seleksi wawancara kerja ini."
                  : "I consent to the processing of my voice audio and conversation transcript for the purpose of this job interview assessment."}
              </span>
            </label>

            <label className="flex items-start gap-2.5 cursor-pointer text-xs select-none">
              <input
                type="checkbox"
                checked={agreedAutomatedEvaluation}
                onChange={(e) => setAgreedAutomatedEvaluation(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-foreground">
                {locale === "id"
                  ? "Saya memahami bahwa wawancara ini dipandu oleh asisten AI dengan pengawasan dan evaluasi akhir oleh tim asesor manusia."
                  : "I understand that this interview is conducted by an AI assistant with oversight and final evaluation by human assessors."}
              </span>
            </label>
          </div>
        </div>

        <DialogFooter className="pt-2 sm:justify-between flex-row items-center gap-2">
          <p className="text-[11px] text-muted-foreground text-left">
            {locale === "id" ? "Persetujuan akan dicatat secara digital dengan stempel waktu." : "Consent will be digitally logged with timestamp."}
          </p>
          <Button
            type="button"
            size="sm"
            disabled={!canProceed || submitting}
            onClick={() => onConsent(locale)}
          >
            {submitting
              ? (locale === "id" ? "Menyimpan..." : "Saving...")
              : (locale === "id" ? "Setuju & Lanjutkan" : "Agree & Continue")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

