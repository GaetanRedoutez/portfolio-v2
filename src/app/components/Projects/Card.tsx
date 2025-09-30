import { IProject } from "@/lib/models/Project";
import { Github, Link as LinkIcon } from "iconoir-react";
import Image from "next/image";
import Link from "next/link";

export const Card = (project: IProject) => {
  console.log(project);
  return (
    <div className="group">
      <div className="bg-common-1 max-w-[340px] max-h-[402px] rounded-lg overflow-hidden border border-gray-200 hover:border-peach-7 transition-all duration-300 hover:shadow-lg hover:shadow-peach-7/10">
        {/* Project Image */}
        <div className="relative overflow-hidden">
          <Image
            src={project.images[0]}
            alt={project.title}
            width={336}
            height={168}
            className="w-full h-[170px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-common-2/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-peach-7 text-common-1 px-3 py-1 rounded-full ">
              {project.stack}
            </span>
          </div>

          {/* Hover actions */}
          <div className="absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:animate-fade-in-up-delay-2">
            {project.demo && (
              <Link
                className="bg-neutral-2 p-2 rounded-full text-peach-7 hover:bg-peach-7 hover:text-common-1 transition-colors "
                href={project.demo}
                target="_blank"
              >
                <LinkIcon width={16} height={16} />
              </Link>
            )}
            {project.github && (
              <Link
                className="bg-neutral-2 p-2 rounded-full text-peach-7 hover:bg-peach-7 hover:text-common-1 transition-colors"
                href={project.github}
                target="_blank"
              >
                <Github width={16} height={16} />
              </Link>
            )}
          </div>
        </div>

        {/* Project Info */}
        <div className="p-6 space-y-4">
          <h3 className="text-md font-semibold text-neutral-8 group-hover:text-peach-7 transition-colors">
            {project.title}
          </h3>
          <p className="text-neutral-6 text-xs leading-relaxed">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="bg-neutral-1 text-neutral-6 px-2 py-1 rounded-full text-[0.7rem] border border-neutral-3 group-hover:border-peach-7 group-hover:bg-peach-7 group-hover:text-common-1 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
