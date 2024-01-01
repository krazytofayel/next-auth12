import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function POST(request) {
  const body = await request.json();
  const { email, password,role,isAdmin,isTeacher } = body;
  console.log('data::::',body);



  if (!email || !password) {
    return NextResponse({
      status: 400,
      body: { message: "email and password are required" },
    });
  }

  const exist = await prisma.user.findUnique({
    where: {
      email:email
    },
  });

  if (exist) {
    return NextResponse({
      status: 400,
      body: { message: "email already exist" },
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      hashedPassword,
      role,
      isAdmin,
      isTeacher,
    },
  });

    return NextResponse.json(user);
}
