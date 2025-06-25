"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, GraduationCap, Building, BookOpen, TrendingUp, Calendar, Award, Bell } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { getStudents } from '../students/components/studentData';
import { getTeachers } from '../teachers/components/teacherData';
import { getClassrooms } from '../classrooms/components/classroomData';

const statsData = [
  { month: 'Jan', students: 120, teachers: 15 },
  { month: 'Fév', students: 132, teachers: 16 },
  { month: 'Mar', students: 145, teachers: 17 },
  { month: 'Avr', students: 158, teachers: 18 },
  { month: 'Mai', students: 162, teachers: 18 },
  { month: 'Jun', students: 175, teachers: 20 },
];

const presenceData = [
  { name: 'Lun', present: 168, absent: 7 },
  { name: 'Mar', present: 172, absent: 3 },
  { name: 'Mer', present: 165, absent: 10 },
  { name: 'Jeu', present: 170, absent: 5 },
  { name: 'Ven', present: 160, absent: 15 },
];

const sectionData = [
  { name: 'Francophone', value: 120, color: '#8B5CF6' },
  { name: 'Anglophone', value: 55, color: '#06B6D4' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

function StatCard({ icon: Icon, title, value, subtitle, color, trend }: any) {
  return (
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-xl shadow-lg p-6 border-l-4 hover:shadow-xl transition-shadow duration-300"
      style={{ borderLeftColor: color }}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">{value}</h3>
          <p className="text-gray-500 text-xs mt-1">{subtitle}</p>
        </div>
        <div className={`p-3 rounded-lg`} style={{ backgroundColor: `${color}20` }}>
          <Icon className="w-8 h-8" style={{ color }} />
        </div>
      </div>
      {trend && (
        <div className="flex items-center mt-3">
          <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
          <span className="text-green-500 text-sm font-medium">{trend}</span>
        </div>
      )}
    </motion.div>
  );
}

export default function DashboardPage() {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    setStudents(getStudents());
    setTeachers(getTeachers());
    setClassrooms(getClassrooms());
  }, []);

  const currentDate = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-sm border-b"
      >
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord</h1>
              <p className="text-gray-600 mt-1">École Primaire Bilingue Excellence</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Aujourd hui</p>
                <p className="font-semibold text-gray-900">{currentDate}</p>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-2 bg-indigo-100 rounded-lg"
              >
                <Bell className="w-6 h-6 text-indigo-600" />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="p-6">
        {/* Quick Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <StatCard
            icon={Users}
            title="Total Élèves"
            value={students.length}
            subtitle="Inscrits cette année"
            color="#8B5CF6"
            trend="+12% ce mois"
          />
          <StatCard
            icon={GraduationCap}
            title="Enseignants"
            value={teachers.length}
            subtitle="Personnel actif"
            color="#06B6D4"
            trend="+2 nouveaux"
          />
          <StatCard
            icon={Building}
            title="Salles"
            value={classrooms.length}
            subtitle="Salles disponibles"
            color="#10B981"
          />
          <StatCard
            icon={BookOpen}
            title="Moyenne Générale"
            value="14.2/20"
            subtitle="Toutes classes"
            color="#F59E0B"
            trend="+0.8 points"
          />
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Evolution Chart */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-indigo-600" />
              Évolution des Effectifs
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={statsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="students" 
                  stroke="#8B5CF6" 
                  strokeWidth={3}
                  name="Élèves"
                />
                <Line 
                  type="monotone" 
                  dataKey="teachers" 
                  stroke="#06B6D4" 
                  strokeWidth={3}
                  name="Enseignants"
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Attendance Chart */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-green-600" />
              Présence cette Semaine
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={presenceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="present" fill="#10B981" name="Présents" />
                <Bar dataKey="absent" fill="#EF4444" name="Absents" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Section Distribution */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Award className="w-5 h-5 mr-2 text-purple-600" />
              Répartition par Section
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={sectionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                >
                  {sectionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {sectionData.map((section) => (
                <div key={section.name} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: section.color }}
                    />
                    <span className="text-sm text-gray-700">{section.name}</span>
                  </div>
                  <span className="text-sm font-semibold">{section.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activities */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-xl shadow-lg p-6 lg:col-span-2"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Activités Récentes</h3>
            <div className="space-y-4">
              {[
                { action: "Nouveau élève inscrit", name: "Fanta Kouam", time: "Il y a 2h", color: "bg-green-100 text-green-800" },
                { action: "Note ajoutée", name: "Brice Mbiya - Mathématiques", time: "Il y a 3h", color: "bg-blue-100 text-blue-800" },
                { action: "Absence signalée", name: "Prof. Jean-Pierre Essomba", time: "Il y a 5h", color: "bg-red-100 text-red-800" },
                { action: "Nouvelle salle créée", name: "Salle Informatique B", time: "Il y a 1j", color: "bg-purple-100 text-purple-800" },
              ].map((activity, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 5 }}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div className="flex items-center">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${activity.color}`}>
                      {activity.action}
                    </div>
                    <span className="ml-3 text-gray-700">{activity.name}</span>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}