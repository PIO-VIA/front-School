'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Élèves', href: '/students' },
  { name: 'Enseignants', href: '/teachers' },
  { name: 'Salles', href: '/classrooms' },
  { name: 'Sections', href: '/sections' },
  { name: 'Matières', href: '/subjects' },
  { name: 'Inscriptions', href: '/enrollments' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-800 text-white">
      <div className="p-6">
        <h2 className="text-2xl font-semibold">Gestion École</h2>
      </div>
      <nav className="mt-6">
        <ul>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`block px-6 py-3 hover:bg-gray-700 ${
                    isActive ? 'bg-gray-900' : ''
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
} 