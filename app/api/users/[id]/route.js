import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import User from '@/app/models/User';

export async function PATCH(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const data = await request.json();

    const user = await User.findByIdAndUpdate(
      id,
      { ...data },
      { new: true }
    ).select('-password');

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error updating user' },
      { status: 500 }
    );
  }
}

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const user = await User.findById(id).select('-password');

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching user' },
      { status: 500 }
    );
  }
} 