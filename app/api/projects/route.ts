import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/projects
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        owner: {
          select: { id: true, name: true, email: true },
        },
        company: {
          select: { id: true, name: true },
        },
        members: {
          select: { id: true, name: true },
        },
        teams: {
          select: { id: true, name: true },
        },
      },
    });

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


// POST /api/projects
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, status, startDate, endDate, companyId, ownerId } = body;

    if (!name || !companyId || !ownerId) {
      return NextResponse.json(
        { error: "Missing required fields (name, companyId, ownerId)" },
        { status: 400 }
      );
    }

    // ✅ Validate company exists
    const companyExists = await prisma.company.findUnique({
      where: { id: companyId },
    });
    if (!companyExists) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    // ✅ Validate user exists
    const userExists = await prisma.user.findUnique({
      where: { id: ownerId },
    });
    if (!userExists) {
      return NextResponse.json({ error: "Owner user not found" }, { status: 404 });
    }

    // ✅ Create project
    const project = await prisma.project.create({
      data: {
        name,
        description,
        status: status || "active",
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        companyId,
        ownerId,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
