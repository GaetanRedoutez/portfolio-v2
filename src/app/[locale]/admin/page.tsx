import dbConnect from "@/lib/db";
import Project, { IProject } from "@/lib/models/Project";
import Skills, { ISkill } from "@/lib/models/Skill";
import Parcours, { IParcours } from "@/lib/models/Parcours";
import AdminDashboardClient from "@/app/components/admin/AdminDashboardClient";

export default async function AdminPage() {
  await dbConnect();

  const projects = await Project.find().lean<IProject[]>();
  const skills = await Skills.find().lean<ISkill[]>();
  const parcours = await Parcours.find().lean<IParcours[]>();

  return (
    <AdminDashboardClient
      projects={JSON.parse(JSON.stringify(projects))}
      skills={JSON.parse(JSON.stringify(skills))}
      parcours={JSON.parse(JSON.stringify(parcours))}
    />
  );
}
