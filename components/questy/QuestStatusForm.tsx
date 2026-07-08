import { Button } from "@/components/ui/Button";
import { zmienStatusQuestu } from "@/lib/actions/questy";
import type { QuestListItem } from "@/lib/queries/questy";

type QuestStatusFormProps = {
  questId: string;
  currentStatus: QuestListItem["status"];
};

const statusy = [
  { value: "backlog", label: "Backlog" },
  { value: "aktywny", label: "Aktywny" },
  { value: "zablokowany", label: "Zablokowany" },
  { value: "zakonczony", label: "Zakończony" },
  { value: "zabity", label: "Zabity" },
  { value: "zarchiwizowany", label: "Zarchiwizowany" },
  { value: "stary", label: "Stary" }
] as const;

export function QuestStatusForm({ questId, currentStatus }: QuestStatusFormProps) {
  return (
    <form action={zmienStatusQuestu} className="flex flex-wrap items-end gap-2">
      <input type="hidden" name="quest_id" value={questId} />
      <label className="grid gap-2">
        <span className="text-sm font-medium text-atlas-secondary">Status</span>
        <select
          name="status"
          defaultValue={currentStatus}
          className="h-10 rounded-md border border-atlas-border bg-atlas-panel px-3 text-sm text-atlas-primary outline-none transition focus:border-atlas-cyan"
        >
          {statusy.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      </label>
      <Button type="submit">Zmień status</Button>
    </form>
  );
}
