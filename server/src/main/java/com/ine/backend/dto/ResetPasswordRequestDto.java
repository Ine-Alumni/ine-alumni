package com.ine.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResetPasswordRequestDto {
	@Email(message = "Email address is not valid.")
	@NotBlank(message = "Email address is required.")
	private String email;

	@NotBlank(message = "Verification code is required.")
	private String token;

	@NotBlank(message = "New password is required.")
	@Size(min = 8, message = "Password must be at least 8 characters long.")
	@Size(max = 25, message = "Password must not exceed 25 characters.")
	@Pattern(
		regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-={}:;\"'<>,.?]).{8,25}$",
		message = "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
	)
	private String newPassword;
}
