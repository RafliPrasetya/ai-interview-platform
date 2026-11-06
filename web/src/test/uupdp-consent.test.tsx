import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PdpConsentModal from "@/components/interview/PdpConsentModal";

describe("UU PDP Candidate Consent & Privacy Gate (PdpConsentModal)", () => {
  it("renders the modal with statutory UU No. 27/2022 disclosures", () => {
    render(
      <PdpConsentModal
        open={true}
        roleTitle="Senior Frontend Engineer"
        candidateName="Ahmad Rizky"
        retentionDays={30}
        onConsent={vi.fn()}
      />
    );

    expect(screen.getByText(/UU No\. 27\/2022 \(UU PDP\) Compliance/i)).toBeInTheDocument();
    expect(screen.getByText(/Persetujuan Pemrosesan Data Pribadi & Asesmen AI/i)).toBeInTheDocument();
    expect(screen.getByText(/Ahmad Rizky/i)).toBeInTheDocument();
    expect(screen.getByText(/Google Gemini Live/i)).toBeInTheDocument();
    expect(screen.getByText(/Human-in-the-Loop/i)).toBeInTheDocument();
  });

  it("keeps the 'Setuju & Lanjutkan' button disabled until all mandatory consent checkboxes are checked", () => {
    const handleConsent = vi.fn();
    render(
      <PdpConsentModal
        open={true}
        roleTitle="Frontend Engineer"
        onConsent={handleConsent}
      />
    );

    const submitBtn = screen.getByRole("button", { name: /Setuju & Lanjutkan/i });
    expect(submitBtn).toBeDisabled();

    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes.length).toBe(2);

    // Check only first checkbox
    fireEvent.click(checkboxes[0]);
    expect(submitBtn).toBeDisabled();

    // Check second checkbox
    fireEvent.click(checkboxes[1]);
    expect(submitBtn).not.toBeDisabled();

    // Click submit
    fireEvent.click(submitBtn);
    expect(handleConsent).toHaveBeenCalledTimes(1);
    expect(handleConsent).toHaveBeenCalledWith("id");
  });

  it("switches language copy seamlessly between Indonesian and English", () => {
    render(
      <PdpConsentModal
        open={true}
        roleTitle="Frontend Engineer"
        onConsent={vi.fn()}
      />
    );

    // Switch to English
    const enButton = screen.getByRole("button", { name: /🇬🇧 EN/i });
    fireEvent.click(enButton);

    expect(screen.getByText(/Personal Data Protection & AI Assessment Consent/i)).toBeInTheDocument();
    expect(screen.getByText(/Real-time Voice & AI Interaction Processing/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Agree & Continue/i })).toBeInTheDocument();

    // Switch back to Indonesian
    const idButton = screen.getByRole("button", { name: /🇮🇩 ID/i });
    fireEvent.click(idButton);

    expect(screen.getByText(/Persetujuan Pemrosesan Data Pribadi & Asesmen AI/i)).toBeInTheDocument();
    expect(screen.getByText(/Pemrosesan Suara & Interaksi AI Real-time/i)).toBeInTheDocument();
  });
});
