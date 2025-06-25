'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  Building, 
  BookOpen, 
  FileText, 
  UserCheck, 
  Settings,
  LogOut,
  ChevronRight,
  School,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';

const navLinks = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Élèves', href: '/students', icon: Users },
  { name: 'Enseignants', href: '/teachers', icon: GraduationCap },
  { name: 'Salles', href: '/classrooms', icon: Building },
  { name: 'Sections', href: '/sections', icon: BookOpen },
  { name: 'Matières', href: '/subjects', icon: FileText },
  { name: 'Inscriptions', href: '/enrollments', icon: UserCheck },
];

const sidebarVariants = {
  hidden: { x: -300 },
  visible: {
    x: 0,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3 }
  }
};

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <motion.aside
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      className="w-64 h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl flex flex-col"
    >
      {/* Header */}
      <motion.div 
        variants={itemVariants}
        className="p-6 border-b border-slate-700/50"
      >
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <School className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Excellence
            </h2>
            <p className="text-xs text-slate-400">École Primaire Bilingue</p>
          </div>
        </div>
      </motion.div>

      {/* Navigation - Flex-grow pour prendre l'espace disponible */}
      <nav className="flex-grow mt-6 px-3 overflow-y-auto">
        <ul className="space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            
            return (
              <motion.li 
                key={link.name}
                variants={itemVariants}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={link.href}
                  className={`group flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive 
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform scale-105' 
                      : 'text-slate-300 hover:bg-slate-700/50 hover:text-white hover:translate-x-1'
                  }`}
                >
                  <Icon className={`w-5 h-5 mr-3 transition-all duration-200 ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400'
                  }`} />
                  <span className="font-medium">{link.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="ml-auto"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </motion.div>
                  )}
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </nav>

      {/* School Info Section */}
      <motion.div 
        variants={itemVariants}
        className="px-4 py-3 mx-3 mb-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-xl"
      >
        <div className="flex items-center mb-2">
          <MapPin className="w-4 h-4 text-emerald-400 mr-2" />
          <span className="text-xs text-emerald-300 font-medium">Yaoundé, Cameroun</span>
        </div>
        <div className="flex items-center mb-2">
          <Phone className="w-4 h-4 text-emerald-400 mr-2" />
          <span className="text-xs text-slate-300">+237 690 123 456</span>
        </div>
        <div className="flex items-center">
          <Mail className="w-4 h-4 text-emerald-400 mr-2" />
          <span className="text-xs text-slate-300">info@excellence.cm</span>
        </div>
      </motion.div>

      {/* User Info - Position fixe en bas */}
      <motion.div 
        variants={itemVariants}
        className="p-4 border-t border-slate-700/50 bg-slate-800/50"
      >
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-sm font-bold text-white">AD</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">Administrateur</p>
            <p className="text-xs text-slate-400">Direction Générale</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 flex items-center justify-center px-3 py-2 text-xs bg-slate-700/70 hover:bg-slate-600 rounded-lg transition-all duration-200 border border-slate-600"
          >
            <Settings className="w-3 h-3 mr-1" />
            Paramètres
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 flex items-center justify-center px-3 py-2 text-xs bg-red-600/80 hover:bg-red-600 rounded-lg transition-all duration-200"
            onClick={() => window.location.href = '/'}
          >
            <LogOut className="w-3 h-3 mr-1" />
            Déconnexion
          </motion.button>
        </div>
      </motion.div>
    </motion.aside>
  );
}