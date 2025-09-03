"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      {/* Hero section */}
      <section className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-600 to-purple-700 text-white">
        <div className="container text-center">
          <motion.h1
            className="text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Bienvenue sur mon Portfolio 🚀
          </motion.h1>

          <motion.p
            className="text-lg mb-8 text-gray-100 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Découvrez mes projets, mon expérience et mes compétences en
            développement web.
          </motion.p>

          <motion.div
            className="flex justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link href="/projects" className="btn-primary">
              Voir mes projets
            </Link>
            <Link href="/contact" className="btn-secondary">
              Me contacter
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About section */}
      <section className="container py-16">
        <h2 className="text-3xl font-semibold mb-8 text-center">
          À propos de moi
        </h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.img
            src="https://via.placeholder.com/500x400"
            alt="Moi"
            className="rounded-lg shadow-lg"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          />
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Je suis un développeur passionné spécialisé dans la création
              d&apos;applications modernes avec Next.js, React et TailwindCSS.
              J&apos;aime concevoir des expériences utilisateurs fluides et
              performantes.
            </p>
            <div className="mt-6">
              <Link href="/about" className="btn-primary">
                En savoir plus
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects preview */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container">
          <h2 className="text-3xl font-semibold mb-12 text-center">
            Mes derniers projets
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {["Projet 1", "Projet 2", "Projet 3"].map((title, i) => (
              <motion.div
                key={i}
                className="card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
              >
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Description rapide du projet. Cliquez pour en savoir plus.
                </p>
                <Link
                  href={`/projects/${i + 1}`}
                  className="btn-secondary mt-4 inline-block"
                >
                  Voir le projet
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
