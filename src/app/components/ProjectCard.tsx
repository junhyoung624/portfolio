import { motion } from "motion/react";
import { ExternalLink, Code2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import type { ProjectCardComponentProps } from "../../types";

export function ProjectCard({
  title,
  description,
  technologies,
  image,
  index,
}: ProjectCardComponentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500"
    >
      <div className="relative h-64 overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
          className="h-full"
        >
          <ImageWithFallback src={image} alt={title} className="w-full h-full object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        >
          <button
            className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
            aria-label="라이브 데모"
          >
            <ExternalLink className="w-5 h-5 text-gray-800" />
          </button>
          <button
            className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
            aria-label="소스 코드"
          >
            <Code2 className="w-5 h-5 text-gray-800" />
          </button>
        </motion.div>
      </div>

      <div className="p-6">
        <h3 className="mb-3">{title}</h3>
        <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>

        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, i: number) => (
            <motion.span
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * i }}
              className="px-3 py-1 rounded-full text-sm"
              style={{
                backgroundColor: `${tech.color}15`,
                color: tech.color,
                border: `1px solid ${tech.color}30`,
              }}
            >
              {tech.name}
            </motion.span>
          ))}
        </div>
      </div>

      <motion.div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}
