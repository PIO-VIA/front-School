"use client";

import React, { useEffect, useState } from "react";
import {
  getTeachers,
  deleteTeacher,
  Teacher,
} from "./teacherData";

export default function TeacherList({
  onEdit,
  onViewPresence,
}: {
  onEdit: (teacher: Teacher) => void;
  onViewPresence: (teacher: Teacher) => void;
}) {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTeachers(getTeachers());
    setLoading(false);
  }, []);

  const handleDelete = (id: string) => {
    if (confirm("Voulez-vous vraiment supprimer cet enseignant ?")) {
      deleteTeacher(id);
      setTeachers(getTeachers());
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
            <th className="px-4 py-2">Téléphone</th>
            <th className="px-4 py-2">Adresse</th>
            <th className="px-4 py-2">Matières</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id} className="border-t">
              <td className="px-4 py-2">{teacher.nom}</td>
              <td className="px-4 py-2">{teacher.prenom}</td>
              <td className="px-4 py-2">{teacher.sexe}</td>
              <td className="px-4 py-2">{teacher.dateNaissance}</td>
              <td className="px-4 py-2">{teacher.telephone}</td>
              <td className="px-4 py-2">{teacher.adresse}</td>
              <td className="px-4 py-2">
                {teacher.matieres.join(", ")}
              </td>
              <td className="px-4 py-2 space-x-1">
                <button
                  className="rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600 text-xs"
                  onClick={() => onEdit(teacher)}
                >
                  Modifier
                </button>
                <button
                  className="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600 text-xs"
                  onClick={() => handleDelete(teacher.id)}
                >
                  Supprimer
                </button>
                <button
                  className="rounded bg-green-500 px-2 py-1 text-white hover:bg-green-600 text-xs"
                  onClick={() => onViewPresence(teacher)}
                >
                  Présence
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {teachers.length === 0 && (
        <div className="p-4 text-center text-gray-500">Aucun enseignant trouvé.</div>
      )}
    </div>
  );
} 