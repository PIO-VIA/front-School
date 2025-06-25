"use client";

import React, { useState } from "react";
import { Student, updateStudent, Bulletin } from "./studentData";

const MATIERES_CM = [
  "Mathématiques",
  "Français",
  "Anglais",
  "Éducation Civique",
  "Sciences",
  "Histoire-Géographie",
  "Éducation Physique",
];
const MATIERES_CLASS = [
  "Mathematics",
  "English",
  "Science",
  "Civic Education",
  "History",
  "Geography",
  "Physical Education",
];

function getDefaultMatieres(section: string) {
  return section === "Francophone" ? MATIERES_CM : MATIERES_CLASS;
}

export default function StudentBulletin({
  student,
  onClose,
  onSaved,
}: {
  student: Student;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [annee, setAnnee] = useState(student.bulletin.annee || "2023-2024");
  const [matieres, setMatieres] = useState(
    student.bulletin.matieres.length > 0
      ? student.bulletin.matieres
      : getDefaultMatieres(student.section).map((nom) => ({ nom, note: 0 }))
  );
  const [newMatiere, setNewMatiere] = useState("");
  const [newNote, setNewNote] = useState("");
  const [error, setError] = useState("");

  const handleNoteChange = (idx: number, value: string) => {
    const note = parseFloat(value);
    if (isNaN(note) || note < 0 || note > 20) return;
    setMatieres((prev) =>
      prev.map((m, i) => (i === idx ? { ...m, note } : m))
    );
  };

  const handleDelete = (idx: number) => {
    setMatieres((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!newMatiere || newNote === "") {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    const note = parseFloat(newNote);
    if (isNaN(note) || note < 0 || note > 20) {
      setError("Note invalide (0 à 20)");
      return;
    }
    if (matieres.some((m) => m.nom.toLowerCase() === newMatiere.toLowerCase())) {
      setError("Matière déjà présente");
      return;
    }
    setMatieres((prev) => [...prev, { nom: newMatiere, note }]);
    setNewMatiere("");
    setNewNote("");
  };

  const handleSave = () => {
    updateStudent(student.id, {
      bulletin: {
        annee,
        matieres,
      },
    });
    onSaved();
    onClose();
  };

  const moyenne =
    matieres.length > 0
      ? (
          matieres.reduce((acc, m) => acc + m.note, 0) / matieres.length
        ).toFixed(2)
      : "-";

  return (
    <div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Année scolaire</label>
        <input
          value={annee}
          onChange={(e) => setAnnee(e.target.value)}
          className="border rounded px-2 py-1"
        />
      </div>
      <table className="min-w-full border mb-2">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-3 py-1">Matière</th>
            <th className="px-3 py-1">Note</th>
            <th className="px-3 py-1">Action</th>
          </tr>
        </thead>
        <tbody>
          {matieres.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center text-gray-500 py-2">
                Aucune matière
              </td>
            </tr>
          )}
          {matieres.map((m, idx) => (
            <tr key={m.nom}>
              <td className="px-3 py-1">{m.nom}</td>
              <td className="px-3 py-1">
                <input
                  type="number"
                  min={0}
                  max={20}
                  value={m.note}
                  onChange={(e) => handleNoteChange(idx, e.target.value)}
                  className="w-16 border rounded px-1 py-0.5 text-center"
                />
              </td>
              <td className="px-3 py-1">
                <button
                  className="text-xs text-red-600 hover:underline"
                  onClick={() => handleDelete(idx)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleAdd} className="flex gap-2 mb-2 items-end">
        <div>
          <label className="block text-sm font-medium">Nouvelle matière</label>
          <input
            value={newMatiere}
            onChange={(e) => setNewMatiere(e.target.value)}
            className="border rounded px-2 py-1"
            placeholder="Nom de la matière"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Note</label>
          <input
            type="number"
            min={0}
            max={20}
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="border rounded px-2 py-1 w-20"
            placeholder="0-20"
          />
        </div>
        <button
          type="submit"
          className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700"
        >
          Ajouter
        </button>
      </form>
      {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
      <div className="mb-2 font-semibold">
        Moyenne générale : <span className="text-indigo-700">{moyenne}</span> / 20
      </div>
      <div className="flex justify-end gap-2">
        <button
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
          onClick={onClose}
        >
          Annuler
        </button>
        <button
          className="px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700"
          onClick={handleSave}
        >
          Enregistrer
        </button>
      </div>
    </div>
  );
} 