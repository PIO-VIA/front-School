// src/components/Footer.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Globe, Shield, Award, Users } from 'lucide-react';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="bg-gradient-to-r from-slate-800 to-slate-900 text-white mt-auto"
    >
      <div className="px-4 lg:px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* École Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">École Primaire Bilingue Excellence</h3>
                <p className="text-slate-300 text-sm">Former les leaders de demain</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Une institution d'excellence dédiée à l'épanouissement académique et personnel 
              de chaque élève, dans un environnement bilingue stimulant.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-emerald-400">
                <Users className="w-4 h-4 mr-2" />
                <span className="text-sm">200+ Élèves</span>
              </div>
              <div className="flex items-center text-blue-400">
                <Award className="w-4 h-4 mr-2" />
                <span className="text-sm">30+ Enseignants</span>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-3">Contact</h4>
            <div className="space-y-2 text-sm text-slate-300">
              <p>📍 Quartier Bastos, Yaoundé</p>
              <p>📞 +237 690 123 456</p>
              <p>✉️ info@excellence.cm</p>
              <p>🌐 www.excellence-school.cm</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-3">Liens Rapides</h4>
            <div className="space-y-2 text-sm">
              <a href="#" className="text-slate-300 hover:text-indigo-400 transition-colors block">
                🎓 Programmes Scolaires
              </a>
              <a href="#" className="text-slate-300 hover:text-indigo-400 transition-colors block">
                📚 Ressources Pédagogiques
              </a>
              <a href="#" className="text-slate-300 hover:text-indigo-400 transition-colors block">
                👨‍👩‍👧‍👦 Espace Parents
              </a>
              <a href="#" className="text-slate-300 hover:text-indigo-400 transition-colors block">
                📞 Support Technique
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 mt-6 pt-4">
          <div className="flex flex-col sm:flex-row items-center justify-between text-sm">
            <div className="flex items-center space-x-4 mb-2 sm:mb-0">
              <p className="text-slate-400">
                &copy; 2024 École Primaire Bilingue Excellence
              </p>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-300">Système Sécurisé</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-slate-400">
              <div className="flex items-center">
                <Heart className="w-4 h-4 text-red-400 mr-1" />
                <span>Fait avec passion</span>
              </div>
              <span>•</span>
              <div className="flex items-center">
                <Globe className="w-4 h-4 text-blue-400 mr-1" />
                <span>Version 1.2.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}