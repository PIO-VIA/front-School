"use client";

import React, { useState } from "react";
import TeacherList from "./components/TeacherList";
import TeacherForm from "./components/TeacherForm";
import TeacherPresenceHistory from "./components/TeacherPresenceHistory";
import { Teacher } from "./components/teacherData";

export default function TeachersPage() {
  const [showForm, setShowForm] = useState(false);
  const [editTeacher, setEditTeacher] = useState<Teacher | null>(null);
  const [showPresence, setShowPresence] = useState<Teacher | null>(null);
  const [refresh, setRefresh] = useState(0);

  const handleSaved = () => setRefresh((r) => r + 1);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Gestion des Enseignants</h1>
        <button
          className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          onClick={() => {
            setEditTeacher(null);
            setShowForm(true);
          }}
        >
          Ajouter un enseignant
        </button>
      </div>
      <TeacherList
        key={refresh}
        onEdit={(teacher) => {
          setEditTeacher(teacher);
          setShowForm(true);
        }}
        onViewPresence={setShowPresence}
      />
      {/* Formulaire d'ajout/modification */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg min-w-[350px]">
            <h2 className="text-xl font-bold mb-4">
              {editTeacher ? "Modifier l'enseignant" : "Ajouter un enseignant"}
            </h2>
            <TeacherForm
              initial={editTeacher}
              onClose={() => setShowForm(false)}
              onSaved={handleSaved}
            />
          </div>
        </div>
      )}
      {/* Historique de présence */}
      {showPresence && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg min-w-[350px] max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">
              Historique de présence de {showPresence.prenom} {showPresence.nom}
            </h2>
            <TeacherPresenceHistory
              teacher={showPresence}
              onClose={() => {
                setShowPresence(null);
                handleSaved();
              }}
              onSaved={handleSaved}
            />
          </div>
        </div>
      )}
    </div>
  );
} 