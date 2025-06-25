"use client";

import React, { useEffect, useState } from "react";
import {
  getStudents,
  deleteStudent,
  Student,
} from "./studentData";

export default function StudentList({
  onEdit,
  onViewPresence,
  onViewBulletin,
  onInscription,
}: {
  onEdit: (student: Student) => void;
  onViewPresence: (student: Student) => void;
  onViewBulletin: (student: Student) => void;
  onInscription: (student: Student) => void;
}) {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setStudents(getStudents());
    setLoading(false);
  }, []);

  const handleDelete = (id: string) => {
    if (confirm("Voulez-vous vraiment supprimer cet élève ?")) {
      deleteStudent(id);
      setStudents(getStudents());
    }
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">Nom</th>
            <th className="px-4 py-2">Prénom</th>
            <th className="px-4 py-2">Sexe</th>
            <th className="px-4 py-2">Date de naissance</th>
            <th className="px-4 py-2">Section</th>
            <th className="px-4 py-2">Classe</th>
            <th className="px-4 py-2">Téléphone</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="border-t">
              <td className="px-4 py-2">{student.nom}</td>
              <td className="px-4 py-2">{student.prenom}</td>
              <td className="px-4 py-2">{student.sexe}</td>
              <td className="px-4 py-2">{student.dateNaissance}</td>
              <td className="px-4 py-2">{student.section}</td>
              <td className="px-4 py-2">{student.classe}</td>
              <td className="px-4 py-2">{student.telephone}</td>
              <td className="px-4 py-2 space-x-1">
                <button
                  className="rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600 text-xs"
                  onClick={() => onEdit(student)}
                >
                  Modifier
                </button>
                <button
                  className="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600 text-xs"
                  onClick={() => handleDelete(student.id)}
                >
                  Supprimer
                </button>
                <button
                  className="rounded bg-green-500 px-2 py-1 text-white hover:bg-green-600 text-xs"
                  onClick={() => onViewPresence(student)}
                >
                  Présence
                </button>
                <button
                  className="rounded bg-yellow-500 px-2 py-1 text-white hover:bg-yellow-600 text-xs"
                  onClick={() => onViewBulletin(student)}
                >
                  Bulletin
                </button>
                <button
                  className="rounded bg-indigo-500 px-2 py-1 text-white hover:bg-indigo-600 text-xs"
                  onClick={() => onInscription(student)}
                >
                  Inscription
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {students.length === 0 && (
        <div className="p-4 text-center text-gray-500">Aucun élève trouvé.</div>
      )}
    </div>
  );
} 