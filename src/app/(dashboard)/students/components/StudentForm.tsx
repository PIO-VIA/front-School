"use client";

import React, { useState } from "react";
import { Student, addStudent, updateStudent } from "./studentData";

const SECTIONS = ["Francophone", "Anglophone"];
const CLASSES = [
  "CP", "CE1", "CE2", "CM1", "CM2", // francophone
  "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6" // anglophone
];

export default function StudentForm({
  initial,
  onClose,
  onSaved,
}: {
  initial?: Student | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState({
    nom: initial?.nom || "",
    prenom: initial?.prenom || "",
    sexe: initial?.sexe || "M",
    dateNaissance: initial?.dateNaissance || "",
    section: initial?.section || SECTIONS[0],
    classe: initial?.classe || "",
    adresse: initial?.adresse || "",
    telephone: initial?.telephone || "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    // Validation simple
    if (!form.nom || !form.prenom || !form.dateNaissance || !form.classe) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    if (form.telephone && !/^6[0-9]{8}$/.test(form.telephone)) {
      setError("Numéro de téléphone invalide (ex: 690123456)");
      return;
    }
    if (initial) {
      updateStudent(initial.id, form);
    } else {
      addStudent({
        id: Date.now().toString(),
        ...form,
        historiquePresence: [],
        bulletin: { annee: "2023-2024", matieres: [] },
      });
    }
    onSaved();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="block text-sm font-medium">Nom *</label>
          <input
            name="nom"
            value={form.nom}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium">Prénom *</label>
          <input
            name="prenom"
            value={form.prenom}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="block text-sm font-medium">Sexe</label>
          <select
            name="sexe"
            value={form.sexe}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
          >
            <option value="M">Masculin</option>
            <option value="F">Féminin</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium">Date de naissance *</label>
          <input
            name="dateNaissance"
            type="date"
            value={form.dateNaissance}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="block text-sm font-medium">Section</label>
          <select
            name="section"
            value={form.section}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
          >
            {SECTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium">Classe *</label>
          <select
            name="classe"
            value={form.classe}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
            required
          >
            <option value="">Choisir…</option>
            {CLASSES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium">Adresse</label>
        <input
          name="adresse"
          value={form.adresse}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Téléphone</label>
        <input
          name="telephone"
          value={form.telephone}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
          placeholder="690123456"
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
          {initial ? "Enregistrer" : "Ajouter"}
        </button>
      </div>
    </form>
  );
} 