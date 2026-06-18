import { motion } from "motion/react";
import type { SkillBadgeProps } from "../../types";

export function SkillBadge({ icon: Icon, name, index }: SkillBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: index * 0.05,
      }}
      whileHover={{
        scale: 1.1,
        rotate: [0, -5, 5, 0],
        transition: { duration: 0.3 },
      }}
      className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md hover:shadow-xl transition-shadow cursor-pointer border border-gray-100"
    >
      <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <span className="text-sm font-medium text-gray-700">{name}</span>
    </motion.div>
  );
}
