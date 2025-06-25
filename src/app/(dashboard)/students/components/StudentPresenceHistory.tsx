"use client";

import React, { useState } from "react";
import { Student, updateStudent, PresenceRecord } from "./studentData";

export default function StudentPresenceHistory({
  student,
  onClose,
  onSaved,
}: {
  student: Student;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [date, setDate] = useState("");
  const [present, setPresent] = useState(true);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(0);

  const history = student.historiquePresence || [];

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!date) {
      setError("Veuillez choisir une date.");
      return;
    }
    if (history.some((h) => h.date === date)) {
      setError("Une entrée existe déjà pour cette date.");
      return;
    }
    const newHistory: PresenceRecord[] = [
      ...history,
      { date, present },
    ];
    updateStudent(student.id, { historiquePresence: newHistory });
    setDate("");
    setPresent(true);
    setRefresh((r) => r + 1);
    onSaved();
  };

  const handleDelete = (dateToDelete: string) => {
    if (confirm("Supprimer cette entrée ?")) {
      const newHistory = history.filter((h) => h.date !== dateToDelete);
      updateStudent(student.id, { historiquePresence: newHistory });
      setRefresh((r) => r + 1);
      onSaved();
    }
  };

  // Rafraîchir les données après ajout/suppression
  const [localHistory, setLocalHistory] = useState(history);
  React.useEffect(() => {
    setLocalHistory(student.historiquePresence || []);
  }, [refresh, student.historiquePresence]);

  return (
    <div>
      <form onSubmit={handleAdd} className="flex gap-2 mb-4 items-end">
        <div>
          <label className="block text-sm font-medium">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border rounded px-2 py-1"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Présence</label>
          <select
            value={present ? "present" : "absent"}
            onChange={(e) => setPresent(e.target.value === "present")}
            className="border rounded px-2 py-1"
          >
            <option value="present">Présent</option>
            <option value="absent">Absent</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
        >
          Ajouter
        </button>
      </form>
      {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
      <table className="min-w-full border mb-2">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-3 py-1">Date</th>
            <th className="px-3 py-1">Statut</th>
            <th className="px-3 py-1">Action</th>
          </tr>
        </thead>
        <tbody>
          {localHistory.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center text-gray-500 py-2">
                Aucun enregistrement
              </td>
            </tr>
          )}
          {localHistory
            .slice()
            .sort((a, b) => b.date.localeCompare(a.date))
            .map((h) => (
              <tr key={h.date}>
                <td className="px-3 py-1">{h.date}</td>
                <td className="px-3 py-1">
                  {h.present ? (
                    <span className="text-green-700 font-semibold">Présent</span>
                  ) : (
                    <span className="text-red-700 font-semibold">Absent</span>
                  )}
                </td>
                <td className="px-3 py-1">
                  <button
                    className="text-xs text-red-600 hover:underline"
                    onClick={() => handleDelete(h.date)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="flex justify-end">
        <button
          className="mt-2 text-sm text-gray-600 hover:underline"
          onClick={onClose}
        >
          Fermer
        </button>
      </div>
    </div>
  );
} 