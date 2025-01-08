import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, IsNull, MoreThan } from 'typeorm';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { EmailService } from '../email/email.service';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  async findUserByEmail(email: string): Promise<User | null> {
    console.log('Finding user by email:', email);
    const normalizedEmail = email.toLowerCase().trim();
    const user = await this.usersRepository.findOne({
      where: { email: normalizedEmail },
    });
    console.log('User found:', user ? 'Yes' : 'No');
    return user;
  }

  async validateUser(email: string, password: string): Promise<any> {
    console.log('Starting user validation for email:', email);
    
    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();
    console.log('Normalized email:', normalizedEmail);
    
    // Find user with exact email match
    const user = await this.usersRepository.findOne({
      where: { email: normalizedEmail },
    });
    
    console.log('User found in database:', user ? 'Yes' : 'No');
    
    if (!user) {
      console.log('No user found with email:', normalizedEmail);
      throw new UnauthorizedException('Invalid email or password');
    }

    // Compare passwords
    console.log('Comparing passwords...');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Password comparison result:', isPasswordValid);

    if (!isPasswordValid) {
      console.log('Invalid password for user:', normalizedEmail);
      throw new UnauthorizedException('Invalid email or password');
    }

    console.log('User validation successful');
    const { password: _, ...result } = user;
    return result;
  }

  async login(user: any) {
    console.log('Starting login process for user:', user.email);
    
    const payload = { 
      email: user.email, 
      sub: user.id 
    };
    
    console.log('Creating JWT token with payload:', payload);
    
    const token = this.jwtService.sign(payload);
    console.log('JWT token created successfully');
    
    return {
      access_token: token, // Changed to access_token to match frontend expectation
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  }

  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) {
    console.log('Starting registration for:', userData.email);
    try {
      // Normalize email
      userData.email = userData.email.toLowerCase().trim();
      
      // Check if user exists
      const existingUser = await this.usersRepository.findOne({
        where: { email: userData.email },
      });

      if (existingUser) {
        console.log('User already exists:', userData.email);
        throw new UnauthorizedException('Email already exists');
      }

      // Hash password
      console.log('Hashing password...');
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      
      // Create user
      console.log('Creating user...');
      const user = this.usersRepository.create({
        ...userData,
        password: hashedPassword,
      });

      // Save user
      console.log('Saving user to database...');
      const savedUser = await this.usersRepository.save(user);
      console.log('User saved successfully:', savedUser.email);
      
      // Send welcome email
      try {
        console.log('Sending welcome email...');
        await this.emailService.sendWelcomeEmail(savedUser.email, savedUser.firstName);
        console.log('Welcome email sent successfully');
      } catch (emailError) {
        console.error('Error sending welcome email:', emailError);
        // Don't throw error here, just log it
      }

      // Return user without password
      const { password, ...result } = savedUser;
      return result;
    } catch (error) {
      console.error('Registration error:', error);
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new Error('Registration failed. Please try again.');
    }
  }

  async forgotPassword(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = await bcrypt.hash(resetToken, 10);

    // Save token to database
    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = new Date(Date.now() + 3600000); // 1 hour
    await this.usersRepository.save(user);

    // Send reset email
    try {
      await this.emailService.sendPasswordResetEmail(email, resetToken);
      return { message: 'Password reset instructions sent to your email' };
    } catch (error) {
      user.passwordResetToken = null;
      user.passwordResetExpires = null;
      await this.usersRepository.save(user);
      throw new Error('Error sending email');
    }
  }

  async resetPassword(token: string, newPassword: string) {
    // Find all users with non-null reset tokens
    const users = await this.usersRepository.find({
      where: {
        passwordResetToken: Not(IsNull()),
        passwordResetExpires: MoreThan(new Date()),
      },
    });

    // Find the user with the matching token
    let matchedUser = null;
    for (const user of users) {
      try {
        const isMatch = await bcrypt.compare(token, user.passwordResetToken);
        if (isMatch) {
          matchedUser = user;
          break;
        }
      } catch (error) {
        continue;
      }
    }

    if (!matchedUser) {
      throw new UnauthorizedException('Invalid or expired reset token');
    }

    // Update password
    matchedUser.password = await bcrypt.hash(newPassword, 10);
    matchedUser.passwordResetToken = null;
    matchedUser.passwordResetExpires = null;
    await this.usersRepository.save(matchedUser);

    // Send confirmation email
    await this.emailService.sendPasswordChangedEmail(matchedUser.email);

    return { message: 'Password reset successful' };
  }
} 