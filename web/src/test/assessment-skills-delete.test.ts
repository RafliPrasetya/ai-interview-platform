import { describe, it, expect } from "vitest";
import type { AssessmentSkill } from "@/types";

describe("Assessment & Vacancy Nested Attributes Deletion Logic", () => {
  // Helper simulating the payload builder used in AssessmentEditPage & VacancyEditPage
  function buildUpdatePayload(
    activeSkills: Partial<AssessmentSkill>[],
    deletedSkillIds: number[]
  ) {
    const activeAttributes = activeSkills.map((s, i) => ({
      ...s,
      display_order: i,
    }));
    const destroyAttributes = deletedSkillIds.map((skillId) => ({
      id: skillId,
      _destroy: true,
    }));
    return [...activeAttributes, ...destroyAttributes];
  }

  it("appends _destroy: true for removed persisted skills so Active Record deletes them", () => {
    // Initial state: 3 skills in DB (id: 101, 102, 103)
    const activeSkills: Partial<AssessmentSkill>[] = [
      { id: 101, skill_label: "React", expected_level: 3 },
      { id: 103, skill_label: "System Design", expected_level: 2 },
    ];
    // Assessor removed skill 102 ("Communication")
    const deletedSkillIds = [102];

    const payload = buildUpdatePayload(activeSkills, deletedSkillIds);

    expect(payload).toHaveLength(3);
    // Active skills preserved and re-indexed
    expect(payload[0]).toEqual({ id: 101, skill_label: "React", expected_level: 3, display_order: 0 });
    expect(payload[1]).toEqual({ id: 103, skill_label: "System Design", expected_level: 2, display_order: 1 });
    // Deleted skill marked with _destroy: true for Rails
    expect(payload[2]).toEqual({ id: 102, _destroy: true });
  });

  it("handles newly created skills mixed with deletions correctly", () => {
    const activeSkills: Partial<AssessmentSkill>[] = [
      { id: 101, skill_label: "React", expected_level: 3 },
      { skill_label: "TypeScript Core", is_custom: true, expected_level: 4 }, // newly added
    ];
    const deletedSkillIds = [102, 103];

    const payload = buildUpdatePayload(activeSkills, deletedSkillIds);

    expect(payload).toHaveLength(4);
    expect(payload.filter((p) => (p as any)._destroy === true)).toHaveLength(2);
    expect(payload.filter((p) => !(p as any)._destroy)).toHaveLength(2);
  });
});

