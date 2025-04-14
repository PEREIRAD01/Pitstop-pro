import { FirebaseError } from 'firebase/app';

export function getFirebaseAuthErrorMessage(error: FirebaseError): string {
	switch (error.code) {
		case 'auth/email-already-in-use':
			return 'This email is already registered.';
		case 'auth/invalid-email':
			return 'Please enter a valid email address.';
		case 'auth/weak-password':
			return 'Password should be at least 6 characters.';
		case 'auth/user-not-found':
			return 'No account found with this email.';
		case 'auth/wrong-password':
			return 'Incorrect password. Please try again.';
		case 'auth/too-many-requests':
			return 'Too many login attempts. Please wait and try again later.';
		default:
			return 'An unexpected error occurred. Please try again.';
		
	}
}
