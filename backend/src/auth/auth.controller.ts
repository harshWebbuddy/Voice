import { Controller, Post, Body, UnauthorizedException, Get, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginData: { email: string; password: string }) {
    console.log('Login attempt with data:', loginData);
    try {
      const user = await this.authService.validateUser(loginData.email, loginData.password);
      console.log('User validated successfully:', user);
      const result = await this.authService.login(user);
      console.log('Login successful, returning:', result);
      return result;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  @Get('test-auth')
  async testAuth() {
    console.log('Starting authentication test...');
    
    const testEmail = 'sanskar@webbuddy.agency';
    const testPassword = '07512481231';
    
    try {
      // Step 1: Try to find the user directly in the database
      console.log('Step 1: Checking user in database');
      const userInDb = await this.authService.findUserByEmail(testEmail);
      console.log('User in database:', userInDb ? 'Found' : 'Not found');
      
      if (userInDb) {
        console.log('User details:', {
          id: userInDb.id,
          email: userInDb.email,
          hasPassword: !!userInDb.password
        });
      }
      
      // Step 2: Test validation
      console.log('\nStep 2: Testing user validation');
      const validatedUser = await this.authService.validateUser(testEmail, testPassword);
      console.log('Validation result:', validatedUser);
      
      // Step 3: Test login
      console.log('\nStep 3: Testing login');
      const loginResult = await this.authService.login(validatedUser);
      console.log('Login result:', loginResult);
      
      return {
        success: true,
        message: 'Authentication test completed successfully',
        userFound: !!userInDb,
        validationSuccess: !!validatedUser,
        loginSuccess: !!loginResult,
        details: {
          userInDb: userInDb ? {
            id: userInDb.id,
            email: userInDb.email,
            hasPassword: !!userInDb.password
          } : null,
          validatedUser: validatedUser ? {
            id: validatedUser.id,
            email: validatedUser.email
          } : null,
          loginResult
        }
      };
    } catch (error) {
      console.error('Test failed:', error);
      return {
        success: false,
        error: error.message,
        stack: error.stack
      };
    }
  }

  @Post('register')
  async register(@Body() registerData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) {
    console.log('Register request received:', registerData);

    // Validate required fields
    if (!registerData.email || !registerData.password || !registerData.firstName || !registerData.lastName) {
      console.error('Missing required fields:', registerData);
      throw new BadRequestException('All fields are required');
    }

    try {
      const result = await this.authService.register(registerData);
      console.log('Registration successful for:', registerData.email);
      return result;
    } catch (error) {
      console.error('Registration error:', error);
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new BadRequestException(error.message || 'Registration failed. Please try again.');
    }
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordData: { email: string }) {
    return this.authService.forgotPassword(forgotPasswordData.email);
  }

  @Post('reset-password')
  async resetPassword(
    @Body() resetPasswordData: { token: string; newPassword: string },
  ) {
    return this.authService.resetPassword(
      resetPasswordData.token,
      resetPasswordData.newPassword,
    );
  }
} 