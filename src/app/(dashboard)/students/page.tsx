// src/app/(dashboard)/students/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import StudentList from "./components/StudentList";
import StudentForm from "./components/StudentForm";
import StudentPresenceHistory from "./components/StudentPresenceHistory";
import StudentInscriptionForm from "./components/StudentInscriptionForm";
import { Student } from "./components/studentData";

export default function StudentsPage() {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [editStudent, setEditStudent] = useState<Student | null>(null);
  const [showPresence, setShowPresence] = useState<Student | null>(null);
  const [showInscription, setShowInscription] = useState<Student | null>(null);
  const [refresh, setRefresh] = useState(0);

  const handleSaved = () => setRefresh((r) => r + 1);

  const handleViewBulletin = (student: Student) => {
    router.push(`/students/${student.id}/bulletin`);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Gestion des Élèves</h1>
        <button
          className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          onClick={() => {
            setEditStudent(null);
            setShowForm(true);
          }}
        >
          Ajouter un élève
        </button>
      </div>
      <StudentList
        key={refresh}
        onEdit={(student) => {
          setEditStudent(student);
          setShowForm(true);
        }}
        onViewPresence={setShowPresence}
        onViewBulletin={handleViewBulletin}
        onInscription={setShowInscription}
      />
      {/* Formulaire d'ajout/modification */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg min-w-[350px]">
            <h2 className="text-xl font-bold mb-4">
              {editStudent ? "Modifier l'élève" : "Ajouter un élève"}
            </h2>
            <StudentForm
              initial={editStudent}
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
            <StudentPresenceHistory
              student={showPresence}
              onClose={() => {
                setShowPresence(null);
                handleSaved();
              }}
              onSaved={handleSaved}
            />
          </div>
        </div>
      )}
      {/* Inscription */}
      {showInscription && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg min-w-[350px] max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">
              Inscription de {showInscription.prenom} {showInscription.nom}
            </h2>
            <StudentInscriptionForm
              student={showInscription}
              onClose={() => {
                setShowInscription(null);
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