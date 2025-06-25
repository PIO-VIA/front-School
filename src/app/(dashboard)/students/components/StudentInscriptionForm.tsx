"use client";

import React, { useState } from "react";
import { Student, updateStudent } from "./studentData";

const SECTIONS = ["Francophone", "Anglophone"];
const CLASSES = [
  "CP", "CE1", "CE2", "CM1", "CM2", // francophone
  "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6" // anglophone
];

export default function StudentInscriptionForm({
  student,
  onClose,
  onSaved,
}: {
  student: Student;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [section, setSection] = useState(student.section || SECTIONS[0]);
  const [classe, setClasse] = useState(student.classe || "");
  const [annee, setAnnee] = useState("2023-2024");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!classe) {
      setError("Veuillez choisir une classe.");
      return;
    }
    updateStudent(student.id, {
      section,
      classe,
      // On pourrait aussi stocker l'année d'inscription si besoin
    });
    onSaved();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium">Section</label>
        <select
          value={section}
          onChange={(e) => setSection(e.target.value)}
          className="w-full border rounded px-2 py-1"
        >
          {SECTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Classe *</label>
        <select
          value={classe}
          onChange={(e) => setClasse(e.target.value)}
          className="w-full border rounded px-2 py-1"
          required
        >
          <option value="">Choisir…</option>
          {CLASSES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Année scolaire</label>
        <input
          value={annee}
          onChange={(e) => setAnnee(e.target.value)}
          className="w-full border rounded px-2 py-1"
        />
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
          onClick={onClose}
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700"
        >
          Enregistrer
        </button>
      </div>
    </form>
  );
} 